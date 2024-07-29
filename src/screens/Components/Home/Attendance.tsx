import React from 'react';
import { View, Text } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';

const Attendance = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.attendance}>
      <View style={styles.attendanceItem}>
        <Text style={styles.attendanceNumber}>5</Text>
        <Text style={styles.attendanceLabel}>Hadir</Text>
      </View>
      <View style={styles.attendanceItem}>
        <Text style={styles.attendanceNumber}>1</Text>
        <Text style={styles.attendanceLabel}>Libur</Text>
      </View>
      <View style={styles.attendanceItem}>
        <Text style={styles.attendanceNumber}>3</Text>
        <Text style={styles.attendanceLabel}>Absen</Text>
      </View>
    </View>
  );
};

export default Attendance;

const themedStyles = StyleService.create({
  attendance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  attendanceItem: {
    alignItems: 'center',
  },
  attendanceNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'color-primary-500',
  },
  attendanceLabel: {
    fontSize: 14,
    color: '#888',
  },
});
