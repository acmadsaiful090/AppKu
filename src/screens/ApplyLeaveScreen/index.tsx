import React, { useState, useEffect } from 'react';
import {
  Layout,
  Text,
  StyleService,
  useStyleSheet,
  Calendar
} from '@ui-kitten/components';
import {
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import leaveTypes from '../../assets/data/leaveTypes';
import CustomDropdown from '../../components/CustomDropdown';

const { width, height } = Dimensions.get('window');

const ApplyLeaveScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isReasonFocused, setIsReasonFocused] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedDateField, setSelectedDateField] = useState(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSelectLeaveType = (index) => {
    setSelectedLeaveType(index);
  };

  const handleApplyLeave = async () => {
    if (!selectedLeaveType || !reason) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }

    const newLeave = {
      reason,
      leaveType: leaveTypes[selectedLeaveType].type,
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
      status: 'In Progress',
      applied: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await fetch('https://66bad326a4ab5edd6364e75.mockapi.io/leaveHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeave),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Leave submitted successfully:', responseData);

        setSelectedLeaveType(null);
        setStartDate(new Date());
        setEndDate(new Date());
        setReason('');

        Alert.alert('Success', 'Leave application submitted successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Leave'),
          }
        ]);
      } else {
        throw new Error('Failed to submit leave');
      }
    } catch (error) {
      console.error('Error submitting leave:', error);
      Alert.alert('Error', 'There was an issue submitting your leave. Please try again.');
    }
  };

  const handleDateSelect = (date) => {
    if (selectedDateField === 'start') {
      setStartDate(date);
    } else if (selectedDateField === 'end') {
      setEndDate(date);
    }
    setCalendarVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={styles.container}>
          <Text category='h1' style={styles.header}>Apply Leave</Text>
          <Layout style={[styles.form, keyboardVisible && styles.formShift]}>
            {!isReasonFocused && !keyboardVisible && (
              <>
                <Text category='label' style={styles.label}>Name</Text>
                <TextInput
                  style={styles.input}
                  value='Emmanuel Sebastian'
                  editable={false}
                />
                <Text category='label' style={styles.label}>Leave Type</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setIsDropdownVisible(true)}
                >
                  <Text style={styles.buttonText}>
                    {selectedLeaveType !== null ? leaveTypes[selectedLeaveType].type : 'Select leave type'}
                  </Text>
                </TouchableOpacity>
                <Text category='label' style={styles.label}>Start Date</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => {
                    setSelectedDateField('start');
                    setCalendarVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>
                    {startDate.toDateString() || 'Select start date'}
                  </Text>
                </TouchableOpacity>

                <Text category='label' style={styles.label}>End Date</Text>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => {
                    setSelectedDateField('end');
                    setCalendarVisible(true);
                  }}
                >
                  <Text style={styles.buttonText}>
                    {endDate.toDateString() || 'Select end date'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
            <Text category='label' style={styles.label}>Reason for Leave</Text>
            <TextInput
              style={[styles.input, styles.reasonInput]}
              placeholder='Enter reason'
              multiline={true}
              value={reason}
              onChangeText={setReason}
              onFocus={() => {
                setIsReasonFocused(true);
                setKeyboardVisible(true);
              }}
              onBlur={() => {
                setIsReasonFocused(false);
                setKeyboardVisible(false);
              }}
            />
          </Layout>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Leave')} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.cancelButtonText}>Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleApplyLeave} style={[styles.button, styles.saveButton]}>
              <Text style={styles.buttonText}>Apply Leave</Text>
            </TouchableOpacity>
          </View>

          <CustomDropdown
            options={leaveTypes}
            selectedIndex={selectedLeaveType}
            onSelect={handleSelectLeaveType}
            isVisible={isDropdownVisible}
            onClose={() => setIsDropdownVisible(false)}
          />
          {calendarVisible && (
            <Modal
              visible={calendarVisible}
              transparent={true}
              onRequestClose={() => setCalendarVisible(false)}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Calendar
                    date={selectedDateField === 'start' ? startDate : endDate}
                    onSelect={handleDateSelect}
                    style={styles.calendar}
                  />
                </View>
              </View>
            </Modal>
          )}
        </Layout>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: width * 0.04,
    justifyContent: 'space-between',
    backgroundColor: '$background-color',
  },
  header: {
    marginBottom: height * 0.02,
    fontSize: width * 0.07,
    color: '$text-header-color',
  },
  form: {
    flex: 1,
  },
  formShift: {
    justifyContent: 'flex-start',
  },
  input: {
    marginVertical: height * 0.01,
    fontSize: width * 0.04,
    backgroundColor: '$background-card-color',
    borderWidth: 1,
    color: '$text-primary-color',
    padding: width * 0.03,
    borderRadius: 5,
  },
  label: {
    marginBottom: height * 0.005,
    color: '$text-primary-color',
    fontSize: width * 0.03,
  },
  dateButton: {
    marginVertical: height * 0.01,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    backgroundColor: '$background-card-color',
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    color: '$text-primary-color',
    fontSize: width * 0.04,
  },
  reasonInput: {
    minHeight: height * 0.2,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.01,
  },
  button: {
    height: height * 0.05,
    flex: 1,
    marginHorizontal: width * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '$button-danger-color',
    borderColor: '$button-danger-color',
  },
  saveButton: {
    backgroundColor: '$button-primary-color',
  },
  calendar: {
    backgroundColor: '$background-card-color',
    width: width * 0.9,
    height: height * 0.5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'background-basic-color-1',
    borderRadius: width * 0.02,
    alignItems: 'center',
  },
});

export default ApplyLeaveScreen;
