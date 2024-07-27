import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { ApplicationProvider, Layout, Text, Card, Button, StyleService, useStyleSheet, Modal, Icon } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Import data
import leaveTypes from '../../assets/data/leaveTypes';
import leaveHistory from '../../assets/data/leaveHistory';

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

  const renderLeaveHistoryItem = (item) => {
    let statusColor;
  
    switch (item.status) {
      case 'In Progress':
        statusColor = 'yellow';
        break;
      case 'Rejected':
        statusColor = 'red';
        break;
      case 'Approved':
        statusColor = 'green';
        break;
      default:
        statusColor = 'black';
    }
  
    return (
      <View key={item.id} style={[styles.infoItem, { borderColor: item.color }]}>
        <View style={styles.infoText}>
          <Text category='s1'>{item.type}</Text>
          <Text category='s2'>{item.leaveType}</Text>
          <Text category='c1'>Start: {item.start} End: {item.end}</Text>
        </View>
        <View style={styles.StatusText}>
          <Text category='c1' style={{ color: statusColor }}>{item.status}</Text>
          <Text category='c1'>Applied: {item.applied}</Text>
        </View>
      </View>
    );
  };  

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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {leaveHistory.map(item => renderLeaveHistoryItem(item))}
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
  leaveType: {
    height: '10%',
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
  leaveApplyContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  scrollContainer: {
    padding: 10,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
  },
  iconCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  infoText: {
    flex: 2,
  },
  StatusText: {
    flex: 1,
  },
  infoTitle: {
    fontWeight: 'bold',
  },
  infoDescription: {
    marginTop: 2,
  },
  button: {
    marginVertical: 5,
  },
  description: {
    textAlign: 'left',
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
