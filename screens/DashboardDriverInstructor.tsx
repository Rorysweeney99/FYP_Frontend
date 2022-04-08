import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio, Select, CheckIcon, Center } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

interface DashboardProps {
  navigation: any;
  route: any;
}

export default function DashboardDriverInstructor ( props: DashboardProps ) {
  let [learnerDrivers,setLearnerDrivers] = React.useState([]);
  const {name, email, location} = props.route.params;


  useEffect(() => {
    handleGetLearnerDrivers(props.route.params);
  });

  const handleGetLearnerDrivers = (credentials: any) => {
    const url = 'http://localhost:3000/learnerdriver/getlearnerdrivers';

    axios.post(url, credentials).then(response => {
      const result = response.data;
      const {message, status, data} = result;

      if (status !== 'SUCCESS'){
        console.log(message);
      }else {
        setLearnerDrivers(data);
      }
    }).catch(error => {
      console.log(error);
    })
  }


  return (
    <View style={styles.container}>
      <View style={styles.topMargin}></View>

      <View style={styles.Middle}>
        <Image source={require('../assets/images/App-logo5.png')} style={styles.Logo}/>
      </View>

      <View style={styles.Middle}>
        <Text style={styles.WelcomeText}>Welcome {name}</Text>
      </View>

      {/* Line */}
      <View style={styles.lineStyle}>
        <View style={{flex: 1, height: 2, backgroundColor: '#EB6E23'}} />
      </View>
      
      <View style={styles.Middle}>
        <Text style={styles.LoginText}> Your District is {location.city}, {location.name}.</Text>
      </View>

      <View style={styles.Middle}>
        <Text style={styles.LoginText}> 
          There are <Text style={styles.signupText}>{learnerDrivers.length}</Text> Learner Drivers in your district
        </Text>
      </View>

      {/* Button - Login*/}
      <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} onPress={() => props.navigation.navigate("Onboarding")}>
          <Text style={styles.buttonText}>Log Out</Text>
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
  WelcomeText: {
    fontSize:30,
    fontWeight:'bold',
    color: '#FFFFFF',
  },
  topMargin:{
    marginTop:50,
  },
  LoginText: {
    fontSize:20,
    color: '#FFFFFF',
  },
  LoginText2: {
    flex: 2, 
    borderWidth: 3, 
    borderColor: '#EB6E23', 
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  DashboardText: {
    fontSize:60,
    color: '#FFFFFF',
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
    fontWeight:'bold',
    color: '#EB6E23',
  },
  emailField:{
    marginTop:30,
    marginLeft:15
  },
  emailInput:{
    marginTop:10,
    marginRight:5
  },
  buttonStyle:{
    alignItems:'center',
    marginTop:20,
  },
  buttonStyleX:{
    marginTop:12,
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
    marginTop:20,
    marginBottom: 20,
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
    marginLeft:15,
    marginRight:15,
    justifyContent:'space-around'
  },
  Logo:{
     width: 150, 
     height: 150,
     borderRadius: 10,
  },
});