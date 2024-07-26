import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider, IconRegistry, Layout, Text, StyleService, useStyleSheet, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { View, TouchableOpacity } from 'react-native';
import HomeScreen from 'screens/HomeScreen';
import CameraScreen from 'screens/CameraScreen';
import AbsensiScreen from 'screens/AbsensiScreen';
import LeaveScreen from 'screens/LeaveScreen';
import PaycheckScreen from 'screens/PaycheckScreen';
import ApplyLeaveScreen from 'screens/ApplyLeaveScreen';

const Stack = createNativeStackNavigator();

const Navbar = ({ currentRoute }) => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const getIcon = (name, route) => (
    <Icon
      name={name}
      width={24}
      height={24}
      fill={currentRoute === route ? "#2196F3" : "#757575"}
    />
  );
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        {getIcon('home-outline', 'Home')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Home' ? "#2196F3" : "#757575" }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Leave')}>
        {getIcon('paper-plane-outline', 'Leave')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Leave' ? "#2196F3" : "#757575" }]}>Leave</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
      <Icon name='camera-outline' fill='white' style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Attendance')}>
        {getIcon('calendar-outline', 'Attendance')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Attendance' ? "#2196F3" : "#757575" }]}>Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Paycheck')}>
        {getIcon('credit-card-outline', 'Paycheck')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Paycheck' ? "#2196F3" : "#757575" }]}>Paycheck</Text>
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
            <Stack.Navigator 
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Camera" component={CameraScreen} />
              <Stack.Screen name="Attendance" component={AbsensiScreen} />
              <Stack.Screen name="Leave" component={LeaveScreen} />
              <Stack.Screen name="Paycheck" component={PaycheckScreen} />
              <Stack.Screen name="ApplyLeave" component={ApplyLeaveScreen} />
            </Stack.Navigator>
            {!(currentRoute === 'Camera' || currentRoute === 'ApplyLeave') && <Navbar currentRoute={currentRoute} />}

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
    backgroundColor: '#2196F3',
    borderWidth: 2,
    borderColor: '#2196F3',
  },
});

export default AppContainer;