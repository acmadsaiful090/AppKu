import React, { memo } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LeaveCard = memo(({ leaveType, days, expDays, color, onPress }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Pressable onPress={onPress} style={styles.cardWrapper}>
      <View style={[styles.card, { backgroundColor: color }]}>
        <Text category='label'>{leaveType}</Text>
        <Text category='label'>Days: {days}</Text>
        <Text category='c1'>Exp Days: {expDays}</Text>
      </View>
    </Pressable>
  );
});

const LeaveTypeList = ({ leaveTypes, onCardPress }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {leaveTypes.map((type) => (
          <LeaveCard
            key={type.type}
            leaveType={type.type}
            days={type.days}
            expDays={type.expDays}
            color={type.bgColor}
            onPress={() => onCardPress(type)}
          />
        ))}
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    borderRadius: screenWidth * 0.02, // 2% of screen width
    backgroundColor: '#F2F8FF',
    width: screenWidth * 0.28, // 28% of screen width
    marginBottom: screenHeight * 0.01, // 1% of screen height
    marginRight: screenWidth * 0.02, // 2% of screen width
  },
});

export default LeaveTypeList;
