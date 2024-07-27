import React from 'react';
import { View, Image, Text } from 'react-native';

const Profile = ({ styles }) => (
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

export default Profile;
