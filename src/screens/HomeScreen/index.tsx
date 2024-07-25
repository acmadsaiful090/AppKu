import React from 'react';
import { ScrollView, View, Image, Text, FlatList, Dimensions } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Logo from '../../assets/images/logo/logo.png';
import * as eva from '@eva-design/eva';
const windowWidth = Dimensions.get('window').width;
import {
  ApplicationProvider,
  StyleService,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';

const birthdays = [
  { id: '1', name: 'Rhomy Nugraha', date: '27 Desember', role: 'FO Agent', color: '#00BCD4', icon: 'gift-outline' },
  { id: '2', name: 'Deva nugraha', date: '27 Desember', role: 'FO Agent', color: '#FFCDD2', icon: 'gift-outline' },
  { id: '3', name: 'Aida Fatmawati', date: '27 Desember', role: 'FO Agent', color: '#DDA002', icon: 'gift-outline' },
];

const info = [
  { id: '1', title: 'Peraturan Baru', description: 'Per tanggal 23 Jan 2025 akan semua wajib absen secara online', color: '#FFCDD2', icon: 'alert-circle-outline' },
  { id: '2', title: 'Deva - FO SPV', description: 'Karyawan Terbaik Juni 2024', color: '#FFF9C4', icon: 'award-outline' },
  { id: '3', title: 'Tamu Check-in', description: 'Kamar 2024', color: '#B3E5FC', icon: 'home-outline' },
  { id: '4', title: 'libur Tahun Baru', description: 'Per tanggal 01 Jan 2025 Karyawan Libur', color: '#FFCDD2', icon: 'alert-circle-outline' },
];

const HomeScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={styles.container}>
        
          <View style={styles.header}>
            <Image source={Logo} style={styles.logo} />
            <Icon name='power-outline' fill='red' style={styles.powerIcon} />
          </View>
          <View style={styles.profile}>
            <View style={styles.circleContainer}>
              <View style={styles.circle}>
                <Image 
                  source={{ uri: 'https://t3.ftcdn.net/jpg/03/02/88/46/240_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg' }} 
                  style={styles.profileImage} 
                />
              </View>
            </View>
            <Text style={styles.profileName}>Emmanuel Sebastian</Text>
            <Text style={styles.profileRole}>Hotel Kontena - FO Agent</Text>
          </View>
          <View style={styles.attendance}>
            <View style={styles.attendanceItem}>
              <Text style={styles.attendanceNumber}>5</Text>
              <Text style={styles.attendanceLabel}>Hadir</Text>
            </View>
            <View style={styles.attendanceItem}>
              <Text style={styles.attendanceNumber}>1</Text>
              <Text style={styles.attendanceLabel}>Libur</Text>
            </View>
            <View style={styles.attendanceItem}>
              <Text style={styles.attendanceNumber}>3</Text>
              <Text style={styles.attendanceLabel}>Absen</Text>
            </View>
          </View>
          <Text style={styles.sectionTitle}>Ulang Tahun Hari Ini</Text>
          <View style={styles.scrollContainer} >
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
          <Text style={styles.sectionTitle}>Info Dari HRD</Text>
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
      </SafeAreaView>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#00BCD4',
  },
  logo: {
    width: 40,
    height: 40,
  },
  powerIcon: {
    width: 24,
    height: 24,
  },
  profile: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EEE',
    marginBottom: 10,
  },
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FFF',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileRole: {
    fontSize: 16,
    color: '#888',
  },
  attendance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  attendanceItem: {
    alignItems: 'center',
  },
  attendanceNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00BCD4',
  },
  attendanceLabel: {
    fontSize: 14,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 16,
    color: '#444',
  },
  birthdayItem: {
    flexDirection: 'row',
    padding: 16,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#EEE',
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
  birthdayText: {
    justifyContent: 'center',
  },
  birthdayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  birthdayDate: {
    fontSize: 14,
    color: '#FFF',
  },
  birthdayRole: {
    fontSize: 12,
    color: '#FFF',
  },
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
  infoText: {
    marginLeft: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  infoDescription: {
    fontSize: 14,
    color: '#888',
  },
});
