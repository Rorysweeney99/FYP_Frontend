import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import {Formik} from 'formik';

interface LoginDriverInstructorProps {
  navigation: any;
}

export default function LoginDriverInstructor( props: LoginDriverInstructorProps ) {
  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = (credentials: any) => {
    console.log(credentials);
    const url = 'http://localhost:3000/drivinginstructor/signindrivinginstructor';

    axios.post(url, credentials).then ((response) => {
      const result = response.data;
      const {message, status, data} = result;

      if (status !== 'SUCCESS'){
        console.log(message);
      }else {
        props.navigation.navigate("DashboardDriverInstructor", {...data[0]});
      }
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Driving Instructor Login</Text>
      </View>
      <View style={styles.text2}>
        <Text style={{color: '#FFFFFF'}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("SignUpDriverInstructor")} >
          <Text style={styles.signupText}> Sign up</Text>
        </TouchableOpacity>
      </View>

      <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => {
              if (values.email == '' || values.password == '') {
                  console.log("the email or pass input values are empty");
              } else {
                handleLogin(values);
              }
            }}
          >
      {({handleChange, handleSubmit, values}) => (
        <View>
        <View style={styles.Middle}>
            {/* Username or Email Input Field */}
              <View style={styles.emailInput}>
                <Input InputLeftElement={<Icon as={<MaterialCommunityIcons name="account" />} size="sm" m={2} />} 
                variant="unstyled" 
                placeholder="Email" 
                onChangeText={handleChange('email')}
                value={values.email} />
              </View>

            {/* Password Input Field */}
              <View style={styles.emailInput}>
                <Input InputLeftElement={<Icon as={<MaterialCommunityIcons name="lock" />} size="sm" m={2} />} 
                variant="unstyled" 
                secureTextEntry={true} 
                placeholder="Password" 
                onChangeText={handleChange('password')}
                value={values.password}/>
              </View>
        </View>
            {/* Button */}
            <View style={styles.buttonStyle}>
              <Button style={styles.buttonDesign} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </View>
        </View>
      )}
      </Formik>
      
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
    fontSize:30,
    fontWeight:'bold',
    color: '#FFFFFF', 
  },
  AreyouDriverInstructorText: {
    marginTop:10,
    fontSize:30,
    fontWeight:'bold',
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
    marginRight:5,
    width: 300,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF'
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
    marginTop:30,
    marginLeft:15,
    marginRight:15,
    alignItems:'center'
  },
  imageStyle:{
    width:80,
    height:80,
    marginLeft:20,
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
});