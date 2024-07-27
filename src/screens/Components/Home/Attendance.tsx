import React from 'react';
import { View, Text } from 'react-native';

const Attendance = ({ styles }) => (
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

export default Attendance;
