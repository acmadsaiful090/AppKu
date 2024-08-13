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

  // Extract day, month, and year from date string in dd-mm-yyyy format
  const [day, month, year] = date.split('-');
  // Convert month to zero-based index
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
    borderRadius: width * 0.04, // Border radius as a percentage of screen width
    overflow: 'hidden',
    marginBottom: width * 0.02, // Margin bottom for spacing
  },
  card: {
    padding: width * 0.04, // 4% of screen width
    backgroundColor: '$color-info-100', // Background color from theme
  },
  monthText: {
    fontWeight: 'bold',
    color: '$text-basic-color', // Text color from theme
    fontSize: width * 0.045, // Font size as a percentage of screen width
  },
  amountText: {
    color: '$text-basic-color', // Text color from theme
    fontSize: width * 0.04, // Font size as a percentage of screen width
  },
  dateText: {
    color: '$color-primary-500', // Primary color from theme
    fontSize: width * 0.035, // Font size as a percentage of screen width
  },
});

export default PayCheckItem;
