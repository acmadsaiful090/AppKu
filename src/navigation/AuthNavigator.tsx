import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashSc from 'screens/SplashSc';
import LoginScreen from 'screens/LoginScreen';

const Tab = createBottomTabNavigator();

const AuthNavigator = ({ onLogin }) => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="SplashSc"
      component={SplashSc}
      options={{ tabBarStyle: { display: 'none' } }}
    />
    <Tab.Screen
      name="Login"
      options={{ tabBarStyle: { display: 'none' } }}
    >
      {() => <LoginScreen onLogin={onLogin} />}
    </Tab.Screen>
  </Tab.Navigator>
);

export default AuthNavigator;
