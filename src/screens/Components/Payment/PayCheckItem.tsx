import React from 'react';
import { Pressable, View, Dimensions } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const { width } = Dimensions.get('window');

// Array to map month numbers to month names
const monthNames = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const PayCheckItem = ({ amount, date, onPress }) => {
  const styles = useStyleSheet(themedStyles);
  const [day, month, year] = date.split('-');
  const monthNumber = parseInt(month, 10) - 1;
  const monthName = monthNames[monthNumber];

  return (
    <Pressable onPress={onPress} style={styles.touchable}>
      <View style={styles.card}>
      <Text category="h6" style={styles.monthText}>
          Gaji {monthName} {year}
        </Text>
        <Text category="s1" style={styles.amountText}>{amount}</Text>
      </View>
    </Pressable>
  );
};

const themedStyles = StyleService.create({
  touchable: {
    borderRadius: width * 0.04,
    overflow: 'hidden',
    marginBottom: width * 0.02,
  },
  card: {
    padding: width * 0.04,
    backgroundColor: 'background-card-color',
  },
  monthText: {
    fontWeight: 'bold',
    color: '$text-basic-color',
    fontSize: width * 0.045,
  },
  amountText: {
    color: '$text-basic-color',
    fontSize: width * 0.04,
  },
  dateText: {
    color: 'text-secondary-color',
    fontSize: width * 0.035,
  }
});

export default PayCheckItem;
