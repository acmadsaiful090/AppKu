import React from 'react';
import { ScrollView, FlatList, Text, View } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
      <ScrollView>
      <Attendance />
      <Text style={styles.sectionTitle}>Ulang Tahun Minggu Ini</Text>
      <FlatList
        horizontal
        data={birthdays}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <BirthdayList item={item} />}
        showsHorizontalScrollIndicator={false}
      />
      <Text style={styles.sectionTitle}>Info Dari HRD</Text>
      <ScrollView >
        {info.map(item => (
          <InfoList key={item.id} item={item} />
        ))}
      </ScrollView>
      </ScrollView>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginVertical: hp('2%'),
    color: '$text-body-color',
  },
});
export default HomeScreen;
