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
    width: width * 0.9, // 90% of screen width
    maxHeight: height * 0.5, // 50% of screen height
    backgroundColor: '$background-basic-color-1',
    borderRadius: 12,
    padding: width * 0.05, // Padding as a percentage of screen width
    alignItems: 'center',
    overflow: 'hidden',
  },
  modalTitle: {
    marginBottom: height * 0.02, // Margin as a percentage of screen height
    textAlign: 'center',
    color: '$text-basic-color',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: height * 0.015, // Margin as a percentage of screen height
    color: '$text-basic-color',
  },
  closeButton: {
    marginTop: height * 0.02, // Margin as a percentage of screen height
    width: '100%',
    backgroundColor: '$color-primary-500',
  },
});

export default DetailsModal;
