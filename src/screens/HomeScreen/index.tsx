import React, { useState } from 'react';
import { ScrollView, FlatList, View, Dimensions } from 'react-native';
import { StyleService, useStyleSheet, Text } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';
import Profile from '../Components/Home/Profile';
import InfoList from '../Components/Home/InfoList';
import BirthdayList from '../Components/Home/BirthdayList';
import Attendance from '../Components/Home/Attendance';
import info from '../../assets/data/info';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const HomeScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const [birthdays, setBirthdays] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://66d28529184dce1713cdbda8.mockapi.io/users');
          const data = await response.json();
          const currentWeekBirthdays = filterUpcomingBirthdays(data);
          setBirthdays(currentWeekBirthdays);
        } catch (error) {
          console.error('Error fetching birthdays:', error);
        }
      };

      fetchData();
      return () => setBirthdays([]); // Clear birthdays on screen blur
    }, [])
  );

  const filterUpcomingBirthdays = (data) => {
    const today = new Date();
    const startOfPeriod = new Date(today.setDate(today.getDate() - 1)); // Include today's birthdays
    const endOfPeriod = new Date();
    endOfPeriod.setDate(startOfPeriod.getDate() + 7); // Upcoming 7 days

    return data
      .filter(user => {
        const [day, month] = user.tanggal_lahir.split('-');
        const birthDateThisYear = new Date(new Date().getFullYear(), month - 1, day);

        return birthDateThisYear >= startOfPeriod && birthDateThisYear <= endOfPeriod;
      })
      .sort((a, b) => {
        const [dayA, monthA] = a.tanggal_lahir.split('-');
        const [dayB, monthB] = b.tanggal_lahir.split('-');
        return new Date(new Date().getFullYear(), monthA - 1, dayA) - new Date(new Date().getFullYear(), monthB - 1, dayB);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Profile />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <Attendance />
        <Text style={styles.sectionTitle}>Birthdays this week</Text>
        {birthdays.length > 0 ? (
          <FlatList
            horizontal
            data={birthdays}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BirthdayList item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noBirthdayCard}>
            <Text style={styles.noBirthdayText}>No one has a birthday</Text>
            <Text style={styles.noBirthdayText}>this week</Text>
          </View>
        )}
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
    backgroundColor: 'background-color',
  },
  profileContainer: {
    backgroundColor: 'background-card-color',
    borderBottomRightRadius: screenWidth * 0.07,
    borderBottomLeftRadius: screenWidth * 0.07,
    height: screenHeight * 0.2,
  },
  sectionTitle: {
    fontSize: screenWidth * 0.045,
    fontWeight: 'bold',
    marginVertical: screenHeight * 0.01,
    color: 'text-basic-color',
  },
  scrollViewContent: {
    paddingHorizontal: screenWidth * 0.04,
    paddingBottom: screenHeight * 0.02,
  },
  noBirthdayCard: {
    backgroundColor: 'background-card-color',
    borderRadius: screenWidth * 0.04,
    padding: screenWidth * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: screenHeight * 0.02,
  },
  noBirthdayText: {
    fontSize: screenWidth * 0.04,
    color: 'text-basic-color',
    textAlign: 'center',
  },
});

export default HomeScreen;
