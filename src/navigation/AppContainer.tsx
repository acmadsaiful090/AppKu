import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Header from 'screens/Components/Header';

function AppContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('Home');

  useEffect(() => {
    const checkLoginStatus = async () => {
      setTimeout(() => {
        setIsLoggedIn(false);
        setIsLoading(false);
      }, 1000);
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentRoute('Login');
  };

  if (isLoading) {
    return null;
  }

  const shouldShowHeader = isLoggedIn && !['Camera', 'ApplyLeave'].includes(currentRoute);

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
