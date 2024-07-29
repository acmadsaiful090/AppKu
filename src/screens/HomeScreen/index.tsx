import React from 'react';
import { ScrollView, FlatList, Dimensions, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, StyleService, useStyleSheet, Icon } from '@ui-kitten/components';

import Header from '../Components/Header';
import Profile from '../Components/Home/Profile';
import InfoList from '../Components/Home/InfoList';
import BirthdayList from '../Components/Home/BirthdayList';
import Attendance from '../Components/Home/Attendance';
import birthdays from '../../assets/data/birthdays';
import info from '../../assets/data/info';

const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={styles.container}>
          <Header />
          <Profile />
          <Attendance />
          <Text style={styles.sectionTitle}>Ulang Tahun Hari Ini</Text>
          <View style={styles.scrollContainer}>
            <FlatList
              horizontal
              data={birthdays}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <BirthdayList item={item} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <Text style={styles.sectionTitle}>Info Dari HRD</Text>
          <ScrollView contentContainerStyle={styles.scrollContainerinfo}>
            {info.map(item => (
              <InfoList key={item.id} item={item} />
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
    backgroundColor: 'background-basic-color-1',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  scrollContainerinfo: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
    marginLeft: 16,
    color: '#444',
  },
});
