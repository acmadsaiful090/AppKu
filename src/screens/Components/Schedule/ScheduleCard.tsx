import React from 'react';
import { View } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const ScheduleCard = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.todaySchedule}>
      <Text category='h5' style={styles.title}>Jadwal Hari ini</Text>
      <Layout style={styles.scheduleCard}>
        <Layout style={styles.scheduleInfo}>
          <View style={styles.centeredContent}>
            <Text category='h6' style={styles.day}>Rabu</Text>
            <Text category='h6' style={styles.date}>17 Juli</Text>
          </View>
          <View style={styles.scheduleDetails}>
            <Text category='h6' style={styles.time}>08:00 - 14:00 (WIB)</Text>
            <Text category='c1' style={styles.tolerance}>5 menit toleransi</Text>
            <Text category='c1' style={styles.shift}>Shift1</Text>
          </View>
        </Layout>
      </Layout>
    </Layout>
  );
});

const themedStyles = StyleService.create({
  todaySchedule: {
    alignSelf: 'center',
    width: '100%',
    padding: 10,
  },
  title: {
    marginBottom: 5,
    textAlign: 'center',
  },
  scheduleCard: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'background-basic-color-1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  scheduleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flexDirection: 'row',
  },
  centeredContent: {
    alignItems: 'center',
    marginRight: 30,
  },
  day: {
    color: 'color-primary-500',
    marginBottom: 5,
  },
  date: {
    height: 75,
    width: 75,
    borderRadius: 15,
    borderColor: 'black',
    backgroundColor: 'color-primary-500',
    color: 'white',
    textAlign: 'center',
    lineHeight: 75,
    marginBottom: 10,
  },
  scheduleDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  time: {
    color: 'color-primary-500',
    marginBottom: 5,
  },
  tolerance: {
    color: 'color-basic-600',
  },
  shift: {
    color: 'color-basic-600',
  },
});

export default ScheduleCard;
