import React, { useState } from 'react';
import { Layout, Text, Input, Button, StyleService, useStyleSheet, Select, SelectItem, Datepicker } from '@ui-kitten/components';
import { View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import leaveTypes from '../../assets/data/leaveTypes';

const { width, height } = Dimensions.get('window');

const ApplyLeaveScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <Layout style={styles.container}>
      <Text category='h1' style={styles.header}>Apply Leave</Text>
      <Layout style={styles.form}>
        <Input
          style={styles.input}
          label='Name'
          value='Emmanuel Sebastian'
          disabled={true}
        />
        <Select
          style={styles.input}
          placeholder='Select leave type'
          selectedIndex={selectedIndex}
          value={selectedIndex !== null ? leaveTypes[selectedIndex.row].type : ''}
          onSelect={index => setSelectedIndex(index)}
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
        <Input
          style={[styles.input, styles.reasonInput]}
          label='Reason for Leave'
          placeholder='Enter reason'
          multiline={true}
          textStyle={{ minHeight: height * 0.2, color: 'black' }}
        />
      </Layout>
      <View style={styles.buttonContainer}>
        <Button onPress={() => navigation.navigate('Leave')} style={[styles.button, styles.cancelButton]}>
          Batal
        </Button>
        <Button style={styles.button}>
          Apply Leave
        </Button>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: width * 0.04, // Padding based on screen width
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: height * 0.02, // Margin based on screen height
    fontSize: width * 0.07, // Font size based on screen width
  },
  form: {
    flex: 1,
  },
  input: {
    marginVertical: height * 0.01, // Margin based on screen height
    fontSize: width * 0.04, // Font size based on screen width
  },
  reasonInput: {
    minHeight: height * 0.2, // Minimum height based on screen height
  },
  button: {
    marginVertical: height * 0.01, // Margin based on screen height
    flex: 1,
    marginHorizontal: width * 0.02, // Margin based on screen width
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height * 0.02, // Padding based on screen height
  },
  cancelButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
});

export default ApplyLeaveScreen;
