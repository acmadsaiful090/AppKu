import React from 'react';
import { View, Dimensions } from 'react-native';
import { Icon, StyleService, useStyleSheet, useTheme, Text } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');
const calculateAge = (birthDate) => {
  const today = new Date();
  const [day, month, year] = birthDate.split('-').map(Number); // Convert to numbers

  // Create a birth date object
  const birthDateObj = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript

  // Calculate age
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDifference = today.getMonth() - birthDateObj.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < day)) {
    age--;
  }

  // Get the current day
  const todayDay = today.getDate();

  // Calculate the difference in days, ignoring month and year
  const differenceInDays = Math.abs(day - todayDay);

  // Return age and difference
  return { age, differenceInDays };
};
const BirthdayList = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  const backgroundColor = item.jenis_kelamin === 'Laki-laki'
    ? '#00BCD4'
    : item.jenis_kelamin === 'Perempuan'
      ? '#FF708D'
      : '#FFFFFF';

  const { age, differenceInDays } = calculateAge(item.tanggal_lahir);

  return (
    <View style={[styles.birthdayItem, { backgroundColor }]}>
      <View style={styles.iconCircle}>
        <Icon name='gift-outline' fill={theme['icon-Birthday-color']} style={styles.itemIcon} />
      </View>
      <View style={styles.birthdayText}>
        <Text style={styles.birthdayName}>{item.nama}</Text>
        <Text style={styles.birthdayDate}>{age} tahun </Text>
        <Text style={styles.birthdayDate}>
        {differenceInDays === 0
          ? 'Today is their birthday!'
          : `${differenceInDays} days until their birthday`}
      </Text>
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
    backgroundColor: 'icon-background-color',
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
  birthdayDifference: {
    fontSize: screenWidth * 0.035,
    color: 'text-basic-color',
  },
  birthdayRole: {
    fontSize: screenWidth * 0.03,
    color: 'text-basic-color',
  },
});
