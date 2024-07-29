import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useStyleSheet, StyleService } from '@ui-kitten/components';

const PayCheckItem = ({ month, amount, date, onPress }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text category="h6">Gaji {month}</Text>
        <Text category="s1">{amount}</Text>
        <Text appearance="hint">{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const themedStyles = StyleService.create({
  card: {
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: 'color-info-100',
    padding: 10,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
  },
});

export default PayCheckItem;
