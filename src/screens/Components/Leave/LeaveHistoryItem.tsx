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
    <View style={[styles.infoItem, { borderColor: item.color }]}>
      <View style={styles.infoText}>
        <Text category='s1'>{item.type}</Text>
        <Text category='s2'>{item.leaveType}</Text>
        <Text category='c1'>Start: {item.start} End: {item.end}</Text>
      </View>
      <View style={styles.statusText}>
        <Text category='c1' style={{ color: getStatusColor(item.status) }}>
          Status: {item.status}
        </Text>
        <Text category='c1'>Applied: {item.applied}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
  },
  infoText: {
    flex: 2,
  },
  statusText: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LeaveHistoryItem;
