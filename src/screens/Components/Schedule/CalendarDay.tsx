import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';

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
    backgroundColor: 'color-info-100',
    borderColor: 'color-basic-500',
    borderWidth: 1,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  monthName: {
    fontSize: 14,
    color: '#000',
  },
  shiftContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shiftText: {
    textAlign: 'center',
    color: '#000',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CalendarDay;
