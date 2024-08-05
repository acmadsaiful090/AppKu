import React from 'react';
import { View, Dimensions } from 'react-native';
import { Modal, Text, Button, StyleService, useStyleSheet } from '@ui-kitten/components';

const DetailsModal = ({ visible, day, onClose }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text category='h6' style={styles.modalTitle}>
            {day.shift ? `Shift ${day.shift}` : 'Tidak ada jadwal hari ini'}
          </Text>
          <Text category='s1'>{`Tanggal: ${day.date}`}</Text>
          {day.shift && (
            <>
              <Text category='s1'>{`Clock-In: ${day.clockIn}`}</Text>
              <Text category='s1'>{`Clock-Out: ${day.clockOut}`}</Text>
            </>
          )}
          <Button style={styles.closeButton} onPress={onClose}>Tutup</Button>
        </View>
      </View>
    </Modal>
  );
};

const { width, height } = Dimensions.get('window');

const themedStyles = StyleService.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85, 
    maxHeight: height * 0.6, 
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    overflow: 'hidden', 
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    width: '100%', 
  },
});

export default DetailsModal;
