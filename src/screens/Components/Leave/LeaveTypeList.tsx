import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, useStyleSheet, StyleService } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LeaveTypeList = ({ leaveTypes, onCardPress }) => {
  const styles = useStyleSheet(themedStyles);

  const LeaveCard = ({ leaveType, days, expDays, color, onPress }) => (
    <Pressable onPress={onPress} style={styles.cardWrapper}>
      <View style={[styles.card, { backgroundColor: color }]}>
        <Text category='label'>{leaveType}</Text>
        <Text category='label'>Days: {days}</Text>
        <Text category='c1'>Exp Days: {expDays}</Text>
      </View>
    </Pressable>
  );

  const renderLeaveTypeRows = () => {
    return leaveTypes.map((type) => (
      <LeaveCard
        key={type.type}
        leaveType={type.type}
        days={type.days}
        expDays={type.expDays}
        color={type.bgColor}
        onPress={() => onCardPress(type)}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {renderLeaveTypeRows()}
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
    borderRadius: wp('2%'),
    backgroundColor: '#F2F8FF',
    width: wp('28%'), 
    marginBottom: hp('1%'), 
    marginRight: wp('2%'), 
  },
  card: {
    padding: wp('2%'),
  },
});
export default LeaveTypeList;