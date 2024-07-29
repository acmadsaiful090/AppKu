import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider, IconRegistry, Layout, Text, StyleService, useStyleSheet, Icon ,useTheme} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { View, TouchableOpacity } from 'react-native';
import HomeScreen from 'screens/HomeScreen';
import CameraScreen from 'screens/CameraScreen';
import ScheduleScreen from 'screens/ScheduleScreen';
import LeaveScreen from 'screens/LeaveScreen';
import PaycheckScreen from 'screens/PaycheckScreen';
import ApplyLeaveScreen from 'screens/ApplyLeaveScreen';

const Tab = createBottomTabNavigator();

const Navbar = ({ currentRoute }) => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const getIcon = (name, route) => (
    <Icon
      name={name}
      width={24}
      height={24}
      fill={currentRoute === route ? theme['color-primary-500'] : theme['color-basic-600']}
    />
  );
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        {getIcon('home-outline', 'Home')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Home' ? theme['color-primary-500'] : theme['color-basic-600']}]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Leave')}>
        {getIcon('paper-plane-outline', 'Leave')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Leave' ? theme['color-primary-500'] : theme['color-basic-600'] }]}>Leave</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
        <Icon name='camera-outline' fill='white' style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Attendance')}>
        {getIcon('calendar-outline', 'Attendance')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Attendance' ? theme['color-primary-500'] : theme['color-basic-600'] }]}>Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Paycheck')}>
        {getIcon('credit-card-outline', 'Paycheck')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Paycheck' ? theme['color-primary-500'] : theme['color-basic-600'] }]}>Paycheck</Text>
      </TouchableOpacity>
    </View>
  );
};

function AppContainer() {
  const [currentRoute, setCurrentRoute] = useState('Home');
  const styles = useStyleSheet(themedStyles);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer
          onStateChange={(state) => {
            const route = state.routes[state.index];
            setCurrentRoute(route.name);
          }}
        >
          <Layout style={{ flex: 1 }}>
            <Tab.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Home"
              tabBar={() =>
                !(currentRoute === 'Camera' || currentRoute === 'ApplyLeave') && <Navbar currentRoute={currentRoute} />
              }
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Camera" component={CameraScreen} />
              <Tab.Screen name="Attendance" component={ScheduleScreen} />
              <Tab.Screen name="Leave" component={LeaveScreen} />
              <Tab.Screen name="Paycheck" component={PaycheckScreen} />
              <Tab.Screen name="ApplyLeave" component={ApplyLeaveScreen} />
            </Tab.Navigator>
          </Layout>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

const themedStyles = StyleService.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    width: '20%',
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
  },
  cameraButton: {
    top: -20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'color-primary-500',
    borderWidth: 2,
    borderColor: 'color-primary-500',
  },
});

export default AppContainer;
