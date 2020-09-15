import React from 'react' ;
import {Text ,View, StyleSheet , ImageBackground, TextInput, TouchableOpacity, Button } from 'react-native';

export default class SignUp extends React.Component {

state = {
name:'',
email:'',
number:'',
password:'',
country:'',
username:'',
dob:'',
};

submit=()=>{

    const { dob, password, number, email, name } = this.state

    if (dob == '' || number == '' || password == '' || email == '' || name == '' ) {
        alert("All field inputs required!")
    } else {
        alert('Success! Welcome to Pet Search')
        this.props.navigation.navigate('Home');
    }
};
render() {
    return (
      
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>Sign Up</Text>

        <TextInput
        onChangeText ={name=>this.setState({name})}
          placeholder="Name"
          style={inputStyle.container}

        />
         <TextInput
        onChangeText ={email=>this.setState({email})}
          placeholder="Email"
          style={inputStyle.container}

        />
         <TextInput
        onChangeText ={number=>this.setState({number})}
          placeholder="Phone Number"
          style={inputStyle.container}

        />
         <TextInput
        onChangeText ={dob=>this.setState({dob})}
          placeholder="Date :dd/mm/yyyy "
          style={inputStyle.container}

        />

        <TextInput
        onChangeText={password=>this.setState({password})}
          placeholder="Password"
          secureTextEntry={true}
          style={inputStyle.container}
        />
        <Button
            title="Sign Up"
            onPress={this.submit}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const inputStyle = StyleSheet.create({
    container: {
        backgroundColor: '#efefef',
        padding: 10,
        width: '70%',
        marginTop: 10,
        fontSize: 18,
    },
  });
