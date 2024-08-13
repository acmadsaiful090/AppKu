import React from 'react';
import { View, Dimensions } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import calendarData from '../../../assets/data/calendarData';

// Get screen dimensions
const { width: screenWidth } = Dimensions.get('window');

const getCurrentDateData = () => {
  const today = new Date().toISOString().split('T')[0];
  return calendarData.find(day => day.date === today);
};

const getMonthName = (dateStr) => {
  const date = new Date(dateStr);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[date.getMonth()];
};

const ScheduleCard = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const currentDay = getCurrentDateData();

  if (!currentDay) {
    return (
      <Layout style={styles.todaySchedule}>
        <Text category='h5' style={styles.title}>Tidak Ada Jadwal</Text>
        <Text category='h5' style={styles.title}>Hari Ini</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.todaySchedule}>
      <Text category='h5' style={styles.title}>Jadwal Hari Ini</Text>
      <Layout style={styles.scheduleCard}>
        <Layout style={styles.scheduleInfo}>
          <View style={styles.centeredContent}>
            <Text category='h6' style={styles.day}>
              {new Date(currentDay.date).toLocaleDateString('id-ID', { weekday: 'long' })}
            </Text>
            <Text category='h6' style={styles.date}>
              {new Date(currentDay.date).getDate()} {getMonthName(currentDay.date)}
            </Text>
          </View>
          <View style={styles.scheduleDetails}>
            {currentDay.shift ? (
              <>
                <Text category='h6' style={styles.time}>
                  {currentDay.clockIn} - {currentDay.clockOut} (WIB)
                </Text>
                <Text category='c1' style={styles.tolerance}>5 menit toleransi</Text>
                <Text category='c1' style={styles.shift}>Shift {currentDay.shift}</Text>
              </>
            ) : (
              <Text category='h6' style={styles.offText}>OFF</Text>
            )}
          </View>
        </Layout>
      </Layout>
    </Layout>
  );
});

const themedStyles = StyleService.create({
  todaySchedule: {
    alignSelf: 'center',
    width: '95%', // Adjusted to 95% for responsiveness
    padding: screenWidth * 0.025, // Padding as a percentage of screen width
    borderWidth: 1,
    borderRadius: screenWidth * 0.04, // Radius as a percentage of screen width
    borderColor: '$color-primary-500', // Primary color from theme
  },
  title: {
    textAlign: 'center',
    color: '$text-basic-color', // Text color from theme
  },
  scheduleCard: {
    padding: screenWidth * 0.025, // Adjusted padding for responsiveness
    borderRadius: screenWidth * 0.02, // Adjusted radius for responsiveness
    backgroundColor: '$background-basic-color-1', // Background color from theme
  },
  scheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredContent: {
    alignItems: 'center',
    marginRight: screenWidth * 0.075, // Adjusted margin for responsiveness
  },
  day: {
    color: '$color-primary-500', // Primary color from theme
    marginBottom: screenWidth * 0.012, // Adjusted margin for responsiveness
  },
  date: {
    height: screenWidth * 0.18, // Adjusted height for responsiveness
    width: screenWidth * 0.18, // Adjusted width for responsiveness
    borderRadius: screenWidth * 0.04, // Adjusted radius for responsiveness
    borderColor: '$text-basic-color', // Black color from theme
    backgroundColor: '$color-primary-500', // Primary color from theme
    color: '$background-basic-color-1', // Background color from theme
    textAlign: 'center',
    lineHeight: screenWidth * 0.18, // Adjusted line height for responsiveness
    marginBottom: screenWidth * 0.025, // Adjusted margin for responsiveness
  },
  scheduleDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  time: {
    color: '$color-primary-500', // Primary color from theme
    marginBottom: screenWidth * 0.012, // Adjusted margin for responsiveness
  },
  tolerance: {
    color: '$color-basic-600', // Basic color from theme
  },
  shift: {
    color: '$color-basic-600', // Basic color from theme
  },
  offText: {
    fontSize: screenWidth * 0.125, // Adjusted font size for responsiveness
    textAlign: 'center',
    color: '$color-danger-500', // Danger color from theme
    fontWeight: 'bold',
  },
});

export default ScheduleCard;
