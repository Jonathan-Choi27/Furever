import React from 'react';
import { Text, View, Button } from 'react-native';

export default class LandingPage extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Hello, World!</Text>     
        <Text>Logo Goes Here :)</Text>

        <Button
            title="Login"
            onPress={() =>
              this.props.navigation.navigate('Login')
            }
          />
        <Button
            title="Sign Up"
            onPress={() =>
              this.props.navigation.navigate('SignUp')
            }
          />
      </View>
    );
  } 
}