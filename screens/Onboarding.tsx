import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, AspectRatio } from 'native-base';

interface OnboardingProps {
  navigation: any;
}

export default function Onboarding( props: OnboardingProps ) {
  return (
    <View style={styles.container}>
      <View style={styles.topMargin}></View>

      <View style={styles.Middle}>
          <Image source={require('../assets/images/App-logo4.png')} style={styles.Logo} />
      </View>

      {/* Button - Login*/}
      <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} onPress={() => props.navigation.navigate("LoginLearnerDriver")}>
          <Text style={styles.buttonText}>Login</Text>
        </Button>
      </View>

      {/* Button - SignUp*/}
      <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} onPress={() => props.navigation.navigate("SignUpLearnerDriver")}>
        <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#247BC6',
  },
  LoginText: {
    marginTop:70,
    fontSize:40,
    fontWeight:'bold',
  },
  topMargin:{
    marginTop:70,
  },
  Middle:{
    alignItems:'center',
    justifyContent:'center',
  },
  text2:{
    flexDirection:'row',
    justifyContent:'center',
    paddingTop:5
  },
  signupText:{
    fontWeight:'bold'
  },
  emailField:{
    marginTop:30,
    marginLeft:15
  },
  emailInput:{
    marginTop:10,
    marginRight:5,
    color: '#026efd',
  },
  buttonStyle:{
    alignItems:'center',
    marginTop:20,
  },
  buttonStyleX:{
    marginTop:5,
    marginLeft:15,
    marginRight:15
  },
  buttonDesign:{
    backgroundColor:'#5296D4',
    width: 300,
    borderRadius: 10,
  },
  lineStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
  buttonText:{
    color: '#FFFFFF', 
    fontSize: 20, 
    fontWeight:'bold',
  },
  boxStyle:{
    flexDirection:'row',
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    justifyContent:'space-around'
  },
  Logo:{
     width: 450, 
     height: 275,
     borderRadius: 10,
     marginBottom: 25,
    },
});