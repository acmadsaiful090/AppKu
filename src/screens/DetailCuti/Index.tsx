import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Text, Icon, Layout, StyleService, useStyleSheet } from '@ui-kitten/components';
import leaveHistory from '../../assets/data/leaveHistory'; // Your leave history data

const LeaveHistoryPerMonth = () => {
  const styles = useStyleSheet(themedStyles);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getLeaveHistoryForMonth = () => {
    return leaveHistory.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear;
    });
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <Layout style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handlePrevMonth}>
          <Icon name='arrow-back-outline' style={styles.icon} fill='#000' />
        </Pressable>
        <Text category='h5' style={styles.monthText}>
          {monthNames[currentMonth]} {currentYear}
        </Text>
        <Pressable onPress={handleNextMonth}>
          <Icon name='arrow-forward-outline' style={styles.icon} fill='#000' />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {getLeaveHistoryForMonth().map(item => (
          <View key={item.id} style={styles.historyItem}>
            <Text category='s1'>{item.type}</Text>
            <Text category='c1'>{item.date}</Text>
            <Text category='p1'>{item.status}</Text>
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'background-basic-color-1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthText: {
    fontWeight: 'bold',
  },
  icon: {
    width: 32,
    height: 32,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  historyItem: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'color-basic-100',
  },
});

export default LeaveHistoryPerMonth;
