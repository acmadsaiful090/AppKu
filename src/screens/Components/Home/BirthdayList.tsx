import React from 'react';
import { View, Text } from 'react-native';
import { Icon, StyleService, useStyleSheet } from '@ui-kitten/components';

const BirthdayList = ({ item }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={[styles.birthdayItem, { backgroundColor: item.color }]}>
      <View style={styles.iconCircle}>
        <Icon name={item.icon} fill='white' style={styles.itemIcon} />
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
    padding: 16,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#EEE',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#444',
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
  },
  birthdayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  birthdayDate: {
    fontSize: 14,
    color: '#FFF',
  },
  birthdayRole: {
    fontSize: 12,
    color: '#FFF',
  },
});
