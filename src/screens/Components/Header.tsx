import React, { useState } from 'react';
import { View, Image, Alert, Pressable, Dimensions } from 'react-native';
import { StyleService, useStyleSheet, Icon, Text } from '@ui-kitten/components';
import Logo from '../../assets/images/logo/logo-header.png';
import SettingsModal from '../../components/SettingsModal';

const Header = ({ title, onLogout, toggleTheme, theme }) => {
  const styles = useStyleSheet(themedStyles);
  const [modalVisible, setModalVisible] = useState(false);
  const isEnabled = theme === 'light';

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: onLogout },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text category="label" style={styles.logoText}>JC CORPORATED</Text>
      </View>
      
      <Text category="h5" style={styles.title}>{title}</Text>

      <Pressable onPress={() => setModalVisible(true)}>
        <Icon
          name="settings-outline"
          fill={isEnabled ? "#3366FF" : "#F2F6FF"}
          style={styles.icon}
        />
      </Pressable>

      <SettingsModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onLogout={handleLogout} 
        theme={theme} 
        toggleTheme={toggleTheme}
      />
    </View>
  );
};

const themedStyles = StyleService.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Dimensions.get('window').width * 0.015,
    backgroundColor: 'background-header-color',
    position: 'relative',
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: Dimensions.get('window').width * 0.1,
    height: Dimensions.get('window').width * 0.1,
  },
  logoText: {
    color: 'text-header-color',
    fontSize: Dimensions.get('window').width * 0.015,
    fontWeight: '900',
  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width * 0.25 }],
    color: 'text-header-color',
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width * 0.05,
    textAlign: 'center',
    width: Dimensions.get('window').width * 0.5,
  },
  icon: {
    width: Dimensions.get('window').width * 0.08,
    height: Dimensions.get('window').width * 0.08,
  },
});

export default Header;
