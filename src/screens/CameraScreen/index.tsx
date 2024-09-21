import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { View, Image, Pressable, Alert, Dimensions } from 'react-native';
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

const { width, height } = Dimensions.get('window');

const getDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371e3; // Earth radius in meters
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
};

const CameraScreen = ({ theme }) => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [facing, setFacing] = useState<CameraType>('front');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [locationPermission, setLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);
  const [jakartaTime, setJakartaTime] = useState(null);
  const isFocused = useIsFocused();
  const cameraRef = useRef<CameraView>(null);
  const isEnabled = theme === 'light';
  const targetLocation = {
    latitude: -7.958658,
    longitude: 112.637873,
    radius: 20,
  };

  useEffect(() => {
    if (__DEV__) {
      Alert.alert("Debugging Mode Active", "Please turn off debugging mode to use the camera feature.", [{
        text: "OK",
        onPress: () => navigation.goBack(),
      }]);
    }

    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
      if (status !== 'granted') {
        Alert.alert('Location Permission Denied', 'Permission to access location is required to use this feature.');
      } else {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    };
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (isFocused) {
      const fetchJakartaTime = async () => {
        try {
          const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Jakarta');
          const data = await response.json();
          setJakartaTime(moment(data.datetime).format('HH:mm'));
        } catch (error) {
          console.error("Error fetching Jakarta time:", error);
        }
      };
      fetchJakartaTime();
      const interval = setInterval(fetchJakartaTime, 1000);
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  const checkLocation = (userLocation) => {
    if (!userLocation) return false;
    const distance = getDistance(
      userLocation.coords.latitude,
      userLocation.coords.longitude,
      targetLocation.latitude,
      targetLocation.longitude
    );
    return distance <= targetLocation.radius;
  };

  const handleCapture = async () => {
    if (!checkLocation(location)) {
      Alert.alert("Invalid Location", "You are outside the designated area. Please move to the correct location.");
      return;
    }

    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.5, base64: true });
      if (photo) {
        const timestamp = jakartaTime || moment().format('HH-mm');
        const customDir = `${FileSystem.documentDirectory}Photos/CustomFolder/`;
        await FileSystem.makeDirectoryAsync(customDir, { intermediates: true });
        const fileUri = `${customDir}photo_${timestamp}.jpg`;
        await FileSystem.moveAsync({ from: photo.uri, to: fileUri });
        Alert.alert("Success", `Photo saved at ${fileUri}`);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
      Alert.alert("Error", "Failed to capture and save the photo.");
    }
  };

  if (!cameraPermission || locationPermission === null) return <View />;

  if (!cameraPermission.granted || locationPermission !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          {cameraPermission.granted ? 
            'We need location permission to show the camera' : 
            'We need camera permission to show the camera'}
        </Text>
        <Button
          onPress={() => {
            if (!cameraPermission.granted) {
              requestCameraPermission();
            } else if (locationPermission !== 'granted') {
              Location.requestForegroundPermissionsAsync();
            }
          }}
        >
          Grant Permission
        </Button>
      </View>
    );
  }

  const isLocationValid = checkLocation(location);
  return (
    <View style={styles.container}>
      <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon 
          name='close-outline' 
          style={styles.closeIcon} 
          fill={isEnabled ? "#1F1F1F" : "#F2F6FF"} 
        />
      </Pressable>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          {isFocused && <CameraView style={styles.camera} facing={facing} ref={cameraRef} />}
        </View>
      </View>
      <Image source={Facial} style={styles.icon} />
      <Text style={styles.text}>Arahkan wajahmu ke arah bingkai</Text>
      <Text style={[styles.statusText, isLocationValid ? styles.validLocation : styles.invalidLocation]}>
        {isLocationValid ? 'Valid Location' : 'Invalid Location'}
      </Text>
      <Text style={styles.statusText}>
        Time: {jakartaTime || 'Loading...'}
      </Text>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.cameraButton} onPress={handleCapture}>
          <Icon name='camera' fill='white' style={styles.cameraIcon} />
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
    marginBottom: 1,
  },
  circle: {
    width: width * 0.65,
    height: height * 0.3,
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
  statusText: {
    width: '100%',
    alignItems: 'flex-start',
    fontSize: 13,
    marginVertical: 4,
  },
  validLocation: {
    color: 'color-success-default',
  },
  invalidLocation: {
    color: 'color-danger-default',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    width: '100%',
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
    backgroundColor: 'red',
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
