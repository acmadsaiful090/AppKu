import React from 'react';
import { View, ScrollView } from 'react-native';
import { ApplicationProvider, Layout, Text, Button, IconRegistry, StyleService, useStyleSheet, Card, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const ScheduleScreen = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={{ flex: 1 }}>
          <Layout style={styles.container}>
            <Layout style={styles.header}>
              <Text category='h1' style={styles.headerText}>Schedule</Text>
            </Layout>
            <Layout style={styles.todaySchedule}>
              <Text category='h5' style={styles.title}>Jadwal Hari ini</Text>
              <Layout style={styles.scheduleCard}>
                <Layout style={styles.scheduleInfo}>
                  <View style={styles.centeredContent}>
                    <Text category='h6' style={styles.day}>Rabu</Text>
                    <Text category='h6' style={styles.date}>17 Juli</Text>
                  </View>
                  <View>
                    <Text category='h6' style={styles.time}>08:00 - 14:00 (WIB)</Text>
                    <Text category='c1' style={styles.tolerance}>5 menit toleransi</Text>
                    <Text category='c1' style={styles.shift}>Shift1</Text>
                  </View>
                </Layout>
              </Layout>
            </Layout>
            <Layout style={styles.datePicker}>
              <Button accessoryLeft={(props) => <Icon {...props} name="calendar-outline" />}>18 Juli 2024</Button>
            </Layout>
            <ScrollView contentContainerStyle={styles.calendarGrid}>
              {Array.from({ length: 30 }).map((_, index) => (
                <Card key={index} style={styles.calendarDay}>
                  <Text category='label'>{`Kamis\n18 Juli\nShift 1`}</Text>
                </Card>
              ))}
            </ScrollView>
          </Layout>
        </SafeAreaView>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  header: {
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'color-primary-default',
  },
  headerText: {
    color: 'text-control-color',
  },
  todaySchedule: {
    alignSelf: 'center',
    width: '90%',
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
    justifyContent: 'space-between',
  },
  centeredContent: {
    alignItems: 'center',
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
  datePicker: {
    alignItems: 'center',
    marginVertical: 20,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  calendarDay: {
    width: '24%',
    marginVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'color-basic-300',
  },
});

export default ScheduleScreen;