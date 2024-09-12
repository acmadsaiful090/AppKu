import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen';
import CameraScreen from 'screens/CameraScreen';
import ScheduleScreen from 'screens/ScheduleScreen';
import LeaveScreen from 'screens/LeaveScreen';
import PaycheckScreen from 'screens/PaycheckScreen';
import ApplyLeaveScreen from 'screens/ApplyLeaveScreen';
import LeaveDetailScreen from 'screens/LeaveDetailScreen';
import ProfileDetailScreen from 'screens/ProfileDetailScreen'; 
import Navbar from './Navbar';
import Header from 'screens/Components/Header';

const Tab = createBottomTabNavigator();

const AppNavigator = ({ currentRoute, setCurrentRoute, onLogout, toggleTheme, theme }) => {
  // Helper function to generate header
  const generateHeader = (title) => (props) => (
    <Header title={title} onLogout={onLogout} toggleTheme={toggleTheme} theme={theme} />
  );

  // Routes that hide the Navbar
  const hideNavbarRoutes = ['Camera', 'ApplyLeave', 'SplashSc', 'Login', 'LeaveDetail', 'ProfileDetail'];

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={() => !hideNavbarRoutes.includes(currentRoute) && <Navbar currentRoute={currentRoute} />}
      listeners={({ navigation }) => ({
        state: (e) => {
          const route = e.data.state.routes[e.data.state.index];
          setCurrentRoute(route.name);
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ header: generateHeader('Home') }}
      />
      <Tab.Screen
        name="Camera"
        options={{ headerShown: false }}
      >
        {() => <CameraScreen theme={theme} />}
      </Tab.Screen>
      <Tab.Screen
        name="Attendance"
        component={ScheduleScreen}
        options={{ header: generateHeader('Attendance') }}
      />
      <Tab.Screen
        name="Leave"
        component={LeaveScreen}
        options={{ header: generateHeader('Leave') }}
      />
      <Tab.Screen
        name="Paycheck"
        component={PaycheckScreen}
        options={{ header: generateHeader('Paycheck') }}
      />
      <Tab.Screen
        name="ApplyLeave"
        component={ApplyLeaveScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="LeaveDetail"
        component={LeaveDetailScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
