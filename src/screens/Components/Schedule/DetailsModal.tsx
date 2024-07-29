import React from 'react';
import { View} from 'react-native';
import { Modal, Text, Button,StyleService, useStyleSheet } from '@ui-kitten/components';

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
            {day.shift ? `${day.shift}` : 'Tidak ada jadwal hari ini'}
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

const themedStyles = StyleService.create({
  modalBackground: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
  },
});

export default DetailsModal;
