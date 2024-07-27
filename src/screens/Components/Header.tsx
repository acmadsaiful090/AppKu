import React from 'react';
import { View, Image } from 'react-native';
import { Icon } from '@ui-kitten/components';
import Logo from '../../assets/images/logo/logo.png';

const Header = ({ styles }) => (
  <View style={styles.header}>
    <Image source={Logo} style={styles.logo} />
    <Icon name='power-outline' fill='red' style={styles.powerIcon} />
  </View>
);

export default Header;
