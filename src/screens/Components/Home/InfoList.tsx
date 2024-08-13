import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Icon, StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const InfoList = ({ item }) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  return (
    <View style={[styles.infoItem, { borderColor: item.color }]}>
      <View style={styles.iconCircle}>
        <Icon name={item.icon} fill={item.color} style={styles.itemIcon} />
      </View>
      <View style={styles.infoText}>
        <Text style={styles.infoTitle}>{item.title}</Text>
        <Text style={styles.infoDescription}>{item.description}</Text>
      </View>
    </View>
  );
};

export default InfoList;

const themedStyles = StyleService.create({
  infoItem: {
    padding: screenWidth * 0.02, // 2% of screen width
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02, // 2% of screen width
    backgroundColor: '$background-basic-color-1', // Use theme color
    alignItems: 'center',
    marginBottom: screenWidth * 0.025, // 2.5% of screen width
  },
  iconCircle: {
    width: screenWidth * 0.1, // 10% of screen width
    height: screenWidth * 0.1, // 10% of screen width
    borderRadius: screenWidth * 0.05, // 5% of screen width
    backgroundColor: '$color-basic-1100', // Use theme color
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: screenWidth * 0.025, // 2.5% of screen width
  },
  itemIcon: {
    width: screenWidth * 0.06, // 6% of screen width
    height: screenWidth * 0.06, // 6% of screen width
  },
  infoText: {
    flex: 1,
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: screenWidth * 0.04, // 4% of screen width
    fontWeight: 'bold',
    color: '$text-basic-color', // Use theme color
  },
  infoDescription: {
    fontSize: screenWidth * 0.035, // 3.5% of screen width
    color: '$text-placeholder-color', // Use theme color
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});
