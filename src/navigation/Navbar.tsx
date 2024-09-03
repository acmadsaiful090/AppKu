import React from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Text, useStyleSheet, useTheme, StyleService } from '@ui-kitten/components';

const { width, height } = Dimensions.get('window');

const Navbar = ({ currentRoute }) => {
  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const getIcon = (name, route) => (
    <Icon
      name={name}
      width={width * 0.065}
      height={width * 0.065}
      fill={currentRoute === route ? theme['navbar-button-color'] : theme['icon-default-color']}
    />
  );

  return (
    <View style={[styles.navbar, { backgroundColor: theme['navbar-background-color'] }]}>
      <Pressable style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        {getIcon('home-outline', 'Home')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Home' ? theme['navbar-button-color'] : theme['icon-default-color'] }]}>Home</Text>
      </Pressable>
      <Pressable style={styles.navItem} onPress={() => navigation.navigate('Leave')}>
        {getIcon('paper-plane-outline', 'Leave')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Leave' ? theme['navbar-button-color'] : theme['icon-default-color'] }]}>Leave</Text>
      </Pressable>
      <Pressable style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
        <Icon name='camera-outline' fill='white' style={styles.cameraIcon} />
      </Pressable>
      <Pressable style={styles.navItem} onPress={() => navigation.navigate('Attendance')}>
        {getIcon('calendar-outline', 'Attendance')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Attendance' ? theme['navbar-button-color'] : theme['icon-default-color'] }]}>Attendance</Text>
      </Pressable>
      <Pressable style={styles.navItem} onPress={() => navigation.navigate('Paycheck')}>
        {getIcon('credit-card-outline', 'Paycheck')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Paycheck' ? theme['navbar-button-color'] : theme['icon-default-color'] }]}>Paycheck</Text>
      </Pressable>
    </View>
  );
};

const themedStyles = StyleService.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: width * 0.001,
  },
  navItem: {
    marginTop: height * 0.01,
    width: width * 0.2,
    alignItems: 'center',
  },
  navLabel: {
    fontSize: width * 0.03,
  },
  cameraButton: {
    top: -height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    backgroundColor: 'navbar-button-color',
  },
  cameraIcon: {
    width: width * 0.07,
    height: width * 0.07,
  },
});

export default Navbar;
