import React, { useState, useEffect } from 'react';
import { View, ScrollView, Modal } from 'react-native';
import { ApplicationProvider, Layout, Button, Icon, StyleService, useStyleSheet, RangeCalendar } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import calendarData from '../../assets/data/calendarData';
import Header from '../Components/Header';
import ScheduleCard from '../Components/Schedule/ScheduleCard';
import CalendarDay from '../Components/Schedule/CalendarDay';
import DetailsModal from '../Components/Schedule/DetailsModal';

const ScheduleScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedRange, setSelectedRange] = useState({ startDate: '', endDate: '' });

  useEffect(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
    setSelectedRange({ startDate: startOfMonth, endDate: endOfMonth });
  }, []);

  const handlePress = (day) => {
    setSelectedDay(day);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedDay(null);
  };

  const handleOpenCalendar = () => {
    setCalendarVisible(true);
  };

  const handleCloseCalendar = () => {
    setCalendarVisible(false);
  };

  const handleRangeChange = (range) => {
    const startDate = range.startDate ? new Date(range.startDate).toISOString().split('T')[0] : '';
    const endDate = range.endDate ? new Date(range.endDate).toISOString().split('T')[0] : '';
    setSelectedRange({ startDate, endDate });
    setCalendarVisible(false);
  };

  const isDateInRange = (dateStr) => {
    const date = new Date(dateStr);
    const startDate = new Date(selectedRange.startDate);
    const endDate = new Date(selectedRange.endDate);
    return date >= startDate && date <= endDate;
  };

  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={{ flex: 1 }}>
          <Layout style={styles.container}>
            <Header title="Attendance" />
            <ScheduleCard />
            <Layout style={styles.datePicker}>
              <Button
                accessoryLeft={(props) => <Icon {...props} name="calendar-outline" />}
                onPress={handleOpenCalendar}
              >
                {selectedRange.startDate
                  ? `${selectedRange.startDate}${selectedRange.endDate && ` - ${selectedRange.endDate}`}`
                  : 'Select Date Range'}
              </Button>
            </Layout>
            <ScrollView contentContainerStyle={styles.calendarGrid}>
              {calendarData
                .filter(day => isDateInRange(day.date))
                .map((day) => (
                  <CalendarDay key={day.id} day={day} onPress={() => handlePress(day)} />
              ))}
            </ScrollView>
            {selectedDay && (
              <DetailsModal
                visible={modalVisible}
                day={selectedDay}
                onClose={handleCloseModal}
              />
            )}
            {calendarVisible && (
              <Modal
                visible={calendarVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={handleCloseCalendar}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalContainer}>
                    <RangeCalendar
                      range={{
                        startDate: selectedRange.startDate ? new Date(selectedRange.startDate) : null,
                        endDate: selectedRange.endDate ? new Date(selectedRange.endDate) : null,
                      }}
                      onSelect={handleRangeChange}
                    />
                  </View>
                </View>
              </Modal>
            )}
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
  datePicker: {
    alignItems: 'center',
    marginVertical: 20,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'background-basic-color-1',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default ScheduleScreen;
