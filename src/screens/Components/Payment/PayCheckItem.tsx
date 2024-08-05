import React from 'react';
import { Pressable, View } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const PayCheckItem = ({ month, amount, date, onPress }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Pressable onPress={onPress} style={styles.touchable}>
      <View style={styles.card}>
        <Text category="h6" style={styles.monthText}>Gaji {month}</Text>
        <Text category="s1" style={styles.amountText}>{amount}</Text>
        <Text appearance="hint" style={styles.dateText}>{date}</Text>
      </View>
    </Pressable>
  );
};

const themedStyles = StyleService.create({
  touchable: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  card: {
    padding: 16,
    marginVertical: 4,
    backgroundColor: 'color-info-100',
  },
  monthText: {
    fontWeight: 'bold',
  },
  amountText: {
    marginVertical: 4,
  },
  dateText: {
    color: 'color-primary-500',
  },
   description: {
    textAlign: 'left',
  },
});

export default PayCheckItem;
