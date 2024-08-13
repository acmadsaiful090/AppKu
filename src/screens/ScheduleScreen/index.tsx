import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Modal, Alert, Dimensions } from 'react-native';
import { Layout, Button, Icon, StyleService, useStyleSheet, RangeCalendar, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import calendarData from '../../assets/data/calendarData';
import ScheduleCard from '../Components/Schedule/ScheduleCard';
import CalendarDay from '../Components/Schedule/CalendarDay';
import DetailsModal from '../Components/Schedule/DetailsModal';
import DetailsHistoryModal from '../Components/Schedule/DetailsHistoryModal';

const { width, height } = Dimensions.get('window');

const ScheduleScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [detailsHistoryModalVisible, setDetailsHistoryModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedRange, setSelectedRange] = useState({ startDate: '', endDate: '' });
  const navigation = useNavigation();

  useEffect(() => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 2).toISOString().split('T')[0];
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
    setSelectedRange({ startDate: startOfMonth, endDate: endOfMonth });
  }, []);

  const handlePress = useCallback((day) => {
    setSelectedDay(day.date);
    if (day.status === 'On Leave') {
      setDetailsHistoryModalVisible(true);
    } else {
      setSelectedDay(day);
      setDetailsModalVisible(true);
    }
  }, []);

  const handleCloseDetailsModal = useCallback(() => {
    setDetailsModalVisible(false);
    setSelectedDay(null);
  }, []);

  const handleCloseDetailsHistoryModal = useCallback(() => {
    setDetailsHistoryModalVisible(false);
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

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`;
  };

  return (
    <Layout style={styles.container}>
      <ScheduleCard />
      <Layout style={styles.datePicker}>
        <Button
          accessoryLeft={(props) => <Icon {...props} name="calendar-outline" />}
          onPress={handleOpenCalendar}
        >
          {selectedRange.startDate
            ? `${formatDate(selectedRange.startDate)}${selectedRange.endDate && ` - ${formatDate(selectedRange.endDate)}`}`
            : 'Select Date Range'}
        </Button>
      </Layout>
      <ScrollView
        contentContainerStyle={styles.calendarGrid}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {calendarData
          .filter(day => isDateInRange(day.date))
          .map((day) => (
            <CalendarDay key={day.id} day={day} onPress={() => handlePress(day)} />
        ))}
      </ScrollView>
      {selectedDay && detailsModalVisible && (
        <DetailsModal
          visible={detailsModalVisible}
          day={selectedDay}
          onClose={handleCloseDetailsModal}
        />
      )}
      {selectedDay && detailsHistoryModalVisible && (
        <DetailsHistoryModal
          visible={detailsHistoryModalVisible}
          selectedDate={selectedDay}
          onClose={handleCloseDetailsHistoryModal}
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
    paddingHorizontal: width * 0.04, // 4% of screen width
    paddingVertical: height * 0.02, // 2% of screen height
  },
  datePicker: {
    alignItems: 'center',
    marginVertical: height * 0.02, // 2% of screen height
  },
  calendarGrid: {
    paddingBottom: height * 0.05, // 5% of screen height
    flexDirection: 'column',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.95, // 95% of screen width
    backgroundColor: 'background-basic-color-1',
    borderRadius: width * 0.02, // 2% of screen width
    alignItems: 'center',
  },
});

export default ScheduleScreen;
