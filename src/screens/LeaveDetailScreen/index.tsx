import React, { useState, useEffect, useCallback } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Card, Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
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
    const leaveTypeData = leaveTypes.find(leave => leave.type === leaveType);
    if (leaveTypeData && leaveTypeData.details) {
      const filteredDetails = leaveTypeData.details.filter(
        detail => new Date(detail.date).getMonth() === currentMonth
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
  }, [leaveType, currentMonth]);

  useEffect(() => {
    calculateBalances();
  }, [calculateBalances]);

  const handleMonthChange = (direction) => {
    setCurrentMonth(prev => direction === 'left' ? (prev === 0 ? 11 : prev - 1) : (prev === 11 ? 0 : prev + 1));
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>{leaveType}</Text>
        <View style={styles.header}>
          <Pressable onPress={() => handleMonthChange('left')}>
            <Icon name="arrow-ios-back" fill="#000" style={styles.icon} />
          </Pressable>
          <Text>{new Date(0, currentMonth).toLocaleString('default', { month: 'long' })}</Text>
          <Pressable onPress={() => handleMonthChange('right')}>
            <Icon name="arrow-ios-forward" fill="#000" style={styles.icon} />
          </Pressable>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.textDate}>Date</Text>
            <Text style={styles.textDetail}>Detail</Text>
            <Text style={styles.textQty}>Qty</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.textDate}></Text>
            <Text style={styles.textDetail}>Sisa saldo</Text>
            <Text style={styles.textQty}>{previousMonthBalance}</Text>
          </View>
          {leaveDetails.map((detail, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.textDate}>{new Date(detail.date).toLocaleDateString()}</Text>
              <Text style={styles.textDetail}>{detail.description}</Text>
              <Text style={styles.textQty}>{detail.qty}</Text>
            </View>
          ))}
          <View style={styles.row}>
            <Text style={styles.textDate}></Text>
            <Text style={styles.textDetail}>Total saldo</Text>
            <Text style={styles.textQty}>{currentMonthTotal}</Text>
          </View>
        </View>
        <Pressable onPress={() => navigation.navigate('Leave')} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Batal</Text>
        </Pressable>
      </Card>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.04,
  },
  card: {
    padding: width * 0.06,
    width: width * 0.9,
    borderRadius: 12,
  },
  title: {
    marginBottom: 8,
    fontSize: width * 0.05,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: width * 0.02,
  },
  icon: {
    width: width * 0.06,
    height: width * 0.06,
  },
  tableContainer: {
    marginVertical: width * 0.02,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingBottom: width * 0.01,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.01,
    paddingBottom: width * 0.01,
  },
  textDate: {
    flex: 2,
    textAlign: 'left',
    fontSize: width * 0.04,
  },
  textDetail: {
    flex: 3,
    textAlign: 'left',
    fontSize: width * 0.04,
  },
  textQty: {
    flex: 1,
    textAlign: 'center',
    fontSize: width * 0.04,
  },
  cancelButton: {
    marginTop: height * 0.02,
    padding: width * 0.02,
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
  },
  cancelText: {
    fontSize: width * 0.04,
    color: '#000',
  },
});

export default LeaveDetailScreen;
