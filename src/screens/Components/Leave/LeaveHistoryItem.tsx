import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text, useStyleSheet, StyleService } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const LeaveHistoryItem = ({ item }) => {
  const styles = useStyleSheet(themedStyles);

  const getBackgroundColor = (status) => {
    return status === 'Rejected' || status === 'Approved' ? '#F2F8FF' : '#FFFFFF';
  };

  const getBorderColor = (status) => {
    return status === 'In Progress' ? '#007BFF' : 'transparent';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return '#007BFF'; // Blue
      case 'Rejected':
        return '#DC3545'; // Red
      case 'Approved':
        return '#28A745'; // Green
      default:
        return '#000000'; // Black
    }
  };

  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: getBackgroundColor(item.status),
          borderColor: getBorderColor(item.status),
          borderWidth: item.status === 'In Progress' ? 1 : 0,
        }
      ]}
    >
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

const themedStyles = StyleService.create({
  container: {
    flexDirection: 'column',
    borderRadius: screenWidth * 0.02, // 2% of screen width
    marginVertical: screenWidth * 0.025, // 2.5% of screen width (approximation of 1% height)
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
    marginTop: screenWidth * 0.025, // 2.5% of screen width (approximation of 1% height)
    flexShrink: 1,
    width: '100%',
  },
});

export default LeaveHistoryItem;
