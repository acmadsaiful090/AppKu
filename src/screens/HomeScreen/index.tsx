import React from 'react';
import { ScrollView, FlatList, Text, View, Dimensions } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import Profile from '../Components/Home/Profile';
import InfoList from '../Components/Home/InfoList';
import BirthdayList from '../Components/Home/BirthdayList';
import Attendance from '../Components/Home/Attendance';
import birthdays from '../../assets/data/birthdays';
import info from '../../assets/data/info';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeScreen = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Profile />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Attendance />
        <Text style={styles.sectionTitle}>Ulang Tahun Minggu Ini</Text>
        <FlatList
          horizontal
          data={birthdays}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BirthdayList item={item} />}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.sectionTitle}>Info Dari HRD</Text>
        {info.map((item) => (
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
  },
  profileContainer: {
    backgroundColor: 'color-primary-500',
    borderBottomRightRadius: screenWidth * 0.07, // 7% of screen width
    borderBottomLeftRadius: screenWidth * 0.07, // 7% of screen width
    height: screenHeight * 0.2, // 20% of screen height
  },
  sectionTitle: {
    fontSize: screenWidth * 0.045, // 4.5% of screen width
    fontWeight: 'bold',
    marginVertical: screenHeight * 0.01, // 1% of screen height
    color: '$text-body-color',
  },
  scrollViewContent: {
    paddingHorizontal: screenWidth * 0.04, // 4% of screen width
    paddingBottom: screenHeight * 0.02, // 2% of screen height
  },
});

export default HomeScreen;
