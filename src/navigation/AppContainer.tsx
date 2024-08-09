import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Header from 'screens/Components/Header';

function AppContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('Home');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedIn === 'true');
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setIsLoggedIn(false);
      setCurrentRoute('Login');
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return null; 
  }

  const shouldShowHeader = isLoggedIn && !['Camera', 'ApplyLeave','LeaveDetail'].includes(currentRoute);

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
              <Layout style={{ flex: 1 }}>
                {shouldShowHeader && <Header title={currentRoute} onLogout={handleLogout} />}
                {isLoggedIn ? (
                  <AppNavigator currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
                ) : (
                  <AuthNavigator onLogin={handleLogin} />
                )}
              </Layout>
            </SafeAreaView>
          </NavigationContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
}

export default AppContainer;
