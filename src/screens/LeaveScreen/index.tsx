import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { ApplicationProvider, Layout, Text, Card, Button, StyleService, useStyleSheet, Modal } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useNavigation } from '@react-navigation/native';


const leaveTypes = [
  { id: '1',type: 'Casual leave', days: 3, expDays: 5, bgColor: '#CCF2F4' },
  { id: '2',type: 'Cuti Tahunan', days: 12, expDays: 0, bgColor: '#CCF2F4' }, // Paid time off
  { id: '3',type: 'Cuti Sakit', days: 14, expDays: 3, bgColor: '#F7F0C4' },   // Sick leave
  { id: '4',type: 'Cuti Melahirkan', days: 90, expDays: 0, bgColor: '#FFC2C2' },  // Maternity leave
  { id: '5',type: 'Cuti Paternity', days: 7, expDays: 0, bgColor: '#C2F7C4' },   // Paternity leave
  { id: '6',type: 'Cuti Besar', days: 60, expDays: 0, bgColor: '#FFEBCC' },      // Long service leave
  { id: '7',type: 'Cuti Bersama', days: 1, expDays: 0, bgColor: '#D8BFD8' },     // Public holiday
  { id: '8',type: 'Cuti Duka Cita', days: 3, expDays: 0, bgColor: '#A9A9A9' },   // Bereavement leave
  { id: '9',type: 'Cuti Menikah', days: 3, expDays: 0, bgColor: '#FFA07A' },     // Marriage leave
  { id: '10',type: 'Cuti Studi', days: 0, expDays: 0, bgColor: '#ADD8E6' },        // Study leave
];

const leaveHistory = [
  { id: '1', type: 'Sick Leave', leaveType: 'Medical Leave', start: '16-07-2024', end: '17-07-2024', status: 'DiSetujui', applied: '13-07-2024' },
  { id: '2', type: 'Liburan', leaveType: 'Casual Leave', start: '16-07-2024', end: '17-07-2024', status: 'DiSetujui', applied: '13-07-2024' },
  { id: '3', type: 'Sick Leave', leaveType: 'Medical Leave', start: '16-07-2024', end: '17-07-2024', status: 'DiSetujui', applied: '13-07-2024' },
  { id: '4', type: 'Sick Leave', leaveType: 'Medical Leave', start: '16-07-2024', end: '17-07-2024', status: 'DiSetujui', applied: '13-07-2024' },
  { id: '5', type: 'Sick Leave', leaveType: 'Medical Leave', start: '16-07-2024', end: '17-07-2024', status: 'DiSetujui', applied: '13-07-2024' },
];

const LeaveCard = ({ leaveType, days, expDays, color, onPress }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <TouchableOpacity onPress={onPress}> 
      <Card style={[styles.card, { backgroundColor: color }]}>
        <Text category='label'>{leaveType}</Text>
        <Text category='label'>Days: {days}</Text>
        <Text category='c1'>Exp Days: {expDays}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const LeaveScreen = () => {
  const [visible, setVisible] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();

  const renderLeaveHistoryItem = (item) => (
    <Card key={item.id} style={styles.leaveHistoryItem}>
      <View> 
      <Text category='s1'>{item.type}</Text>
      <Text category='s2'>{item.leaveType}</Text>
      <Text category='c1'>Start: {item.start} End: {item.end}</Text>
      </View>
      <View>
      <Text category='c1'>Status: {item.status}</Text>
      <Text category='c1'>Applied on {item.applied}</Text>
      </View>
    </Card>
  );

  const renderLeaveType = (type) => (
    <LeaveCard
      key={type.type}
      leaveType={type.type}
      days={type.days}
      expDays={type.expDays}
      color={type.bgColor}
      onPress={() => {
        setSelectedLeave(type);
        setVisible(true);
      }}
    />
  );

  const renderLeaveTypeRows = () => {
    const rows = [];
    for (let i = 0; i < leaveTypes.length; i += 2) {
      rows.push(
        <View key={`row-${i}`} style={styles.leaveTypeRow}>
          {renderLeaveType(leaveTypes[i])}
          {leaveTypes[i + 1] && renderLeaveType(leaveTypes[i + 1])}
        </View>
      );
    }
    return rows;
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Layout style={styles.container}>
            <Layout style={styles.header}>
              <Text category='h1' style={styles.headerText}>Leave Management</Text>
            </Layout>
            <Layout style={styles.leaveType}>
            <Text category='h5' style={styles.title}>Leave Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.leaveTypeContainer}>
              {renderLeaveTypeRows()}
            </ScrollView>
            </Layout>
            <View style={styles.leaveApplyContainer}>
              <Text category='h5' style={styles.title}>Apply for Leave</Text>
              <Text style={styles.description}>
                To apply for leave, please fill out the form below with the necessary details including the type of leave,
                start date, end date, and any additional comments. Once submitted, your application will be reviewed.
              </Text>
              <Button style={styles.button} onPress={() => navigation.navigate('ApplyLeave')}>Apply</Button>
            </View>
            <Text category='h4' style={styles.title}>Leave History</Text>
            <ScrollView style={styles.leaveHistoryContainer}>
              {leaveHistory.map(renderLeaveHistoryItem)}
            </ScrollView>
          </Layout>
          {selectedLeave && (
            <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
              >
              <Card disabled={true}>
                <Text category='h5'>{selectedLeave.type}</Text>
                <Text category='label'>Added</Text>
                <View style={styles.leaveDetailRow}>
                  <Text category='c1'>Quota</Text>
                  <Text category='c1'>Date</Text>
                  <Text category='c1'>exp</Text>
                </View>
                <View style={styles.leaveDetailRow}>
                  <Text category='c1'>2</Text>
                  <Text category='c1'>17-juni-2024</Text>
                  <Text category='c1'>30 day</Text>
                </View>
                <View style={styles.leaveDetailRow}>
                  <Text category='c1'>1</Text>
                  <Text category='c1'>13-April-2024</Text>
                  <Text category='c1'>5 Day</Text>
                </View>
                <Button onPress={() => setVisible(false)}>Close</Button>
              </Card>
            </Modal>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </ApplicationProvider>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  header: {
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'color-primary-default',
  },
  headerText: {
    color: 'text-control-color',
  },
  title: {
    marginVertical: 10,
  },
  leaveType:{
    height:'10%',
  },
  leaveTypeContainer: {
    height: '25%',
  },
  leaveTypeRow: {
    flexDirection: 'column',
    marginRight: 5,
  },
  leaveType: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  leaveHistoryContainer: {
    
    marginVertical: 10,
  },
  leaveHistoryItem: {
    flexDirection: 'row',
  },
  leaveHistoryText: {
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 5,
  },
  description: {
    textAlign: 'leaft',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  leaveDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
});

export default LeaveScreen;
