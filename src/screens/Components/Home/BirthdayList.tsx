import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { Icon } from '@ui-kitten/components';

const BirthdayList = ({ styles, birthdays }) => (
  <View style={styles.scrollContainer}>
    <FlatList
      horizontal
      data={birthdays}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={[styles.birthdayItem, { backgroundColor: item.color }]}>
          <View style={styles.iconCircle}>
            <Icon name={item.icon} fill='white' style={styles.itemIcon} />
          </View>
          <View style={styles.birthdayText}>
            <Text style={styles.birthdayName}>{item.name}</Text>
            <Text style={styles.birthdayDate}>{item.date}</Text>
            <Text style={styles.birthdayRole}>{item.role}</Text>
          </View>
        </View>
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export default BirthdayList;
