import React, { useEffect, useState } from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const ScheduleCard = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const [currentDay, setCurrentDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScheduleData = async () => {
      setLoading(true);
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`https://66d28529184dce1713cdbda8.mockapi.io/calendarData?date=${today}`);
        const data = await response.json();
        
        if (data && data.length > 0) {
          setCurrentDay(data[0]); // Assuming the API returns an array and you want the first item
        } else {
          setCurrentDay(null); // No schedule found
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleData();
  }, []);

  if (loading) {
    return (
      <Layout style={styles.todaySchedule}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout style={styles.todaySchedule}>
        <Text category='h5' style={styles.title}>Error: {error}</Text>
      </Layout>
    );
  }
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
      <Text category='h5' style={styles.title}>Today's schedule</Text>
      <View style={styles.scheduleInfo}>
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
      </View>
    </Layout>
  );
});

// Helper function to get month name
const getMonthName = (dateStr) => {
  const date = new Date(dateStr);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthNames[date.getMonth()];
};

const themedStyles = StyleService.create({
  todaySchedule: {
    alignSelf: 'center',
    width: '95%',
    padding: screenWidth * 0.025,
    borderWidth: 1,
    borderRadius: screenWidth * 0.04,
    borderColor: '$border-card-color',
  },
  title: {
    textAlign: 'center',
    color: '$text-header-color',
  },
  scheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredContent: {
    alignItems: 'center',
    marginRight: screenWidth * 0.075,
  },
  day: {
    color: '$text-header-color',
    marginBottom: screenWidth * 0.012,
  },
  date: {
    height: screenWidth * 0.18,
    width: screenWidth * 0.18,
    borderRadius: screenWidth * 0.04,
    borderColor: '$text-basic-color',
    backgroundColor: '$background-header-color',
    color: '$text-basic-color',
    textAlign: 'center',
    lineHeight: screenWidth * 0.18,
    marginBottom: screenWidth * 0.025,
  },
  scheduleDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  time: {
    color: '$text-header-color',
    marginBottom: screenWidth * 0.012,
  },
  tolerance: {
    color: '$text-primary-color',
  },
  shift: {
    color: '$text-primary-color',
  },
  offText: {
    fontSize: screenWidth * 0.125,
    textAlign: 'center',
    color: '$text-danger-color',
    fontWeight: 'bold',
  },
});

export default ScheduleCard;
