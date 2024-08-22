import React from 'react';
import { View, Dimensions } from 'react-native';
import { Icon, StyleService, useStyleSheet, useTheme,Text } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const BirthdayList = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const backgroundColor = item.gender === 'male' 
    ? '#00BCD4' 
    : item.gender === 'female' 
    ? '#FFCDD2' 
    : ['#B0B0B0', '#DDA002', '#FFDE70'][Math.floor(Math.random() * 3)];

  return (
    <View style={[styles.birthdayItem, { backgroundColor }]}>
      <View style={styles.iconCircle}>
        <Icon name={item.icon} fill={theme['icon-home-color']} style={styles.itemIcon} />
      </View>
      <View style={styles.birthdayText}>
        <Text style={styles.birthdayName}>{item.name}</Text>
        <Text style={styles.birthdayDate}>{item.date}</Text>
        <Text style={styles.birthdayRole}>{item.role}</Text>
      </View>
    </View>
  );
};

export default BirthdayList;

const themedStyles = StyleService.create({
  birthdayItem: {
    flexDirection: 'row',
    padding: screenWidth * 0.02,
    marginRight: screenWidth * 0.025,
    borderRadius: screenWidth * 0.025,
    alignItems: 'center',
    width: screenWidth * 0.6,
    height: screenWidth * 0.2,
  },
  iconCircle: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.05,
    backgroundColor: '#B0B0B0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: screenWidth * 0.025,
  },
  itemIcon: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06,
  },
  birthdayText: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  birthdayName: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: 'text-basic-color',
  },
  birthdayDate: {
    fontSize: screenWidth * 0.035,
    color: 'text-basic-color',
  },
  birthdayRole: {
    fontSize: screenWidth * 0.03,
    color: 'text-basic-color',
  },
});
