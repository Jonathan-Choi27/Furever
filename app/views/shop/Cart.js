import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator, TextInput, Alert, BackHandler } from 'react-native';
import { MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { db } from "../database/firebase";
// import { onCartTab } from "../components/shopTabComponent";
import { auth } from '../database/firebase';


export default class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectAll: false,
			cartItemsIsLoading: false,
			cartItems: [],
		}
		console.log("im in");
		console.log(this.props.route.params);
    	
	}
	
    
    // async fetchData() {
    //     const uid = auth.currentUser.uid;
    //     // console.log(uid);
    //     const dataArray = [];
    //     const seller = {};
    //     db.collection("cart")
    //       .where("uuid", "==", uid)
    //       .get()
    //       .then((doc) => {
    //         console.log(doc);
    //         doc.forEach(async (listingDoc) => {
    //           var itemId = listingDoc.data().itemId; 
    //           var accessoryName;
    //           var accessoryPrice;
    //           var accessoryImage;
    //           await db
    //             .collection("accessories")
    //             .doc(itemId)
    //             .get()
    //             .then((accessory) => {
    //                 accessoryName = accessory.data().name;
    //                 accessoryPrice = accessory.data().price;
    //                 accessoryImage = accessory.data().photoLink;
                  
    //             });

    //         //   if(dataArray.length != 0){
    //         //     dataArray.forEach(data => {
    //         //         if(data.itemId === itemId){
    //         //             data.qty = data.qty + 1; 
    //         //         } else {
    //         //             dataArray.push({
    //         //                 docId: listingDoc.id,
    //         //                 itemId: listingDoc.data().itemId,
    //         //                 qty: 1,
    //         //                 name: accessoryName,
    //         //                 price: accessoryPrice,
    //         //                 image: accessoryImage
    //         //           });
    //         //         }
    //         //     })
	// 		//   } 
	// 		  if (dataArray.length === 0) {
    //             dataArray.push({
    //                 docId: listingDoc.id,
    //                 itemId: listingDoc.data().itemId,
    //                 qty: 1,
    //                 name: accessoryName,
    //                 price: accessoryPrice,
    //                 image: accessoryImage

    //             });
    //           } else {
    //             dataArray.forEach(data => {
    //                 if(data.itemId === itemId){
    //                     data.qty = data.qty + 1; 
    //                 } else {
    //                     dataArray.push({
    //                         docId: listingDoc.id,
    //                         itemId: listingDoc.data().itemId,
    //                         qty: 1,
    //                         name: accessoryName,
    //                         price: accessoryPrice,
    //                         image: accessoryImage
    //                   });
    //                 }
    //             })
	// 		  } 
              
    //           this.setState({
    //             cartItems: [...dataArray],
    //           });
    //           console.log(listingDoc.id);
    //           console.log(this.state.cartItems);
    //         });
    //       });
    //     }
    
    async componentDidMount() {
        // this.fetchData();
		BackHandler.addEventListener(
			"hardwareBackPress",
			this.handleBackButtonClick
		);
		
	};
		
		
	componentWillUnmount() {
		BackHandler.removeEventListener(
		"hardwareBackPress",
		this.handleBackButtonClick
	  );
	}
			  
	handleBackButtonClick = () => {
	  	this.props.navigation.goBack();
		return true;
	}
        
	
	// selectHandler = (index, value) => {
	// 	const newItems = [...this.state.cartItems]; // clone the array 
	// 	newItems[index]['checked'] = value == 1 ? 0 : 1; // set the new value 
    //     this.setState({ cartItems: newItems }); // set new state
    //     console.log(this.state.cartItems);
	// }
	
	// selectHandlerAll = (value) => {
	// 	const newItems = [...this.state.cartItems]; // clone the array 
	// 	newItems.map((item, index) => {
	// 		newItems[index]['checked'] = value == true ? 0 : 1; // set the new value 
	// 	});
	// 	this.setState({ cartItems: newItems, selectAll: (value == true ? false : true) }); // set new state
	// }
	
	deleteHandler = (index) => {
		const batch = db.batch();
		var id = this.state.cartItems[index].itemId;
		console.log(id);
		Alert.alert(
			'Are you sure you want to delete this item from your cart?',
			'',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Delete', onPress: () => {
					db
					.collection("cart")	
					// .doc(this.state.cartItems[index].docId)
					.where("itemId", "==", id)
					.get()
					.then(function(querySnapshot) {
						var batch = db.batch();
						querySnapshot.forEach(function(doc){
							batch.delete(doc.ref);
						});
                        console.log("Item is deleted from cart")
                    }).catch(function(error) {
                        console.log("Error removing item from cart: ", error);
                    });
                    let updatedCart = this.state.cartItems; /* Clone it first */
					updatedCart.splice(index, 1); /* Remove item from the cloned cart state */
                    this.setState(updatedCart); /* Update the state */
                    
				}},
			],
			{ cancelable: false }
		);
	}
	
	quantityHandler = (action, index) => {
		const newItems = [...this.state.cartItems]; // clone the array 
		
		let currentQty = newItems[index]['qty'];
		
		if(action == 'more'){
			newItems[index]['qty'] = currentQty + 1;
		} else if(action == 'less'){
			newItems[index]['qty'] = currentQty > 1 ? currentQty - 1 : 1;
		}
		
		this.setState({ cartItems: newItems }); // set new state
	}
	
	subtotalPrice = () => {
		const { cartItems } = this.state;
		if(cartItems){
			return cartItems.reduce((sum, item) => sum + (item.checked == 1 ? item.qty * item.price : 0), 0 );
		}
		return 0;
	}
	
	
	
	render() {
		const styles = StyleSheet.create({
			centerElement: {justifyContent: 'center', alignItems: 'center'},
		});
		
		const { cartItems, cartItemsIsLoading, selectAll } = this.state;
		
		return (
            
			<View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
                {/* {onCartTab(this.props.navigation)} */}
				<View style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 10}}>
					<View style={[styles.centerElement, {width: 50, height: 50}]}>
						<Ionicons name="ios-cart" size={25} color="green" />
					</View>
					<View style={[styles.centerElement, {height: 50}]}>
						<Text style={{fontSize: 18, color: '#000'}}>Shopping Cart</Text>
					</View>
				</View>
				
				
				{cartItemsIsLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="#ef5739" />
					</View>
				) : (
					<ScrollView>	
						{cartItems && cartItems.map((item, i) => (
							<View key={i} style={{flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 120}}>
								<View style={[styles.centerElement, {width: 60}]}>
									{/* <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandler(i, item.checked)}>
										<Ionicons name={item.checked == 1 ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={item.checked == 1 ? "#0faf9a" : "#aaaaaa"} />
									</TouchableOpacity> */}
								</View>
								<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
									<TouchableOpacity onPress={() => {/*this.props.navigation.navigate('ProductDetails', {productDetails: item})*/}} style={{paddingRight: 10}}>
										<Image source={{uri: item.image}} style={[styles.centerElement, {height: 60, width: 60, backgroundColor: '#eeeeee'}]} />
									</TouchableOpacity>
									<View style={{flexGrow: 1, flexShrink: 1, alignSelf: 'center'}}>
										<Text numberOfLines={1} style={{fontSize: 15}}>{item.name}</Text>
										<Text numberOfLines={1} style={{color: '#8f8f8f'}}>{item.color ? 'Variation: ' + item.color : ''}</Text>
                    <Text numberOfLines={1} style={{color: '#333333', marginBottom: 10}}>${item.qty * item.price}</Text>
										<View style={{flexDirection: 'row'}}>
											<TouchableOpacity onPress={() => this.quantityHandler('less', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="remove" size={22} color="#cccccc" />
											</TouchableOpacity>
											<Text style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#cccccc', paddingHorizontal: 7, paddingTop: 3, color: '#bbbbbb', fontSize: 13 }}>{item.qty}</Text>
											<TouchableOpacity onPress={() => this.quantityHandler('more', i)} style={{ borderWidth: 1, borderColor: '#cccccc' }}>
												<MaterialIcons name="add" size={22} color="#cccccc" />
											</TouchableOpacity>
										</View>
									</View>
									
								</View>
								<View style={[styles.centerElement, {width: 60}]}>
									<TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.deleteHandler(i)}>
										<Ionicons name="md-trash" size={25} color="#ee4d2d" />
									</TouchableOpacity>
								</View>
							</View>
						))}
					</ScrollView>
				)}
				
				{!cartItemsIsLoading &&
					<View style={{backgroundColor: '#fff', borderTopWidth: 2, borderColor: '#f6f6f6', paddingVertical: 5}}>
						<View style={{flexDirection: 'row'}}>
							{/* <View style={[styles.centerElement, {width: 60}]}>
								<View style={[styles.centerElement, {width: 32, height: 32}]}>
									<MaterialCommunityIcons name="ticket" size={25} color="#f0ac12" />
								</View>
							</View> */}
							{/* <View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Voucher</Text>
								<View style={{paddingRight: 20}}>
									<TextInput 
										style={{paddingHorizontal: 10, backgroundColor: '#f0f0f0', height: 25, borderRadius: 4}} 
										placeholder="Enter voucher code" 
										value={''}
										onChangeText={(searchKeyword) => {
											
										} }
									/> 
								</View>
							</View> */}
						</View>
						<View style={{flexDirection: 'row'}}>
							<View style={[styles.centerElement, {width: 60}]}>
								{/* <TouchableOpacity style={[styles.centerElement, {width: 32, height: 32}]} onPress={() => this.selectHandlerAll(selectAll)}>
									<Ionicons name={selectAll == true ? "ios-checkmark-circle" : "ios-checkmark-circle-outline"} size={25} color={selectAll == true ? "#0faf9a" : "#aaaaaa"} />
								</TouchableOpacity> */}
							</View>
							<View style={{flexDirection: 'row', flexGrow: 1, flexShrink: 1, justifyContent: 'space-between', alignItems: 'center'}}>
								<Text>Select All</Text>
								<View style={{flexDirection: 'row', paddingRight: 20, alignItems: 'center'}}>
									<Text style={{color: '#8f8f8f'}}>SubTotal: </Text>
									<Text>${this.subtotalPrice().toFixed(2)}</Text>
								</View>
							</View>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'flex-end', height: 32, paddingRight: 20, alignItems: 'center'}}>
							<TouchableOpacity style={[styles.centerElement, {backgroundColor: '#0faf9a', width: 100, height: 25, borderRadius: 5}]} onPress={() => console.log('test')}>
								<Text style={{color: '#ffffff'}}>Checkout</Text>
							</TouchableOpacity>
						</View>
					</View>
				}
			</View>
		);
	}
}