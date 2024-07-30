import React from 'react';
import { View, Image, TouchableOpacity, Alert } from 'react-native';
import { StyleService, useStyleSheet, Icon, Text } from '@ui-kitten/components';
import Logo from '../../assets/images/logo/logo.png';

const Header = ({ title, onLogout }) => {
  const styles = useStyleSheet(themedStyles);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => onLogout(),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.header}>
      <Image source={Logo} style={styles.logo} />
      <Text category='h5' style={styles.title}>
        {title}
      </Text>
      <TouchableOpacity onPress={handleLogout}>
        <Icon name='power-outline' fill='red' style={styles.powerIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const themedStyles = StyleService.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'color-primary-500',
  },
  logo: {
    width: 40,
    height: 40,
  },
  powerIcon: {
    width: 24,
    height: 24,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
