import React, { useEffect, useState } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { View, Image, Dimensions, Pressable, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
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

const CameraScreen = ({ theme }) => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();
  const [location, setLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [jakartaTime, setJakartaTime] = useState(null);
  const isFocused = useIsFocused();
  const isEnabled = theme === 'light';

  useEffect(() => {
    if (__DEV__) {
      Alert.alert(
        "Debugging Mode Active",
        "Please turn off debugging mode to use the camera feature.",
        [{
          text: "OK",
          onPress: () => navigation.goBack(), // Navigate back to the previous screen
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
        setIsCameraActive(false); // Ensure camera is deactivated when the screen is not focused
      };
    } else {
      setIsCameraActive(false);
    }
  }, [isFocused]);

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

  const Spacer = ({ heightPercent = 0, widthPercent = 0 }) => {
    const height = windowHeight * (heightPercent / 100);
    const width = windowWidth * (widthPercent / 100);

    return <View style={{ height, width }} />;
  };

  const DisplayLocation = () => {
    if (location) {
      return (
        <Text style={styles.statusText}>
          Location: {location.coords.latitude}, {location.coords.longitude}
        </Text>
      );
    } else {
      return <ActivityIndicator size="small" color={styles.statusText.color} />;
    }
  };

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
          {isCameraActive && <CameraView style={styles.camera} facing={facing} />}
        </View>
      </View>
      <Image source={Facial} style={styles.icon} />
      <Text style={styles.text}>Arahkan wajahmu</Text>
      <Text style={styles.text}>ke arah bingkai</Text>
      <Spacer heightPercent={0.5} />
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          <Icon name='checkmark' style={styles.statusIcon} />
          Location
        </Text>
        <DisplayLocation />
        <Text style={styles.statusText}>
          <Icon name='checkmark' style={styles.statusIcon} />
          Time
        </Text>
        <Text style={styles.statusText}>Time: {jakartaTime ? jakartaTime : 'Loading...'}</Text>
      </View>
      <Spacer heightPercent={1} />
      <View style={styles.buttonContainer}>
        <View style={styles.centerButton}>
          <Pressable style={styles.cameraButton} onPress={() => {}}>
          <Icon
            name='camera'
            fill='white'
            style={styles.cameraIcon}
          />
          </Pressable>
        </View>
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
    fontSize: 12,
    color: 'text-primary-color',
    textAlign: 'center',
    marginVertical: 4,
  },
  statusIcon: {
    width: 18,
    height: 18,
    color: 'icon-home-color',
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
    zIndex: 1,
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  centerButton: {
    alignItems: 'center',
  },
  cameraButton: {
    alignItems: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 34,
    height: 34,
  },
});

export default CameraScreen;
