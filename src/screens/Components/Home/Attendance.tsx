import React from 'react';
import { View, Dimensions } from 'react-native';
import { StyleService, useStyleSheet,Text } from '@ui-kitten/components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Attendance = () => {
  const styles = useStyleSheet(themedStyles);

  const currentMonth = new Date().toLocaleString('id-ID', { month: 'long' });

  return (
    <View style={styles.container}>
      <View style={styles.month}>
        <Text style={styles.titleText}>{currentMonth}</Text>
      </View>
      <View style={styles.attendance}>
        {['Hadir', 'Libur', 'Absen'].map((label, index) => (
          <View key={index} style={styles.attendanceItem}>
            <Text style={styles.attendanceLabel}>{label}</Text>
            <Text style={styles.attendanceNumber}>{[5, 1, 3][index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Attendance;

const themedStyles = StyleService.create({
  container: {
    marginTop: screenHeight * 0.01,
    padding: screenWidth * 0.04,
    backgroundColor: 'background-basic-color-1',
    borderRadius: screenWidth * 0.02,
    borderWidth: 1,
    borderColor: 'background-basic-color-4',
    width: screenWidth * 0.9,
  },
  month: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.02,
  },
  titleText: {
    fontSize: screenWidth * 0.05,
    fontWeight: 'bold',
    color: 'text-basic-color',
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
    fontSize: screenWidth * 0.06,
    fontWeight: 'bold',
    color: 'background-basic-color-4',
  },
  attendanceLabel: {
    fontSize: screenWidth * 0.04,
    color: 'text-placeholder-color',
  },
});
