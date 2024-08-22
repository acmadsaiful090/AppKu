import React from 'react';
import { View, Dimensions, Modal } from 'react-native';
import { Text, Button, StyleService, useStyleSheet } from '@ui-kitten/components';

const DetailsModal = ({ visible, day, onClose }) => {
  const styles = useStyleSheet(themedStyles);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`;
  };

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
         
          {day.shift && (
            <>
              <Text category='s1' style={styles.modalText}>{`Tanggal: ${formatDate(day.date)}`}</Text>
              <Text category='s1' style={styles.modalText}>{`Clock-In: ${day.clockIn}`}</Text>
              <Text category='s1' style={styles.modalText}>{`Clock-Out: ${day.clockOut}`}</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.5,
    backgroundColor: '$background-card-color',
    borderRadius: 12,
    padding: width * 0.05,
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalTitle: {
    marginBottom: height * 0.02,
    textAlign: 'center',
    color: '$text-header-color',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: height * 0.015,
    color: '$text-primary-color',
  },
  closeButton: {
    marginTop: height * 0.02,
    width: '100%',
    backgroundColor: '$button-primary-color',
  },
});

export default DetailsModal;
