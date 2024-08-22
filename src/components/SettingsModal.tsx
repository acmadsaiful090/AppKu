import React from 'react';
import { View, Dimensions, Modal } from 'react-native';
import { StyleService, useStyleSheet, Button,Icon } from '@ui-kitten/components';
import CustomToggleButton from './CustomToggleButton';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SettingsModal = ({ visible, onClose, onLogout, theme, toggleTheme }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalItem}>
            <CustomToggleButton theme={theme} toggleTheme={toggleTheme} />
          </View>
        
          <View style={styles.modalItem}>
            <Button
              onPress={() => { onLogout(); onClose(); }}
              appearance="filled"
              status="danger"
              style={styles.logoutButton}
            >
              Logout
            </Button>
          </View>
          <Button
            onPress={onClose}
            appearance="filled"
            style={styles.closeButton}
          >
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
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
  modalItem: {
    marginBottom: screenWidth * 0.02,
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
    borderColor: '#FF4D4D',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
  },
  closeButton: {
    backgroundColor: 'background-basic-color-4',
    borderColor: 'background-basic-color-4',
    borderWidth: 1,
    borderRadius: screenWidth * 0.02,
  },
});

export default SettingsModal;
