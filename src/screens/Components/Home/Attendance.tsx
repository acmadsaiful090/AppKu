import React from 'react';
import { View, Text } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';

const Attendance = () => {
  const styles = useStyleSheet(themedStyles);
  const getCurrentMonth = () => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const currentMonthIndex = new Date().getMonth();
    return months[currentMonthIndex];
  };

  return (
    <View style={styles.container}>
      <View style={styles.month}>
        <Text style={styles.titleText}>{getCurrentMonth()}</Text>
      </View>
      <View style={styles.attendance}>
        <View style={styles.attendanceItem}>
          <Text style={styles.attendanceLabel}>Hadir</Text>
          <Text style={styles.attendanceNumber}>5</Text>
        </View>
        <View style={styles.attendanceItem}>
          <Text style={styles.attendanceLabel}>Libur</Text>
          <Text style={styles.attendanceNumber}>1</Text>
        </View>
        <View style={styles.attendanceItem}>
          <Text style={styles.attendanceLabel}>Absen</Text>
          <Text style={styles.attendanceNumber}>3</Text>
        </View>
      </View>
    </View>
  );
};

export default Attendance;

const themedStyles = StyleService.create({
  container: {
    
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  month: {
    alignItems: 'center',
    alignContent: 'center',
  },
  titleText: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  attendance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
