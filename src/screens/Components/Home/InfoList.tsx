import React from 'react';
import { View, Text } from 'react-native';
import { Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
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
    padding: wp('2%'),
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: wp('2%'),
    backgroundColor: 'background-basic-color-1',
    alignItems: 'center',
    marginBottom: wp('2.5%'),
  },
  iconCircle: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#444', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2.5%'),
  },
  itemIcon: {
    width: wp('6%'),
    height: wp('6%'),
  },
  infoText: {
    flex: 1, 
    justifyContent: 'center',
  },
  infoTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  infoDescription: {
    fontSize: wp('3.5%'),
    color: '#888',
    flexShrink: 1, 
    flexWrap: 'wrap', 
  },
});
