import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, Icon, IconRegistry, Layout, Text as KittenText, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from 'screens/HomeScreen';
import CameraScreen from 'screens/CameraScreen';
import AbsensiScreen from 'screens/AbsensiScreen';
import LeaveScreen from 'screens/LeaveScreen'; 
import PaycheckScreen from 'screens/PaycheckScreen';

const Stack = createStackNavigator();

const Navbar = ({ currentRoute }) => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.navbar} level="1">
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        <Icon name="home-outline" width={24} height={24} fill={currentRoute === 'Home' ? styles.iconActive.color : styles.iconInactive.color} />
        <KittenText style={[styles.navLabel, currentRoute === 'Home' && styles.navLabelActive]}>Home</KittenText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Leave')}>
        <Icon name="plane-outline" width={24} height={24} fill={currentRoute === 'Leave' ? styles.iconActive.color : styles.iconInactive.color} />
        <KittenText style={[styles.navLabel, currentRoute === 'Leave' && styles.navLabelActive]}>Leave</KittenText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
        <Icon name="camera-outline" width={24} height={24} fill={styles.iconActive.color} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Attendance')}>
        <Icon name="calendar-outline" width={24} height={24} fill={currentRoute === 'Attendance' ? styles.iconActive.color : styles.iconInactive.color} />
        <KittenText style={[styles.navLabel, currentRoute === 'Attendance' && styles.navLabelActive]}>Attendance</KittenText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Paycheck')}>
        <Icon name="credit-card-outline" width={24} height={24} fill={currentRoute === 'Paycheck' ? styles.iconActive.color : styles.iconInactive.color} />
        <KittenText style={[styles.navLabel, currentRoute === 'Paycheck' && styles.navLabelActive]}>Paycheck</KittenText>
      </TouchableOpacity>
    </Layout>
  );
};

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('Home');
  const styles = useStyleSheet(themedStyles);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <NavigationContainer
            onStateChange={(state) => {
              const route = state.routes[state.index];
              setCurrentRoute(route.name);
            }}
          >
            <SafeAreaView style={{ flex: 1 }}>
              <Layout style={styles.container}>
                <Stack.Navigator
                  initialRouteName="Home"
                  screenOptions={{
                    headerShown: false, // Hide the header for all screens
                  }}
                >
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Attendance" component={AbsensiScreen} />
                  <Stack.Screen name="Camera" component={CameraScreen} />
                  <Stack.Screen name="Leave" component={LeaveScreen} />
                  <Stack.Screen name="Paycheck" component={PaycheckScreen} />
                </Stack.Navigator>
                {currentRoute !== 'Camera' && <Navbar currentRoute={currentRoute} />}
              </Layout>
            </SafeAreaView>
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'background-basic-color-1',
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: 'color-basic-300',
  },
  navItem: {
    alignItems: 'center',
  },
  navLabel: {
    fontSize: 12,
    color: 'color-basic-600',
  },
  navLabelActive: {
    color: 'color-primary-default',
  },
  iconActive: {
    color: 'color-primary-default',
  },
  iconInactive: {
    color: 'color-basic-600',
  },
  cameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'background-basic-color-1',
    borderWidth: 2,
    borderColor: 'color-primary-default',
    zIndex: 1,
  },
});

export default App;
