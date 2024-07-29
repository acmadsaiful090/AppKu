import React from 'react';
import { View, Text } from 'react-native';
import { Icon, StyleService, useStyleSheet } from '@ui-kitten/components';

const InfoList = ({ item }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View key={item.id} style={[styles.infoItem, { borderColor: item.color }]}>
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
    flexDirection: 'row',
    padding: 16,
    marginVertical: 5,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
  infoText: {
    flex: 1, // Ensure the text container takes the available space
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoDescription: {
    fontSize: 14,
    color: '#888',
    flexShrink: 1, // Allow text to shrink if needed
    flexWrap: 'wrap', // Wrap the text to the next line
  },
});
