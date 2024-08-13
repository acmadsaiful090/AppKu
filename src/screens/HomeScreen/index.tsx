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
    backgroundColor: '$background-basic-color-1', // Menggunakan warna latar belakang dari tema
  },
  profileContainer: {
    backgroundColor: '$color-primary-500', // Menggunakan warna primer dari tema
    borderBottomRightRadius: screenWidth * 0.07, // Radius 7% dari lebar layar
    borderBottomLeftRadius: screenWidth * 0.07, // Radius 7% dari lebar layar
    height: screenHeight * 0.2, // Tinggi 20% dari tinggi layar
  },
  sectionTitle: {
    fontSize: screenWidth * 0.045, // 4.5% dari lebar layar
    fontWeight: 'bold',
    marginVertical: screenHeight * 0.01, // Margin vertikal 1% dari tinggi layar
    color: '$text-basic-color', // Menggunakan warna teks dasar dari tema
  },
  scrollViewContent: {
    paddingHorizontal: screenWidth * 0.04, // Padding horizontal 4% dari lebar layar
    paddingBottom: screenHeight * 0.02, // Padding bawah 2% dari tinggi layar
  },
});

export default HomeScreen;
