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
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Icon name='home-outline' width={24} height={24} fill="#757575" />
        <Text style={styles.navLabel}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Leave')}>
        <Icon name='paper-plane-outline' width={24} height={24} fill="#757575" />
        <Text style={styles.navLabel}>Leave</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
        <Icon name='camera-outline' width={24} height={24} fill="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Attendance')}>
        <Icon name='calendar-outline' width={24} height={24} fill="#757575" />
        <Text style={styles.navLabel}>Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Paycheck')}>
        <Icon name='credit-card-outline' width={24} height={24} fill="#757575" />
        <Text style={styles.navLabel}>Paycheck</Text>
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
            {currentRoute !== 'Camera' && <Navbar currentRoute={currentRoute} />}
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
    color: '#757575',
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