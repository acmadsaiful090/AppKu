import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Alert } from 'react-native';
import { ApplicationProvider, Layout, Button, Icon, StyleService, useStyleSheet, RangeCalendar, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import calendarData from '../../assets/data/calendarData';
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

  const handlePress = useCallback((day) => {
    setSelectedDay(day);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setSelectedDay(null);
  }, []);

  const handleOpenCalendar = useCallback(() => {
    setCalendarVisible(true);
  }, []);

  const handleCloseCalendar = useCallback(() => {
    setCalendarVisible(false);
  }, []);

  const handleRangeChange = useCallback((range) => {
    const startDate = range.startDate ? new Date(range.startDate).setHours(23, 59, 59, 999) : '';
    const endDate = range.endDate ? new Date(range.endDate).setHours(23, 59, 59, 999) : '';

    if (startDate && endDate) {
      const diffDays = Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1;
      if (diffDays > 31) {
        Alert.alert('Error', 'The selected range cannot exceed 31 days.');
        return;
      }
    }

    setSelectedRange({
      startDate: startDate ? new Date(startDate).toISOString().split('T')[0] : '',
      endDate: endDate ? new Date(endDate).toISOString().split('T')[0] : '',
    });
    setCalendarVisible(false);
  }, []);

  const isDateInRange = useCallback((dateStr) => {
    const date = new Date(dateStr);
    const { startDate, endDate } = selectedRange;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    return date >= startDateObj && date <= endDateObj;
  }, [selectedRange]);

  return (
    <Layout style={styles.container}>
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
                date={new Date(selectedRange.startDate)}
              />
            </View>
          </View>
        </Modal>
      )}
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  datePicker: {
    alignItems: 'center',
    marginVertical: 20,
  },
  calendarGrid: {
    paddingBottom: 40,
    flexDirection: 'column',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'background-basic-color-1',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
});

export default ScheduleScreen;
