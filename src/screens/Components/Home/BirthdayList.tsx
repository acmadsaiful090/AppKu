import React from 'react';
import { View, Text } from 'react-native';
import { Icon, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
    padding: wp('2%'), // Responsive padding
    marginRight: wp('2.5%'), // Responsive margin
    borderRadius: wp('2.5%'), // Responsive border radius
    alignItems: 'center',
    width: wp('60%'), // Responsive width
    height: wp('20%'), // Responsive height
  },
  iconCircle: {
    width: wp('10%'), // Responsive width
    height: wp('10%'), // Responsive height
    borderRadius: wp('5%'), // Responsive border radius
    backgroundColor: '#B0B0B0',  
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2.5%'), // Responsive margin
  },
  itemIcon: {
    width: wp('6%'), // Responsive width
    height: wp('6%'), // Responsive height
  },
  birthdayText: {
    justifyContent: 'center',
    flexShrink: 1, 
  },
  birthdayName: {
    fontSize: wp('4%'), // Responsive font size
    fontWeight: 'bold',
    color: 'text-basic-color',
  },
  birthdayDate: {
    fontSize: wp('3.5%'), // Responsive font size
    color: 'text-basic-color',
  },
  birthdayRole: {
    fontSize: wp('3%'), // Responsive font size
    color: 'text-basic-color',
  },
});
