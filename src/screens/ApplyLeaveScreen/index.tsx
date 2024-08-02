import React, { useState } from 'react';
import { ApplicationProvider, Layout, Text, Input, Button, StyleService, useStyleSheet, Select, SelectItem, Datepicker } from '@ui-kitten/components';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, useWindowDimensions } from 'react-native';
import * as eva from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native';
import leaveTypes from '../../assets/data/leaveTypes';

const ApplyLeaveScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const { height } = useWindowDimensions(); // Mendapatkan ukuran layar
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [startDate, setStartDate] = useState(new Date(2024, 6, 17));
  const [endDate, setEndDate] = useState(new Date(2024, 6, 18));
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
          <Layout style={styles.container}>
            <Text category='h1'>Apply Leave</Text>
            <Layout style={styles.formInput}>
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
                onSelect={nextDate => setStartDate(nextDate)}
              />
              <Datepicker
                style={styles.input}
                label='End Date'
                placeholder='Enter end date'
                date={endDate}
                onSelect={nextDate => setEndDate(nextDate)} 
              />
              <Input
                style={[styles.input, styles.reasonInput]}
                label='Reason for Leave'
                placeholder='Enter reason'
                multiline={true}
                textStyle={{ minHeight: 64 ,color: 'black' }}
              />
            </Layout>
            <View style={styles.buttonContainer}>
              <Button onPress={() => navigation.goBack()} style={[styles.button, styles.cancelButton]}>
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
    padding: 16,
    justifyContent: 'space-between', // Menempatkan konten di antara atas dan bawah
  },
  formInput: {
    flex: 1,
    
  },
  input: {
    marginVertical: 8,
  },
  reasonInput: {
    minHeight: 64, 
  },
  button: {
    marginVertical: 8,
    flex: 1, 
    marginHorizontal: 8, 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  cancelButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
});

export default ApplyLeaveScreen;
