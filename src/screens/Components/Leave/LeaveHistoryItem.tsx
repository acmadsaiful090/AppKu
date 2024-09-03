import React from 'react';
import { View, Dimensions, Pressable } from 'react-native';
import { Text, useStyleSheet, StyleService } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const LeaveHistoryItem = ({ item, onPress }) => {
  const styles = useStyleSheet(themedStyles);

  const backgroundColor = 'background-card-color';
  const borderColor = item.status === 'In Progress' ? '#007BFF' : 'transparent';
  const statusColor = {
    'In Progress': '#007BFF',
    'Rejected': '#DC3545',
    'Approved': '#28A745',
  }[item.status] || '#000000';

  return (
    <Pressable onPress={() => onPress(item.id)}>
      <View style={[styles.container, {borderColor, borderWidth: borderColor !== 'transparent' ? 1 : 0 }]}>
        <View style={styles.infoItem}>
          <View style={styles.infoText}>
            <Text category='s2'>{item.leaveType}</Text>
            <Text category='c1'>Start: {item.start}</Text>
            <Text category='c1'>End: {item.end}</Text>
          </View>
          <View style={styles.statusText}>
            <Text category='c1' style={{ color: statusColor }}>Status: {item.status}</Text>
            <Text category='c1'>Applied: {item.applied}</Text>
          </View>
        </View>
        <View style={styles.reasonText}>
          <Text category='c1'>Reason:</Text>
          <Text category='c1'>{item.reason}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-card-color',
    padding: screenWidth * 0.02,
    flexDirection: 'column',
    borderRadius: screenWidth * 0.02,
    marginVertical: screenWidth * 0.025,
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
    marginTop: screenWidth * 0.025,
    flexShrink: 1,
    width: '100%',
  },
});

export default LeaveHistoryItem;
