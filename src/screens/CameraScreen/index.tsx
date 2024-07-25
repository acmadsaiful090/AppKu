import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import Facial from '../../assets/icons/Facial_Recognition.png';
import axios from 'axios';
import moment from 'moment-timezone';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  StyleService,
  useStyleSheet,
  Icon,
} from '@ui-kitten/components';


const AbsensiScreen = ({ navigation }) => {
  const styles = useStyleSheet(themedStyles);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  const Spacer = ({ heightPercent = 0, widthPercent = 0 }) => {
    const height = screenHeight * (heightPercent / 100);
    const width = screenWidth * (widthPercent / 100);
    
    return <View style={{ height, width }} />;
  };
  
  const checkAllPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  };
  
  const JakartaTime = () => {
    const [jakartaTime, setJakartaTime] = useState(null);
  
    useEffect(() => {
      const fetchJakartaTime = async () => {
        try {
          const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Jakarta');
          const time = response.data.datetime;
          setJakartaTime(moment(time).format('HH:mm'));
        } catch (error) {
          console.error("Error fetching Jakarta time:", error);
        }
      };
  
      fetchJakartaTime();
      const interval = setInterval(fetchJakartaTime, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <Text style={styles.statusText}>Time: {jakartaTime ? jakartaTime : 'Loading...'}</Text>
    );
  };
  
  const [locationStatus, setLocationStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [mockLocation, setMockLocation] = useState(false);
  const timeStatus = true;

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await checkAllPermissions();
        if (granted) {
          setLocationStatus(true);
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setLocation(location.coords);
          // checkMockLocation(location.coords); // Expo does not provide mock location detection
        } else {
          setLocationStatus(false);
        }
      } catch (err) {
        console.warn(err);
        setLocationStatus(false);
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Spacer heightPercent={windowHeight * 0.01} />
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          {/* Placeholder for Camera */}
          <Text style={styles.text}>Camera Placeholder</Text>
        </View>
      </View>
      <Image source={Facial} style={styles.icon} />
      <Text style={styles.text}>Arahkan wajahmu</Text>
      <Text style={styles.text}>ke arah bingkai</Text>
      <Spacer heightPercent={windowHeight * 0.001} />
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
        <Icon name = 'checkmark'  style={{ width: 18, height: 18 }} color= 'green'/>
          Location
        </Text>
        {location && (
          <Text style={styles.statusText}>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </Text>
        )}
        {mockLocation && (
          <Text style={[styles.statusText, { color: 'red' }]}>
            Fake GPS detected
          </Text>
        )}
        <Text style={styles.statusText}>
        <Icon name = 'checkmark'  style={{ width: 18, height: 18 }} color= 'green'/>
          Time
        </Text>
        <JakartaTime />
      </View>
      <Spacer heightPercent={windowHeight * 0.01} />
      <View style={styles.buttonContainer}>
        <View style={styles.leftButton}>
          <Button title="Batal" color="black" onPress={() => navigation.goBack()} />
        </View>
        <Spacer widthPercent={windowWidth * 0.04} />
        <TouchableOpacity style={styles.cameraButton} onPress={() => {}}>
          <Icon name='camera' style={{ width: 34, height: 34 }} fill='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  circle: {
    width: 243,
    height: 234,
    borderRadius: 150,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 80,
    height: 80,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  leftButton: {},
  cameraButton: {
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
});

export default AbsensiScreen;
