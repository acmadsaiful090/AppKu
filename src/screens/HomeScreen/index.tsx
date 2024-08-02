import React from 'react';
import { ScrollView, FlatList, Text, View } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import Profile from '../Components/Home/Profile';
import InfoList from '../Components/Home/InfoList';
import BirthdayList from '../Components/Home/BirthdayList';
import Attendance from '../Components/Home/Attendance';
import birthdays from '../../assets/data/birthdays';
import info from '../../assets/data/info';

const HomeScreen = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <Profile />
      <Attendance />
      <Text style={styles.sectionTitle}>Ulang Tahun Bulan Ini</Text>
      <FlatList
        horizontal
        data={birthdays}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <BirthdayList item={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
      <Text style={styles.sectionTitle}>Info Dari HRD</Text>
      <ScrollView contentContainerStyle={styles.scrollContainerinfo}>
        {info.map(item => (
          <InfoList key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: 16, 
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'text-body-color',
  },
  flatListContainer: {
    paddingVertical: 10, 
  },
  scrollContainerinfo: {
    paddingVertical: 10, 
  },
});

export default HomeScreen;
