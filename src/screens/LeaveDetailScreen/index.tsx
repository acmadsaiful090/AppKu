import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, Pressable, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Card, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import leaveTypes from '../../assets/data/leaveTypes';

const { width, height } = Dimensions.get('window');

const LeaveDetailScreen = () => {
  const { params: { leaveType } } = useRoute();
  const navigation = useNavigation();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [previousMonthBalance, setPreviousMonthBalance] = useState(0);
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const styles = useStyleSheet(themedStyles);

  const calculateBalances = useCallback(() => {
    if (leaveType) {
      const leaveTypeData = leaveTypes.find(leave => leave.type === leaveType);

      if (leaveTypeData && leaveTypeData.details) {
        const month = currentMonth + 1;
        const filteredDetails = leaveTypeData.details.filter(
          detail => new Date(detail.date).getMonth() + 1 === month
        );
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousMonthDetails = leaveTypeData.details.filter(
          detail => new Date(detail.date).getMonth() === previousMonth
        );

        const prevBalance = previousMonthDetails.reduce((acc, detail) => acc + detail.qty, 0);
        const currTotal = filteredDetails.reduce((acc, detail) => acc + detail.qty, prevBalance);

        setLeaveDetails(filteredDetails);
        setPreviousMonthBalance(prevBalance);
        setCurrentMonthTotal(currTotal);
      }
    }
  }, [leaveType, currentMonth]);

  useEffect(() => {
    calculateBalances();
  }, [calculateBalances]);

  const handleMonthChange = (direction) => {
    setCurrentMonth(prev => (direction === 'left' ? (prev === 0 ? 11 : prev - 1) : (prev === 11 ? 0 : prev + 1)));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text category='h5' style={styles.title}>{leaveType}</Text>
        <View style={styles.header}>
          <Pressable onPress={() => handleMonthChange('left')}>
            <Icon name="arrow-ios-back" fill="#000" style={styles.icon} />
          </Pressable>
          <Text category="h6">{new Date(0, currentMonth).toLocaleString('default', { month: 'long' })}</Text>
          <Pressable onPress={() => handleMonthChange('right')}>
            <Icon name="arrow-ios-forward" fill="#000" style={styles.icon} />
          </Pressable>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text category='c1' style={styles.textDate}>Date</Text>
            <Text category='c1' style={styles.textDetail}>Detail</Text>
            <Text category='c1' style={styles.textQty}>Qty</Text>
          </View>
          <View style={styles.row}>
            <Text category='c1' style={styles.textDate}></Text>
            <Text category='c1' style={styles.textDetail}>Sisa saldo</Text>
            <Text category='c1' style={styles.textQty}>{previousMonthBalance}</Text>
          </View>
          {leaveDetails.map((detail, index) => (
            <View key={index} style={styles.row}>
              <Text category='c1' style={styles.textDate}>{new Date(detail.date).toLocaleDateString()}</Text>
              <Text category='c1' style={styles.textDetail}>{detail.description}</Text>
              <Text category='c1' style={styles.textQty}>{detail.qty}</Text>
            </View>
          ))}
          <View style={styles.row}>
            <Text category='c1' style={styles.textDate}></Text>
            <Text category='c1' style={styles.textDetail}>Total saldo</Text>
            <Text category='c1' style={styles.textQty}>{currentMonthTotal}</Text>
          </View>
        </View>
        <Button
          title="Batal"
          onPress={() => navigation.navigate('Leave')}
        />
      </Card>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.04, // Padding based on screen width
  },
  card: {
    padding: width * 0.06, // Padding based on screen width
    width: width * 0.9, // Width based on screen width
    borderRadius: 12,
  },
  title: {
    marginBottom: 8,
    fontSize: width * 0.05, // Font size based on screen width
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: width * 0.02, // Margin based on screen width
  },
  icon: {
    width: width * 0.06, // Icon size based on screen width
    height: width * 0.06, // Icon size based on screen width
  },
  tableContainer: {
    marginVertical: width * 0.02, // Margin based on screen width
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.01, // Margin based on screen width
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingBottom: width * 0.01, // Padding based on screen width
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.01, // Margin based on screen width
    paddingBottom: width * 0.01, // Padding based on screen width
  },
  textDate: {
    flex: 2,
    textAlign: 'left',
    fontSize: width * 0.04, // Font size based on screen width
  },
  textDetail: {
    flex: 3,
    textAlign: 'left',
    fontSize: width * 0.04, // Font size based on screen width
  },
  textQty: {
    flex: 1,
    textAlign: 'center',
    fontSize: width * 0.04, // Font size based on screen width
  },
});

export default LeaveDetailScreen;
