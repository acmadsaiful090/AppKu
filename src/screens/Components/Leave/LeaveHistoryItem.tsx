import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const LeaveHistoryItem = ({ item }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'yellow';
      case 'Rejected':
        return 'red';
      case 'Approved':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <View style={[styles.container, { borderColor: item.color }]}>
      <View style={styles.infoItem}>
        <View style={styles.infoText}>
          <Text category='s2'>{item.leaveType}</Text>
          <Text category='c1'>Start: {item.start}</Text>
          <Text category='c1'>End: {item.end}</Text>
        </View>
        <View style={styles.statusText}>
          <Text category='c1' style={{ color: getStatusColor(item.status) }}>
            Status: {item.status}
          </Text>
          <Text category='c1'>Applied: {item.applied}</Text>
        </View>
      </View>
      <View style={styles.reasonText}>
        <Text category='c1'>Reason:</Text>
        <Text category='c1'>{item.reason}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flexDirection: 'column',
    borderRadius: 8,
    backgroundColor: 'white',
    marginVertical: 5,
    borderWidth: 1,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    alignItems: 'flex-start',
  },
  statusText: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  reasonText: {
    marginTop: 10,
    flexShrink: 1,
    width: '100%', 
  },
});

export default LeaveHistoryItem;
