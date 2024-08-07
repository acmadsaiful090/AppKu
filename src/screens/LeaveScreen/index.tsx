import React, { useState } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text category='h5' style={styles.title}>Leave Type</Text>
        <LeaveTypeList leaveTypes={leaveTypes} onCardPress={handleCardPress} />
        
        <Text category='h5' style={styles.title}>Leave History</Text>
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
          <Icon name='plus-circle-outline' fill='#FFFFFF' style={styles.icon} />
        </Pressable>
      </View>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: hp('2%'),
    right: wp('4%'),
    alignItems: 'center',
  },
  button: {
    width: wp('12%'),
    height: hp('6%'),
    borderRadius: wp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-primary-500',
  },
  icon: {
    width: wp('8%'),
    height: hp('4%'),
  },
  title: {
    marginVertical: hp('1%'),
    fontWeight: 'bold',
    color: 'text-body-color',
  },
  scrollContainer: {
    paddingBottom: hp('10%'),
  },
});

export default LeaveScreen;
