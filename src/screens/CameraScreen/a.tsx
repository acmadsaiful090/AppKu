import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { View, Image, Pressable, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import Facial from '../../assets/icons/Facial_Recognition.png';
import moment from 'moment-timezone';
import {
  ApplicationProvider,
  StyleService,
  useStyleSheet,
  Icon,
  Button,
  Text,
} from '@ui-kitten/components';

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371e3; // Earth radius in meters
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
};

const CameraScreen = ({ theme }: { theme: any }) => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [jakartaTime, setJakartaTime] = useState<string | null>(null);
  const isFocused = useIsFocused();
  const cameraRef = useRef<CameraView>(null);
  const targetLocation = {
    latitude: -7.958658,
    longitude: 112.637873,
    radius: 20,
  };

  const checkLocation = (userLocation: Location.LocationObject | null) => {
    if (!userLocation) return false;
    const distance = getDistance(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      targetLocation.latitude,
      targetLocation.longitude
    );
    return distance <= targetLocation.radius;
  };

  useEffect(() => {
    if (__DEV__) {
      Alert.alert(
        "Debugging Mode Active",
        "Please turn off debugging mode to use the camera feature.",
        [{
          text: "OK",
          onPress: () => navigation.goBack(),
        }]
      );
    }
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

  useEffect(() => {
    if (isFocused) {
      setIsCameraActive(true);
      const fetchJakartaTime = async () => {
        try {
          const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Jakarta');
          const data = await response.json();
          const time = data.datetime;
          setJakartaTime(moment(time).format('HH:mm'));
        } catch (error) {
          console.error("Error fetching Jakarta time:", error);
        }
      };
      fetchJakartaTime();
      const interval = setInterval(fetchJakartaTime, 1000);
      return () => {
        clearInterval(interval);
        setIsCameraActive(false);
      };
    } else {
      setIsCameraActive(false);
    }
  }, [isFocused]);

  const handleCapture = async () => {
    const isLocationValid = checkLocation(location);
    if (!isLocationValid) {
      Alert.alert("Invalid Location", "You are outside the designated area. Please move to the correct location.");
      return;
    }
  
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.5,
        base64: true,
      });
  
      if (photo) {
        const photoUri = photo.uri;
        const timestamp = jakartaTime || moment().format('HH-mm'); // Replace ':' to avoid issues with filenames
        
        // Saving directly to the app's document directory
        const fileUri = ${FileSystem.documentDirectory}photo_${timestamp}.jpg;
  
        await FileSystem.moveAsync({
          from: photoUri,
          to: fileUri,
        });
  
        Alert.alert("Success", Photo saved at ${fileUri});
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
      Alert.alert("Error", "Failed to capture and save the photo.");
    }
  };

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

  const DisplayLocation = () => {
    const isLocationValid = checkLocation(location);
    return (
      <Text style={[styles.statusText, isLocationValid ? styles.validLocation : styles.invalidLocation]}>
        {isLocationValid ? 'Valid Location' : 'Invalid Location'}
      </Text>    
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon 
          name='close-outline' 
          style={styles.closeIcon} 
          fill={"#1F1F1F"} 
        />
      </Pressable>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          {isCameraActive && <CameraView style={styles.camera} facing={facing} ref={cameraRef} />}
        </View>
      </View>
      <Image source={Facial} style={styles.icon} />
      <Text style={styles.text}>Arahkan wajahmu</Text>
      <Text style={styles.text}>ke arah bingkai</Text>
      <View style={styles.statusContainer}>
        <DisplayLocation />
        <Text style={styles.statusText}>Time: {jakartaTime ? jakartaTime : 'Loading...'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.cameraButton} onPress={handleCapture}>
          <Icon
            name='camera'
            fill='white'
            style={styles.cameraIcon}
          />
        </Pressable>
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
    backgroundColor: 'background-color',
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
    backgroundColor: 'background-basic-color-10',
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
    color: 'text-basic-color',
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  statusText: {
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 4,
  },
  validLocation: {
    color: 'text-primary-color',
  },
  invalidLocation: {
    color: 'red',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  cameraButton: {
    backgroundColor: 'button-primary-color',
    borderRadius: 50,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 32,
    height: 32,
  },
});

export default CameraScreen;