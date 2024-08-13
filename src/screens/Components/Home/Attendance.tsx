import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
    marginTop: screenHeight * 0.01, // 1% of screen height
    padding: screenWidth * 0.04, // 4% of screen width
    backgroundColor: 'background-basic-color-1', // from theme
    borderRadius: screenWidth * 0.02, // 2% of screen width
    borderWidth: 1,
    borderColor: 'color-primary-500', // from theme
    width: screenWidth * 0.9, // 90% of screen width
  },
  month: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.02, // 2% of screen height
  },
  titleText: {
    fontSize: screenWidth * 0.05, // 5% of screen width
    fontWeight: 'bold',
    color: 'text-basic-color', // from theme
  },
  attendance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  attendanceItem: {
    alignItems: 'center',
  },
  attendanceNumber: {
    fontSize: screenWidth * 0.06, // 6% of screen width
    fontWeight: 'bold',
    color: 'color-primary-500', // from theme
  },
  attendanceLabel: {
    fontSize: screenWidth * 0.04, // 4% of screen width
    color: 'text-placeholder-color', // from theme
  },
});
