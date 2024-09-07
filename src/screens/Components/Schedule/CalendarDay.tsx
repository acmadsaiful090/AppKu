import React from 'react';
import { Pressable, View, Dimensions } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
const { width: screenWidth } = Dimensions.get('window');
const CalendarDay = ({ day, onPress }) => {
  const styles = useStyleSheet(themedStyles);
  const date = new Date(day.date);
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString('id-ID', { month: 'short' });
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

  const statusColors = {
    Present: '#4CAF50',
    'On Leave': '#FF9800',
    Absent: '#F44336',
  };
  const statusColor = statusColors[day.status] || '#000';
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
        <Text category='c1' style={[styles.statusText, { color: statusColor }]}>
          {day.status || ''}
        </Text>
      </View>
    </Pressable>
  );
};
const themedStyles = StyleService.create({
  calendarDay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '$background-basic-color-1',
    borderColor: '$background-basic-color-4',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
    marginVertical: screenWidth * 0.01,
    padding: screenWidth * 0.02,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNumber: {
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    color: '$text-basic-color',
  },
  monthName: {
    fontSize: screenWidth * 0.035,
    color: '$text-basic-color',
  },
  shiftContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shiftText: {
    textAlign: 'center',
    color: '$text-basic-color',
  },
  statusContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    textAlign: 'center',
    fontSize: screenWidth * 0.04,
  },
});
export default CalendarDay;