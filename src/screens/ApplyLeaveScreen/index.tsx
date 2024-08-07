import React, { useState } from 'react';
import { Layout, Text, Input, Button, StyleService, useStyleSheet, Select, SelectItem, Datepicker } from '@ui-kitten/components';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import leaveTypes from '../../assets/data/leaveTypes';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ApplyLeaveScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [startDate, setStartDate] = useState(new Date(2024, 6, 17));
  const [endDate, setEndDate] = useState(new Date(2024, 6, 18));
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
          textStyle={{ minHeight: hp('8%'), color: 'black' }}
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
    padding: wp('4%'),
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: hp('2%'),
  },
  form: {
    flex: 1,
  },
  input: {
    marginVertical: hp('1%'),
  },
  reasonInput: {
    minHeight: hp('8%'),
  },
  button: {
    marginVertical: hp('1%'),
    flex: 1,
    marginHorizontal: wp('2%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('2%'),
  },
  cancelButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
});

export default ApplyLeaveScreen;
