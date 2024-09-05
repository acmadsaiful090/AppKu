// CameraContainer.tsx
import React, { useRef, useEffect } from 'react';
import { View, Pressable, Alert } from 'react-native';
import { CameraView, CameraType } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { Icon } from '@ui-kitten/components';
import moment from 'moment-timezone';

interface CameraContainerProps {
  facing: CameraType;
  isCameraActive: boolean;
  onCapture: (photoUri: string) => void;
}

const CameraContainer: React.FC<CameraContainerProps> = ({ facing, isCameraActive, onCapture }) => {
  const cameraRef = useRef<CameraView>(null);

  const handleCapture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.5,
        base64: true,
      });

      if (photo) {
        const timestamp = moment().format('HH-mm'); // Replace ':' to avoid issues with filenames
        const fileUri = `${FileSystem.documentDirectory}../Download/photo_${timestamp}.jpg`;

        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileUri,
        });

        onCapture(fileUri);
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
      Alert.alert("Error", "Failed to capture and save the photo.");
    }
  };

  useEffect(() => {
    if (isCameraActive) {
      handleCapture();
    }
  }, [isCameraActive]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ borderRadius: 150, overflow: 'hidden' }}>
        {isCameraActive && <CameraView style={{ width: '100%', height: '100%' }} facing={facing} ref={cameraRef} />}
      </View>
      <Pressable onPress={handleCapture} style={{ position: 'absolute', bottom: 10, alignSelf: 'center' }}>
        <Icon name='camera' fill='white' style={{ width: 32, height: 32 }} />
      </Pressable>
    </View>
  );
};

export default CameraContainer;
