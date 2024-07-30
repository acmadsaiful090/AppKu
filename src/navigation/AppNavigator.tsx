import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen';
import CameraScreen from 'screens/CameraScreen';
import ScheduleScreen from 'screens/ScheduleScreen';
import LeaveScreen from 'screens/LeaveScreen';
import PaycheckScreen from 'screens/PaycheckScreen';
import ApplyLeaveScreen from 'screens/ApplyLeaveScreen';
import Navbar from './Navbar';

const Tab = createBottomTabNavigator();

const AppNavigator = ({ currentRoute, setCurrentRoute }) => (
  <Tab.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Home"
    tabBar={() =>
      !(currentRoute === 'Camera' || currentRoute === 'ApplyLeave' || currentRoute === 'SplashSc' || currentRoute === 'Login') && <Navbar currentRoute={currentRoute} />
    }
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Camera" component={CameraScreen} />
    <Tab.Screen name="Attendance" component={ScheduleScreen} />
    <Tab.Screen name="Leave" component={LeaveScreen} />
    <Tab.Screen name="Paycheck" component={PaycheckScreen} />
    <Tab.Screen name="ApplyLeave" component={ApplyLeaveScreen} />
  </Tab.Navigator>
);

export default AppNavigator;
