import React, { useState } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet, Icon } from '@ui-kitten/components';
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
    <Layout style={styles.container}>
      <LeaveTypeList leaveTypes={leaveTypes} onCardPress={handleCardPress} />
      <Text category='h5' style={styles.titleHistory}>Leave History</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {leaveHistory.map(item => (
          <LeaveHistoryItem key={item.id} item={item} />
        ))}
      </ScrollView>
      {selectedLeave && (
        <LeaveModal
          visible={visible}
          leave={selectedLeave}
          onClose={() => setVisible(false)}
        />
      )}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('ApplyLeave')}>
          <Icon name='plus-square-outline' fill='#FFFFFF' style={styles.icon} />
        </Pressable>
        <Text style={styles.buttonText}>Apply Leave</Text>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-primary-500',
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonText: {
    color: 'color-primary-500',
    fontSize: 12,
  },
});

export default LeaveScreen;
