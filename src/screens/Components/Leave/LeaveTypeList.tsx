import React, { memo } from 'react';
import { View, Pressable, Dimensions } from 'react-native';
import { Text, useStyleSheet, StyleService } from '@ui-kitten/components';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LeaveCard = memo(({ leaveType, days, expDays, onPress }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Pressable onPress={onPress} style={styles.cardWrapper}>
      <View style={styles.card}>
        <Text category="label">{leaveType}</Text>
        <Text category="label">Days: {days}</Text>
        <Text category="c1">Exp Days: {expDays}</Text>
      </View>
    </Pressable>
  );
});

const LeaveTypeList = ({ leaveTypes, onCardPress }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {leaveTypes.map(({ type, days, expDays}) => (
          <LeaveCard
            key={type}
            leaveType={type}
            days={days}
            expDays={expDays}
            onPress={() => onCardPress({ type, days, expDays })}
          />
        ))}
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: { flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    padding: screenWidth * 0.02,
    borderRadius: screenWidth * 0.02,
    backgroundColor: 'background-card-color',
    width: screenWidth * 0.27,
    marginBottom: screenHeight * 0.02,
    marginRight: screenWidth * 0.02,
  },
});

export default LeaveTypeList;
