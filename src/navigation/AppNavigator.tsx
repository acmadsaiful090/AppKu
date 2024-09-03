import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from 'screens/HomeScreen';
import CameraScreen from 'screens/CameraScreen';
import ScheduleScreen from 'screens/ScheduleScreen';
import LeaveScreen from 'screens/LeaveScreen';
import PaycheckScreen from 'screens/PaycheckScreen';
import ApplyLeaveScreen from 'screens/ApplyLeaveScreen';
import LeaveDetailScreen from 'screens/LeaveDetailScreen';
import ProfileDetailScreen from 'screens/ProfileDetailScreen'; // Import ProfileDetailScreen
import Navbar from './Navbar';
import Header from 'screens/Components/Header';

const Tab = createBottomTabNavigator();

const AppNavigator = ({ currentRoute, setCurrentRoute, onLogout, toggleTheme, theme }) => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBar={() =>
      !['Camera', 'ApplyLeave', 'SplashSc', 'Login', 'LeaveDetail','ProfileDetail'].includes(currentRoute) && (
        <Navbar currentRoute={currentRoute} />
      )
    }
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
      options={{
        header: (props) => (
          <Header
            title="Home"
            onLogout={onLogout}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        ),
      }}
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
      options={{
        header: (props) => (
          <Header
            title="Attendance"
            onLogout={onLogout}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Leave"
      component={LeaveScreen}
      options={{
        header: (props) => (
          <Header
            title="Leave"
            onLogout={onLogout}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Paycheck"
      component={PaycheckScreen}
      options={{
        header: (props) => (
          <Header
            title="Paycheck"
            onLogout={onLogout}
            toggleTheme={toggleTheme}
            theme={theme}
          />
        ),
      }}
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

export default AppNavigator;
