import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

function AppContainer({ toggleTheme,currentTheme }) {
  const [authState, setAuthState] = useState({ isLoggedIn: false, isLoading: true });
  const [currentRoute, setCurrentRoute] = useState('Home');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setAuthState({ isLoggedIn: loggedIn === 'true', isLoading: false });
      } catch (error) {
        console.error(error);
        setAuthState({ isLoggedIn: false, isLoading: false });
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = useCallback(async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'true');
      setAuthState((prev) => ({ ...prev, isLoggedIn: true }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      setAuthState((prev) => ({ ...prev, isLoggedIn: false }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (authState.isLoading) {
    return null; 
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        onStateChange={(state) => {
          const route = state.routes[state.index];
          setCurrentRoute(route.name);
        }}
      >
        <Layout style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            {authState.isLoggedIn ? (
              <AppNavigator
                currentRoute={currentRoute}
                setCurrentRoute={setCurrentRoute}
                onLogout={handleLogout}
                toggleTheme={toggleTheme}
                theme={currentTheme}
              />
            ) : (
              <AuthNavigator onLogin={handleLogin} />
            )}
          </SafeAreaView>
        </Layout>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppContainer;
