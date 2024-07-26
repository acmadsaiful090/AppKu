import React, { useEffect, useState } from 'react';
import {useNavigation } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
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

// Component for your camera screen
export default function App() {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');

      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  
  const Spacer = ({ heightPercent = 0, widthPercent = 0 }) => {
    const height = screenHeight * (heightPercent / 100);
    const width = screenWidth * (widthPercent / 100);
    
    return <View style={{ height, width }} />;
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
  const DisplayLocation = () => {
    if (location) {
      return (
        <Text style={styles.statusText}>
          Location: {location.coords.latitude}, {location.coords.longitude}
        </Text>
      );
    } else {
      return <ActivityIndicator size="small" color="black" />;
    }
  };

  return (
    <View style={styles.container}>
      <Spacer heightPercent={windowHeight * 0.01} />
      <View style={styles.circleContainer}>
      <View style={styles.circle}>
        <CameraView style={styles.camera} facing={facing} />
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
        <DisplayLocation />
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
}

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
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    marginBottom: 16,
  },
  camera: {
    width: '100%',
    height: '100%',
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