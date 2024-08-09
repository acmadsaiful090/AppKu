import React, { useState } from 'react';
import { ScrollView, View, Pressable, Dimensions } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet, Icon, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import leaveTypes from '../../assets/data/leaveTypes';
import leaveHistory from '../../assets/data/leaveHistory';
import LeaveTypeList from '../Components/Leave/LeaveTypeList';
import LeaveHistoryItem from '../Components/Leave/LeaveHistoryItem';

const { width, height } = Dimensions.get('window');
const ITEMS_PER_PAGE = 4;

const LeaveScreen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();

  const handleCardPress = (leave) => {
    const { type } = leave;
    navigation.navigate('LeaveDetail', { leaveType: type });
  };

  const totalPages = Math.ceil(leaveHistory.length / ITEMS_PER_PAGE);
  const paginatedHistory = leaveHistory.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <Layout style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text category='h5' style={styles.title}>Leave Type</Text>
        <LeaveTypeList leaveTypes={leaveTypes} onCardPress={handleCardPress} />
        
        <Text category='h5' style={styles.title}>Leave History</Text>
        {paginatedHistory.map(item => (
          <LeaveHistoryItem key={item.id} item={item} />
        ))}
        
        <View style={styles.pagination}>
          <Button
            appearance='ghost'
            disabled={currentPage === 1}
            onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </Button>
          <Text>{`${currentPage} / ${totalPages}`}</Text>
          <Button
            appearance='ghost'
            disabled={currentPage === totalPages}
            onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            Next
          </Button>
        </View>
      </ScrollView>

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
    paddingHorizontal: width * 0.04, // 4% of screen width
  },
  buttonContainer: {
    position: 'absolute',
    bottom: height * 0.02, // 2% of screen height
    right: width * 0.04, // 4% of screen width
    alignItems: 'center',
  },
  button: {
    width: width * 0.12, // 12% of screen width
    height: height * 0.06, // 6% of screen height
    borderRadius: width * 0.06, // 6% of screen width
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-primary-500',
  },
  icon: {
    width: width * 0.08, // 8% of screen width
    height: height * 0.04, // 4% of screen height
  },
  title: {
    fontWeight: 'bold',
    color: 'text-body-color',
  },
  scrollContainer: {
    paddingBottom: height * 0.1, // 10% of screen height
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 0.02, // 2% of screen height
  },
});

export default LeaveScreen;
