import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';

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

const { width } = Dimensions.get('window');

const themedStyles = StyleService.create({
  birthdayItem: {
    flexDirection: 'row',
    padding: 8,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: width * 0.6,
    height: 80, 
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#B0B0B0',  
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
  birthdayText: {
    justifyContent: 'center',
    flexShrink: 1, 
  },
  birthdayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'text-basic-color',
  },
  birthdayDate: {
    fontSize: 14,
    color: 'text-basic-color',
  },
  birthdayRole: {
    fontSize: 12,
    color: 'text-basic-color',
  },
});
