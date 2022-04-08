import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen }= createNativeStackNavigator();

import SignUpLearnerDriver from '../screens/SignUpLearnerDriver';
import LoginLearnerDriver from '../screens/LoginLearnerDriver';
import SignUpDriverInstructor from './../screens/SignUpDriverInstructor';
import LoginDriverInstructor from '../screens/LoginDriverInstructor';
import Onboarding from './../screens/Onboarding';
import DashboardLearnerDriver from '../screens/DashboardLearnerDriver';
import DashboardDriverInstructor from '../screens/DashboardDriverInstructor';

const RootStack = () => {
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false}} initialRouteName="Onboarding" >
                <Screen name="Onboarding" component={Onboarding} />
                <Screen name="LoginLearnerDriver" component={LoginLearnerDriver} />
                <Screen name="SignUpLearnerDriver" component={SignUpLearnerDriver} />
                <Screen name="SignUpDriverInstructor" component={SignUpDriverInstructor} />
                <Screen name="LoginDriverInstructor" component={LoginDriverInstructor} />
                <Screen name="DashboardLearnerDriver" component={DashboardLearnerDriver} />
                <Screen name="DashboardDriverInstructor" component={DashboardDriverInstructor} />
            </Navigator>
        </NavigationContainer>
    )
}

export default RootStack;