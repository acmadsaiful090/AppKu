import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
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
      width={width * 0.06}
      height={width * 0.06}
      fill={currentRoute === route ? theme['color-primary-500'] : theme['color-basic-600']}
    />
  );

  return (
    <View style={[styles.navbar, { backgroundColor: theme['background-basic-color-1'] }]}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
        {getIcon('home-outline', 'Home')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Home' ? theme['color-primary-500'] : theme['color-basic-600'] }]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Leave')}>
        {getIcon('paper-plane-outline', 'Leave')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Leave' ? theme['color-primary-500'] : theme['color-basic-600'] }]}>Leave</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
        <Icon name='camera-outline' fill='white' style={styles.cameraIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Attendance')}>
        {getIcon('calendar-outline', 'Attendance')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Attendance' ? theme['color-primary-500'] : theme['color-basic-600'] }]}>Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Paycheck')}>
        {getIcon('credit-card-outline', 'Paycheck')}
        <Text style={[styles.navLabel, { color: currentRoute === 'Paycheck' ? theme['color-primary-500'] : theme['color-basic-600'] }]}>Paycheck</Text>
      </TouchableOpacity>
    </View>
  );
};

const themedStyles = StyleService.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: width * 0.01,
    borderTopWidth: 1,
    borderTopColor: 'color-basic-300',
  },
  navItem: {
    width: width * 0.2,
    alignItems: 'center',
  },
  navLabel: {
    fontSize: width * 0.03,
  },
  cameraButton: {
    top: -height * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    backgroundColor: 'color-primary-500',
  },
  cameraIcon: {
    width: width * 0.06,
    height: width * 0.06,
  },
});

export default Navbar;
