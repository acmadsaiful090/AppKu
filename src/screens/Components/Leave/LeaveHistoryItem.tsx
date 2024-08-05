import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LeaveHistoryItem = ({ item }) => {
  const getBackgroundColor = (status) => {
    switch (status) {
      case 'Rejected':
        return '#F2F8FF'; 
      case 'Approved':
        return '#F2F8FF'; 
      default:
        return '#FFFFFF'; 
    }
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
          borderWidth: item.status === 'In Progress' ? 1 : 0, // Border only for 'In Progress'
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

const styles = StyleSheet.create({
  container: {
    padding: wp('3%'), 
    flexDirection: 'column',
    borderRadius: wp('2%'), 
    marginVertical: hp('1%'),
    backgroundColor: '#FFFFFF', 
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
    marginTop: hp('1%'), 
    flexShrink: 1,
    width: '100%', 
  },
});

export default LeaveHistoryItem;
