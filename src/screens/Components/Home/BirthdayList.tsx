import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const BirthdayList = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const maleColor = '#00BCD4';  
  const femaleColor = '#FFCDD2';  
  const unknownColors = ['#B0B0B0', '#DDA002', '#FFDE70'];

  const backgroundColor = item.gender === 'male' 
    ? maleColor 
    : item.gender === 'female' 
    ? femaleColor 
    : unknownColors[Math.floor(Math.random() * unknownColors.length)];

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
    padding: screenWidth * 0.02, // 2% of screen width
    marginRight: screenWidth * 0.025, // 2.5% of screen width
    borderRadius: screenWidth * 0.025, // 2.5% of screen width
    alignItems: 'center',
    width: screenWidth * 0.6, // 60% of screen width
    height: screenWidth * 0.2, // 20% of screen width
  },
  iconCircle: {
    width: screenWidth * 0.1, // 10% of screen width
    height: screenWidth * 0.1, // 10% of screen width
    borderRadius: screenWidth * 0.05, // 5% of screen width
    backgroundColor: '#B0B0B0',  
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: screenWidth * 0.025, // 2.5% of screen width
  },
  itemIcon: {
    width: screenWidth * 0.06, // 6% of screen width
    height: screenWidth * 0.06, // 6% of screen width
  },
  birthdayText: {
    justifyContent: 'center',
    flexShrink: 1, 
  },
  birthdayName: {
    fontSize: screenWidth * 0.04, // 4% of screen width
    fontWeight: 'bold',
    color: 'text-basic-color',
  },
  birthdayDate: {
    fontSize: screenWidth * 0.035, // 3.5% of screen width
    color: 'text-basic-color',
  },
  birthdayRole: {
    fontSize: screenWidth * 0.03, // 3% of screen width
    color: 'text-basic-color',
  },
});
