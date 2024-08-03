import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, useStyleSheet, StyleService } from '@ui-kitten/components';

const LeaveTypeList = ({ leaveTypes, onCardPress }) => {
  const styles = useStyleSheet(themedStyles);
  const LeaveCard = ({ leaveType, days, expDays, color, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, { backgroundColor: color }]}>
        <Text category='label'>{leaveType}</Text>
        <Text category='label'>Days: {days}</Text>
        <Text category='c1'>Exp Days: {expDays}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderLeaveType = (type) => (
    <LeaveCard
      key={type.type}
      leaveType={type.type}
      days={type.days}
      expDays={type.expDays}
      color={type.bgColor}
      onPress={() => onCardPress(type)}
    />
  );

  const renderLeaveTypeRows = () => {
    const rows = [];
    for (let i = 0; i < leaveTypes.length; i += 2) {
      rows.push(
        <View key={`row-${i}`} style={styles.leaveTypeRow}>
          {renderLeaveType(leaveTypes[i])}
          {leaveTypes[i + 1] && renderLeaveType(leaveTypes[i + 1])}
        </View>
      );
    }
    return rows;
  };

  return (
    <View>
      <Text category='h5' style={styles.title}>Leave Type</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.leaveTypeContainer}>
        {renderLeaveTypeRows()}
      </ScrollView>
    </View>
  );
};

const themedStyles = StyleService.create({
  leaveTypeRow: {
    flexDirection: 'column',
  },
  card: {
    padding: 8,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10, 
  },
});

export default LeaveTypeList;
