import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Icon } from '@ui-kitten/components';

const InfoList = ({ styles, info }) => (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    {info.map(item => (
      <View key={item.id} style={[styles.infoItem, { borderColor: item.color }]}>
        <View style={styles.iconCircle}>
          <Icon name={item.icon} fill={item.color} style={styles.itemIcon} />
        </View>
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>{item.title}</Text>
          <Text style={styles.infoDescription}>{item.description}</Text>
        </View>
      </View>
    ))}
  </ScrollView>
);

export default InfoList;
