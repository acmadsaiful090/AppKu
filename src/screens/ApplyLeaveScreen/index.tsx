// screens/ApplyLeaveScreen.js
import React, { useState } from 'react';
import { ApplicationProvider, Layout, Text, Input, Button, StyleService, useStyleSheet, Select, SelectItem } from '@ui-kitten/components';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native'; 
import * as eva from '@eva-design/eva';
import { useNavigation } from '@react-navigation/native'; 
import leaveTypes from '../../assets/data/leaveTypes';

const ApplyLeaveScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation(); 
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);

  const onLeaveTypeSelect = (index) => {
    setSelectedLeaveType(leaveTypes[index].type);
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Layout style={styles.container}>
            <Text category='h1'>Apply Leave</Text>
            <Input
              style={styles.input}
              label='Name'
              placeholder='Enter your name'
              value='Emmanuel Sebastian'
              disabled={true} // Membuat input tidak dapat diubah
            />
            <Select
              style={styles.input}
              placeholder='Select leave type'
              selectedIndex={leaveTypes.findIndex(type => type.type === selectedLeaveType)}
              onSelect={index => onLeaveTypeSelect(index.row)}
            >
              {leaveTypes.map(leave => (
                <SelectItem key={leave.id} title={leave.type} />
              ))}
            </Select>
            <Input
              style={styles.input}
              label='Start Date'
              placeholder='Enter start date'
              value='July 17, 2024'
            />
            <Input
              style={styles.input}
              label='End Date'
              placeholder='Enter end date'
              value='July 18, 2024'
            />
            <Input
              style={[styles.input, styles.reasonInput]} // Menambahkan style khusus untuk Reason for Leave
              label='Reason for Leave'
              placeholder='Enter reason'
              value='Melakukan pemeriksaan kesehatan'
              multiline={true} // Mengizinkan input multiline untuk Reason for Leave
              textStyle={{ minHeight: 64 }} // Menambah tinggi minimum input
            />
            <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.goBack()} style={[styles.button, styles.cancelButton]}>
                Batal
              </Button>
              <Button style={styles.button}>
                Apply Leave
              </Button>
            </View>
          </Layout>
        </SafeAreaView>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
  reasonInput: {
    minHeight: 64, // Mengatur tinggi minimum untuk Reason for Leave
  },
  button: {
    marginVertical: 8,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
});

export default ApplyLeaveScreen;
