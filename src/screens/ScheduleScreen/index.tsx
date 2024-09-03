import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Modal, Alert, Dimensions } from 'react-native';
import { Layout, Button, Icon, StyleService, useStyleSheet, RangeCalendar } from '@ui-kitten/components';
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
  const [selectedId, setSelectedId] = useState(null);
  const [selectedRange, setSelectedRange] = useState({ startDate: '', endDate: '' });
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await fetch('https://66bad3266a4ab5edd6364e75.mockapi.io/leaveHistory');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeaveHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveHistory();
  }, []);

  useEffect(() => {
    const today = new Date();
    setSelectedRange({
      startDate: new Date(today.getFullYear(), today.getMonth(), 2).toISOString().split('T')[0],
      endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0],
    });
  }, []);

  const handlePress = useCallback((day) => {
    const leaveRecord = leaveHistory.find(
      leave => leave.status === 'Approved' && new Date(leave.start) <= new Date(day.date) && new Date(leave.end) >= new Date(day.date)
    );
    if (leaveRecord && day.status === 'On Leave') {
      setSelectedId(leaveRecord.id);
      setDetailsHistoryModalVisible(true);
    } else {
      setSelectedDay(day);
      setDetailsModalVisible(true);
    }
  }, [leaveHistory]);

  const handleCloseModal = useCallback(() => {
    setDetailsModalVisible(false);
    setDetailsHistoryModalVisible(false);
    setSelectedDay(null);
    setSelectedId(null);
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
    return date >= new Date(startDate) && date <= new Date(endDate);
  }, [selectedRange]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  return (
    <Layout style={styles.container}>
      <ScheduleCard />
      <Layout style={styles.datePicker}>
        <Button
          style={styles.customButton}
          accessoryLeft={(props) => <Icon {...props} name="calendar-outline" />}
          onPress={() => setCalendarVisible(true)}
        >
          {selectedRange.startDate
            ? `${formatDate(selectedRange.startDate)}${selectedRange.endDate && ` - ${formatDate(selectedRange.endDate)}`}`
            : 'Select Date Range'}
        </Button>
      </Layout>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.calendarGrid}>
        {calendarData
          .filter(day => isDateInRange(day.date))
          .map((day) => (
            <CalendarDay key={day.id} day={day} onPress={() => handlePress(day)} />
          ))}
      </ScrollView>
      {detailsModalVisible && selectedDay && (
        <DetailsModal visible={detailsModalVisible} day={selectedDay} onClose={handleCloseModal} />
      )}
      {detailsHistoryModalVisible && selectedId !== null && (
        <DetailsHistoryModal 
          visible={detailsHistoryModalVisible} 
          selectedId={selectedId} 
          onClose={handleCloseModal} 
        />
      )}
      {calendarVisible && (
        <Modal
          visible={calendarVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setCalendarVisible(false)}
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
    backgroundColor: 'background-color',
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.02,
  },
  datePicker: {borderRadius: width * 0.04,
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.02,
  },
  calendarGrid: {
    paddingBottom: height * 0.05,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'background-card-color',
    borderRadius: width * 0.02,
    alignItems: 'center',
  },
  customButton: {
    backgroundColor: 'button-primary-color',
    borderColor: 'button-primary-color',
  },
});

export default ScheduleScreen;
