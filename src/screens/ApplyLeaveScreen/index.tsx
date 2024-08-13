import React, { useState, useEffect } from 'react';
import { Layout, Text, Input, Button, StyleService, useStyleSheet, Select, SelectItem, Datepicker } from '@ui-kitten/components';
import { View, Dimensions, Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import leaveTypes from '../../assets/data/leaveTypes';

const { width, height } = Dimensions.get('window');

const ApplyLeaveScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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
      reason: reason,
      leaveType: leaveTypes[selectedLeaveType.row].type,
      start: startDate.toISOString().split('T')[0], // Format date to 'yyyy-mm-dd'
      end: endDate.toISOString().split('T')[0], // Format date to 'yyyy-mm-dd'
      status: 'In Progress',
      applied: new Date().toISOString().split('T')[0], // Current date in 'yyyy-mm-dd'
    };

    try {
      // Send the new leave data to the API
      const response = await fetch('https://66bad3266a4ab5edd6364e75.mockapi.io/leaveHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLeave),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Leave submitted successfully:', responseData);

        // Reset form
        setSelectedLeaveType(null);
        setStartDate(new Date());
        setEndDate(new Date());
        setReason('');

        // Show confirmation alert
        Alert.alert('Success', 'Leave application submitted successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Leave'), // Navigate after confirmation
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Layout style={styles.container}>
          <Text category='h1' style={styles.header}>Apply Leave</Text>
          <Layout style={[styles.form, keyboardVisible && styles.formShift]}>
            {!keyboardVisible && (
              <>
                <Input
                  style={styles.input}
                  label='Name'
                  value='Emmanuel Sebastian'
                  disabled={true}
                />
                <Select
                  style={styles.input}
                  label='Leave Type'
                  placeholder='Select leave type'
                  selectedIndex={selectedLeaveType}
                  value={selectedLeaveType !== null ? leaveTypes[selectedLeaveType.row].type : ''}
                  onSelect={handleSelectLeaveType}
                >
                  {leaveTypes.map((leave) => (
                    <SelectItem key={leave.id} title={leave.type} />
                  ))}
                </Select>
                <Datepicker
                  style={styles.input}
                  label='Start Date'
                  placeholder='Enter start date'
                  date={startDate}
                  onSelect={setStartDate}
                />
                <Datepicker
                  style={styles.input}
                  label='End Date'
                  placeholder='Enter end date'
                  date={endDate}
                  onSelect={setEndDate}
                />
              </>
            )}
              <Input
                style={[styles.input, styles.reasonInput]}
                label='Reason for Leave'
                placeholder='Enter reason'
                multiline={true}
                height={height * 0.2}
                textStyle={{ textAlignVertical: 'top', padding: 0 }}
                value={reason}
                onChangeText={setReason}
              />
          </Layout>
          <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate('Leave')} style={[styles.button, styles.cancelButton]}>
              Batal
            </Button>
            <Button onPress={handleApplyLeave} style={styles.button}>
              Apply Leave
            </Button>
          </View>
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
  },
  header: {
    marginBottom: height * 0.02,
    fontSize: width * 0.07,
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
  },
  reasonInput: {
    minHeight: height * 0.2,
    textAlignVertical: 'top',
  },
  button: {
    marginVertical: height * 0.01,
    flex: 1,
    marginHorizontal: width * 0.02,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.02,
  },
  cancelButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
});

export default ApplyLeaveScreen;
