import React from 'react';
import { View, Image, Text } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';

const Profile = () => {
  const styles = useStyleSheet(themedStyles);

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
      <Text style={styles.profileName}>Emmanuel Sebastian</Text>
      <Text style={styles.profileRole}>Hotel Kontena - FO Agent</Text>
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
    borderRadius: 45,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EEE',
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
});
