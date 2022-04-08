import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio, Select, CheckIcon, Center } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import {Formik} from 'formik';

interface SignUpDriverInstructorProps {
  navigation: any;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export default function SignUpDriverInstructor( props: SignUpDriverInstructorProps ) {
  let [countyName, setCountyName] = React.useState("");
  let [city, setCity] = React.useState("");
  let [counties,setCounties] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/county/getcounties')
      .then(res => {
        setCounties(res.data);
    })
  });

  const handleSignup = (credentials: any) => {
    console.log(credentials);
    const url = 'http://localhost:3000/drivinginstructor/signupdrivinginstructor';
    

    axios.post(url, credentials).then ((response) => {
      const result = response.data;
      const {message, status, data} = result;

      if (status !== 'SUCCESS'){
        console.log(message);
      }else {
        props.navigation.navigate("DashboardDriverInstructor", {...data});
      }
    }).catch(error => {
      console.log(error);
    })
  }

  const allNames = counties.map((county) => county.name);
  const names = allNames.filter(onlyUnique);
  const cities = counties.map((county) => county.city);
  return (
    <View style={styles.container}>

      <View style={styles.Middle}>
        <Text style={styles.LoginText}>Driving Instructor Signup</Text>
      </View>
      <View style={styles.text2}>
        <Text style={{ color: '#FFFFFF'}}>Already have account? </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("LoginDriverInstructor")} >
          <Text style={styles.signupText}> Login</Text>
        </TouchableOpacity>
      </View>

      <Formik
            initialValues={{ name: '', email: '', ADINumber: '', password: '', confirmPassword: '' }}
            onSubmit={(values) => {
              //values = { ...values};
              if (values.email == '' || values.password == '' || values.ADINumber == '' || values.name == '' || values.confirmPassword == '' ) {
                console.log('Please fill in all fields');
              } else if (values.password !== values.confirmPassword) {
                console.log('Passwords do not match');
              } else {
                var name = values.name;
                var email = values.email;
                var adi = values.ADINumber;
                var password = values.password;
                var confirmPassword = values.confirmPassword;
                
                counties.map((location) => 
                  {
                    if (location.name === countyName && location.city === city) {
                      console.log(location);
                      const user1 = {name, email, adi, location, password, confirmPassword}
                      handleSignup(user1);
                  }
                });
              }
            }}
          >
      {({handleChange, handleSubmit, values}) => (
      <View>
      <View style={styles.Middle}>

      {/* Username Input Field */}
      <View style={styles.emailInput}>
          <Input
            InputLeftElement={ <Icon as={<MaterialCommunityIcons name="account" />} size="sm" m={2} /> }
            variant="unstyled"
            placeholder="name"
            onChangeText={handleChange('name')}
            value={values.name}
          />
        </View>

      {/* Email Input Field */}    
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={ <Icon as={<MaterialCommunityIcons name="email" />} size="sm" m={2}/>}
            variant="unstyled"
            placeholder="Email"
            onChangeText={handleChange('email')}
            value={values.email}
          />
        </View>


      {/* ADI Number */}
        <View style={styles.emailInput}>
          <Input 
            InputLeftElement={<Icon as={<MaterialCommunityIcons name="card-account-details" />} size="sm" m={2}/>} 
            variant="unstyled" 
            placeholder="Enter Valid ADI Number"
            onChangeText={handleChange('ADINumber')}
            value={values.ADINumber}
          />
        </View>

      {/* County Data Field */}       
      <View style={styles.emailInput}> 
        <Box>
          <Select 
            variant="unstyled"
            selectedValue={countyName} 
            minWidth="200"
            placeholder="Choose County" 
            accessibilityLabel="Choose County"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />}} 
            mt={1} 
            onValueChange={itemValue => setCountyName(itemValue)}>
              {names.map((name) => 
                <Select.Item label={name} value={name} />
              )}
          </Select>
        </Box>

        </View>
      
      {/* District Data Field */}       
      <View style={styles.emailInput}> 
      <Box>
        <Select 
          variant="unstyled"
          selectedValue={city} 
          minWidth="200" 
          placeholder="Choose District" 
          accessibilityLabel="Choose District"
          _selectedItem={{
            bg: "teal.600",
            endIcon: 
              <CheckIcon size="5" />}} 
          mt={1} 
          onValueChange={itemValue => setCity(itemValue)}
        >
          {cities.map((city) => 
            <Select.Item label={city} value={city} />
          )}
        </Select>
      </Box>
      </View>

      {/* Password Input Field */}       
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={ <Icon as={<MaterialCommunityIcons name="lock" />} size="sm"  m={2} /> }
            variant="unstyled"
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={handleChange('password')}
            value={values.password}
          />
        </View>

      {/* Confirm Password Input Field */}       
        <View style={styles.emailInput}>
          <Input
            InputLeftElement={ <Icon as={<MaterialCommunityIcons name="lock" />} size="sm" m={2} /> }
            variant="unstyled"
            secureTextEntry={true}
            placeholder="Confirm Password"
            onChangeText={handleChange('confirmPassword')}
            value={values.confirmPassword}
            />
        </View>     
    </View>        
      {/* Button - Driving Instrutor */}
      <View style={styles.buttonStyle}>
        <Button style={styles.buttonDesign} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
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