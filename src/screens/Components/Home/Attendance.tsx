import React from 'react';
import { View, Text } from 'react-native';
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Attendance = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

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
    marginTop: hp('1%'),
    marginHorizontal: '5%',
    padding: wp('4%'),
    backgroundColor: '$background-basic-color-1', // from theme
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  month: {
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  titleText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '$text-basic-color', // from theme
  },
  attendance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attendanceItem: {
    alignItems: 'center',
  },
  attendanceNumber: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    color: '$color-primary-500', // from theme
  },
  attendanceLabel: {
    fontSize: wp('3.5%'),
    color: '$text-placeholder-color', // from theme
  },
});
