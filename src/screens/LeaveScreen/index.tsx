import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ApplicationProvider, Layout, Text, Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import leaveTypes from '../../assets/data/leaveTypes';
import leaveHistory from '../../assets/data/leaveHistory';
import LeaveTypeList from '../Components/Leave/LeaveTypeList';
import LeaveHistoryItem from '../Components/Leave/LeaveHistoryItem';
import LeaveModal from '../Components/Leave/LeaveModal';

const LeaveScreen = () => {
  const [visible, setVisible] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();

  const handleCardPress = (type) => {
    setSelectedLeave(type);
    setVisible(true);
  };
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={{ flex: 1 }}>
          <Layout style={styles.container}>
            <LeaveTypeList leaveTypes={leaveTypes} onCardPress={handleCardPress} />
            <View style={styles.leaveApplyContainer}>
              <Text category='h5' style={styles.title}>Apply for Leave</Text>
              <Text style={styles.description}>
                To apply for leave, please fill out the form below with the necessary details including the type of leave,
                start date, end date, and any additional comments. Once submitted, your application will be reviewed.
              </Text>
              <Button style={styles.button} onPress={() => navigation.navigate('ApplyLeave')}>Apply</Button>
            </View>
            <Text category='h5' style={styles.titleHistory}>Leave History</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {leaveHistory.map(item => (
                <LeaveHistoryItem key={item.id} item={item} />
              ))}
            </ScrollView>
          </Layout>
          {selectedLeave && (
            <LeaveModal
              visible={visible}
              leave={selectedLeave}
              onClose={() => setVisible(false)}
            />
          )}
        </SafeAreaView>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  titleHistory: {
    padding: 10,
  },
  leaveApplyContainer: {
    paddingHorizontal: 10,
  },
  scrollContainer: {
    padding: 10,
  },
  description: {
    textAlign: 'left',
  },
  button: {
    marginVertical: 5,
  },
});

export default LeaveScreen;
