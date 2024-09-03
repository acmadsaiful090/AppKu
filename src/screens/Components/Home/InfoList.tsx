import React from 'react';
import { View, Dimensions } from 'react-native';
import { Icon, StyleService, useStyleSheet ,Text} from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const InfoList = ({ item }) => {
  const styles = useStyleSheet(themedStyles);

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
    padding: screenWidth * 0.02,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
    backgroundColor: '$background-basic-color-1',
    alignItems: 'center',
    marginBottom: screenWidth * 0.025,
  },
  iconCircle: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    borderRadius: screenWidth * 0.05,
    backgroundColor: 'icon-background-color',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: screenWidth * 0.025,
  },
  itemIcon: {
    width: screenWidth * 0.06,
    height: screenWidth * 0.06,
  },
  infoText: {
    flex: 1,
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: screenWidth * 0.04,
    fontWeight: 'bold',
    color: '$text-basic-color',
  },
  infoDescription: {
    fontSize: screenWidth * 0.035,
    color: '$text-placeholder-color',
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});