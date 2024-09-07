import React from 'react';
import { View, Dimensions, Modal, Pressable } from 'react-native';
import { StyleService, useStyleSheet, Button, Icon, Text, useTheme } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import CustomToggleButton from './CustomToggleButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SettingsModal = ({ visible, onClose, onLogout, theme, toggleTheme }) => {
  const styles = useStyleSheet(themedStyles);
  const thm = useTheme();
  const navigation = useNavigation();

  const handleProfileNavigation = () => {
    onClose();
    navigation.navigate('ProfileDetail');
  };

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text category="h5" style={styles.title}>Settings</Text>
          <CustomToggleButton theme={theme} toggleTheme={toggleTheme} />
          
          <View style={styles.modalItem}>
            <Button style={styles.Profile} onPress={handleProfileNavigation}>
              Profile
            </Button>
          </View>
          
          <View style={styles.modalItem}>            
            <Button
              onPress={handleLogout}
              appearance="filled"
              status="danger"
              style={styles.logoutButton}
            >
              Logout
            </Button>
          </View>

          <Pressable onPress={onClose} style={styles.closeIconContainer}>
            <Icon name="close-outline" fill={thm['icon-background-color']} style={styles.closeIcon} />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  modalContainer: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: screenWidth * 0.03,
  },
  modalContent: {
    backgroundColor: 'background-basic-color-1',
    padding: screenWidth * 0.05,
    borderRadius: screenWidth * 0.05,
    width: screenWidth * 0.6,
  },
  title: {
    alignSelf: 'center',
    marginBottom: screenWidth * 0.05,
  },
  closeIconContainer: {
    position: 'absolute',
    top: screenWidth * 0.01,
    right: screenWidth * 0.01,
  },
  closeIcon: {
    width: screenWidth * 0.08,
    height: screenWidth * 0.08,
  },
  modalItem: {
    marginBottom: screenWidth * 0.02,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    borderColor: '#FF4D4D',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
  },
  Profile: {
    backgroundColor: 'button-primary-color',
    borderColor: 'button-primary-color',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
  },
});

export default SettingsModal;
