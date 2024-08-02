import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const PayCheckItem = ({ month, amount, date, onPress }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <View style={styles.card}>
        <Text category="h6" style={styles.monthText}>Gaji {month}</Text>
        <Text category="s1" style={styles.amountText}>{amount}</Text>
        <Text appearance="hint" style={styles.dateText}>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const themedStyles = StyleService.create({
  touchable: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  card: {
    marginVertical: 4,
    backgroundColor: 'color-info-100',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
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
});

export default PayCheckItem;
