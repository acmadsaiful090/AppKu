import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Layout } from '@ui-kitten/components';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

function AppContainer({ toggleTheme, currentTheme }) {
  const [authState, setAuthState] = useState({ isLoggedIn: false, isLoading: true });
  const [currentRoute, setCurrentRoute] = useState('Home');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await AsyncStorage.getItem('isLoggedIn');
        setAuthState({ isLoggedIn: loggedIn === 'true', isLoading: false });
      } catch (error) {
        console.error('Failed to check login status', error);
        setAuthState({ isLoggedIn: false, isLoading: false });
      }
    };
    checkLoginStatus();
  }, []);

  const updateLoginStatus = useCallback(async (status) => {
    try {
      await AsyncStorage.setItem('isLoggedIn', status.toString());
      setAuthState((prev) => ({ ...prev, isLoggedIn: status }));
    } catch (error) {
      console.error(`Failed to ${status ? 'login' : 'logout'}`, error);
    }
  }, []);

  if (authState.isLoading) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer
        onStateChange={(state) => setCurrentRoute(state.routes[state.index].name)}
      >
        <Layout style={{ flex: 1 }}>
          <SafeAreaView style={{ flex: 1 }}>
            {authState.isLoggedIn ? (
              <AppNavigator
                currentRoute={currentRoute}
                setCurrentRoute={setCurrentRoute}
                onLogout={() => updateLoginStatus(false)}
                toggleTheme={toggleTheme}
                theme={currentTheme}
              />
            ) : (
              <AuthNavigator onLogin={() => updateLoginStatus(true)} />
            )}
          </SafeAreaView>
        </Layout>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default AppContainer;
