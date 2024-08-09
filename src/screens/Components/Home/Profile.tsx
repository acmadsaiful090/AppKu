import React, { useState, useEffect } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

const Profile = () => {
  const styles = useStyleSheet(themedStyles);
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
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Image 
            source={{ uri: 'https://t3.ftcdn.net/jpg/03/02/88/46/240_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg' }} 
            style={styles.profileImage} 
          />
        </View>
      </View>
      <Text style={styles.profileName}>{user.nama}</Text>
      <Text style={styles.profileRole}>{user.role}</Text>
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
    borderRadius: screenWidth * 0.225, // 22.5% of screen width
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.25, // 25% of screen width
    height: screenWidth * 0.25, // 25% of screen width
    borderRadius: screenWidth * 0.125, // 12.5% of screen width
    backgroundColor: '$background-basic-color-3',
  },
  circle: {
    width: screenWidth * 0.225, // 22.5% of screen width
    height: screenWidth * 0.225, // 22.5% of screen width
    borderRadius: screenWidth * 0.1125, // 11.25% of screen width
    backgroundColor: '$background-basic-color-1',
  },
  profileName: {
    fontSize: screenWidth * 0.055, // 5.5% of screen width
    fontWeight: 'bold',
    color: 'white', 
  },
  profileRole: {
    fontSize: screenWidth * 0.04, // 4% of screen width
    color: 'white', 
  },
});
