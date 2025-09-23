import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../components/SplashScreen';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import ProfileSetupScreen from '../components/ProfileSetupScreen';
import LoopBoardScreen from '../components/LoopBoard';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false,animation: 'fade', // smooth transition
    contentStyle: { backgroundColor: '#000' }, // ensures black base
  }}
>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
  name="Login"
  children={({ navigation }) => (
    <LoginScreen
      onSignupPress={() => navigation.navigate('Signup')}
      onForgotPress={() => navigation.navigate('ForgotPassword')}
    />
  )}
/>
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="LoopBoard" component={LoopBoardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;