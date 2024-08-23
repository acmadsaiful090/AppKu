import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { StyleService, useStyleSheet ,Text} from '@ui-kitten/components';
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

  if (!user) return null;

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
    marginTop: screenWidth * 0.05,
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: screenWidth * 0.225,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth * 0.25,
    height: screenWidth * 0.25,
    borderRadius: screenWidth * 0.125,
    backgroundColor: '$background-basic-color-3',
  },
  circle: {
    width: screenWidth * 0.225,
    height: screenWidth * 0.225,
    borderRadius: screenWidth * 0.1125,
    backgroundColor: '$background-basic-color-1',
  },
  profileName: {
    fontSize: screenWidth * 0.055,
    fontWeight: 'bold',
    color: '$text-basic-color',
  },
  profileRole: {
    fontSize: screenWidth * 0.04,
    color: '$text-basic-color',
  },
});
