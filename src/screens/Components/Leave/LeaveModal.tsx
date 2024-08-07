import React, { useState, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { Modal, Card, Text, Button, useStyleSheet, StyleService, Icon } from '@ui-kitten/components';
import leaveTypes from '../../../assets/data/leaveTypes';

const LeaveModal = ({ visible, leave, onClose }) => {
  const styles = useStyleSheet(themedStyles);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [leaveDetails, setLeaveDetails] = useState([]);
  const [previousMonthBalance, setPreviousMonthBalance] = useState(0);
  const [currentMonthTotal, setCurrentMonthTotal] = useState(0);
  const type = leave.type;

  useEffect(() => {
    if (type) {
      const leaveType = leaveTypes.find((leave) => leave.type === type);

      if (leaveType && leaveType.details) {
        const month = currentMonth + 1;
        const filteredDetails = leaveType.details.filter(
          (detail) => new Date(detail.date).getMonth() + 1 === month
        );
        setLeaveDetails(filteredDetails);

        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousMonthDetails = leaveType.details.filter(
          (detail) => new Date(detail.date).getMonth() === previousMonth
        );
        const prevBalance = previousMonthDetails.reduce((acc, detail) => acc + detail.qty, 0);
        const currTotal = filteredDetails.reduce((acc, detail) => acc + detail.qty, prevBalance);

        setPreviousMonthBalance(prevBalance);
        setCurrentMonthTotal(currTotal);
      }
    }
  }, [type, currentMonth]);

  const handleMonthChange = (direction) => {
    if (direction === 'left') {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    } else {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    }
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onClose}
    >
      <Card disabled={true} style={styles.card}>
        <Text category='h5' style={styles.title}>{type}</Text>
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
            <Text category='c1' style={styles.textCenter}>Date</Text>
            <Text category='c1' style={styles.textCenter}>Detail</Text>
            <Text category='c1' style={styles.textCenter}>Qty</Text>
          </View>
          <View style={styles.Row}>
            <Text category='c1' style={styles.textCenter}></Text>
            <Text category='c1' style={styles.textCenter}>Sisa saldo</Text>
            <Text category='c1' style={styles.textCenter}>{previousMonthBalance}</Text>
          </View>
          {leaveDetails.map((detail, index) => (
            <View key={index} style={styles.Row}>
              <Text category='c1' style={styles.textCenter}>{new Date(detail.date).toLocaleDateString()}</Text>
              <Text category='c1' style={styles.textCenter}>{detail.discribe}</Text>
              <Text category='c1' style={styles.textCenter}>{detail.qty}</Text>
            </View>
          ))}
          <View style={styles.Row}>
            <Text category='c1' style={styles.textCenter}></Text>
            <Text category='c1' style={styles.textCenter}>Total saldo</Text>
            <Text category='c1' style={styles.textCenter}>{currentMonthTotal}</Text>
          </View>
        </View>
        <Button onPress={onClose} style={styles.closeButton}>Close</Button>
      </Card>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    padding: 24,
    width: '90%',
    borderRadius: 12,
    marginHorizontal: 16,
  },
  title: {
    marginBottom: 8,
    fontSize: 20,
    textAlign: 'center',
  },
  tableContainer: {
    marginVertical: 8,
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    paddingBottom: 4,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingBottom: 4,
  },
  textCenter: {
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
export default LeaveModal;
