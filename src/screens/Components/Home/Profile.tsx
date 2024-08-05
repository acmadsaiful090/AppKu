import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { StyleService, useStyleSheet, useTheme } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Profile = () => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.profile}>
      <View style={[styles.circleContainer, { backgroundColor: theme['background-basic-color-3'] }]}>
        <View style={[styles.circle, { backgroundColor: theme['background-basic-color-1'] }]}>
          <Image 
            source={{ uri: 'https://t3.ftcdn.net/jpg/03/02/88/46/240_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg' }} 
            style={styles.profileImage} 
          />
        </View>
      </View>
      <Text style={[styles.profileName, { color: theme['text-basic-color'] }]}>{user.nama}</Text>
      <Text style={[styles.profileRole, { color: theme['text-hint-color'] }]}>{user.role}</Text>
    </View>
  );
};

export default Profile;

const themedStyles = StyleService.create({
  profile: {
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp('22.5%'), // 45% of width
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('25%'), // 100/4
    height: wp('25%'),
    borderRadius: wp('12.5%'), // 50% of width
  },
  circle: {
    width: wp('22.5%'), // 90/4
    height: wp('22.5%'),
    borderRadius: wp('11.25%'), // 45% of width
  },
  profileName: {
    fontSize: wp('5.5%'), // 22/4
    fontWeight: 'bold',
  },
  profileRole: {
    fontSize: wp('4%'), // 16/4
    color: '#888',
  },
});
