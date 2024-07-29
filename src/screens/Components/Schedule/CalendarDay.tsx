import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const CalendarDay = ({ day, onPress }) => {
  const styles = useStyleSheet(themedStyles);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const dayName = date.toLocaleDateString('id-ID', { weekday: 'long' });
    const dayNumber = date.getDate();
    const monthName = date.toLocaleDateString('id-ID', { month: 'long' });

    return `${dayName}\n${dayNumber} ${monthName}`;
  };

  return (
    <TouchableOpacity style={styles.calendarDay} onPress={onPress}>
      <Text category='h6' style={styles.dateText}>
        {formatDate(day.date)}
      </Text>
      <Text category='s1' style={styles.shiftText}>
        {day.shift ? day.shift : 'Libur'}
      </Text>
    </TouchableOpacity>
  );
};

const themedStyles = StyleService.create({
  calendarDay: {
    width: '23%', // Adjust to fit the grid with margins
    aspectRatio: 1, // Ensure square shape
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'color-basic-500', // Background color
    padding: 10,
    borderRadius: 5,
  },
  dateText: {
    textAlign: 'center',
    color: '#000', // Text color
    marginBottom: 5,
  },
  shiftText: {
    textAlign: 'center',
    color: '#000', // Text color
  },
});

export default CalendarDay;
