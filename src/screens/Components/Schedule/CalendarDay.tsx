import React, { memo } from 'react';
import { Pressable, View, Dimensions } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const CalendarDay = memo(({ day, onPress }) => {
  const styles = useStyleSheet(themedStyles);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return {
      dayNumber: date.getDate(),
      monthName: date.toLocaleDateString('id-ID', { month: 'short' }) // Short month name
    };
  };

  const { dayNumber, monthName } = formatDate(day.date);

  const getShiftDetails = () => {
    if (!day.shift) {
      return <Text category='s1' style={styles.shiftText}>OFF</Text>;
    }

    return (
      <>
        <Text category='s1' style={styles.shiftText}>
          {`Shift ${day.shift}`}
        </Text>
        <Text category='s1' style={styles.shiftText}>
          {`${day.clockIn} - ${day.clockOut}`}
        </Text>
      </>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return '#4CAF50'; // Green
      case 'On Leave':
        return '#FF9800'; // Orange
      case 'Absent':
        return '#F44336'; // Red
      default:
        return '#000'; // Default color if status is not recognized
    }
  };

  return (
    <Pressable style={styles.calendarDay} onPress={onPress}>
      <View style={styles.dateContainer}>
        <Text category='h6' style={styles.dayNumber}>
          {dayNumber}
        </Text>
        <Text category='s1' style={styles.monthName}>
          {monthName}
        </Text>
      </View>
      <View style={styles.shiftContainer}>
        {getShiftDetails()}
      </View>
      <View style={styles.statusContainer}>
        <Text category='c1' style={[styles.statusText, { color: getStatusColor(day.status) }]}>
          {day.status || ''}
        </Text>
      </View>
    </Pressable>
  );
});

const themedStyles = StyleService.create({
  calendarDay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '$background-basic-color-1', // Sesuaikan dengan tema
    borderColor: '$color-basic-500', // Sesuaikan dengan tema
    borderWidth: 1,
    borderRadius: screenWidth * 0.02, // 2% of screen width
    marginVertical: screenWidth * 0.01, // 1% of screen width
    padding: screenWidth * 0.02, // 2% of screen width
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumber: {
    fontSize: screenWidth * 0.06, // 6% of screen width
    fontWeight: 'bold',
    color: '$text-basic-color', // Sesuaikan dengan tema
  },
  monthName: {
    fontSize: screenWidth * 0.035, // 3.5% of screen width
    color: '$text-basic-color', // Sesuaikan dengan tema
  },
  shiftContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shiftText: {
    textAlign: 'center',
    color: '$text-basic-color', // Sesuaikan dengan tema
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.04, // 4% of screen width
  },
});

export default CalendarDay;
