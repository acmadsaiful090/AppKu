import React from 'react';
import { View, ScrollView,Dimensions, Modal } from 'react-native';
import { Text,Button,StyleService, useStyleSheet } from '@ui-kitten/components';
import leaveHistory from '../../../assets/data/leaveHistory'; // Import data leaveHistory

const DetailsHistoryModal = ({ visible, selectedDate, onClose }) => {
  const styles = useStyleSheet(themedStyles);

  console.log('Received Parameters:', { selectedDate });
  console.log('Data Source: Route Params and leaveHistory');

  // Convert selectedDate to Date object
  const selectedDateObj = new Date(selectedDate);

  // Filter leave history based on the selected date
  const filteredLeaveDetails = leaveHistory.filter(leave => {
    const leaveStart = new Date(leave.start);
    // Check if selectedDate matches the leaveStart date
    return selectedDateObj.toDateString() === leaveStart.toDateString();
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.headerText} category="h6">Detail Cuti</Text>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {filteredLeaveDetails.length === 0 ? (
              <Text>Data tidak ditemukan.</Text>
            ) : (
              filteredLeaveDetails.map((detail, index) => (
                <View key={index} style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Leave Type:</Text>
                  <Text style={styles.infoValue}>{detail.leaveType}</Text>
                  <Text style={styles.infoLabel}>Tanggal Mulai:</Text>
                  <Text style={styles.infoValue}>{detail.start}</Text>
                  <Text style={styles.infoLabel}>Tanggal Selesai:</Text>
                  <Text style={styles.infoValue}>{detail.end}</Text>
                  <Text style={styles.infoLabel}>Alasan:</Text>
                  <Text style={styles.infoValue}>{detail.reason}</Text>
                  <Text style={styles.infoLabel}>Status:</Text>
                  <Text style={styles.infoValue}>{detail.status}</Text>
                </View>
              ))
            )}
          </ScrollView>
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
    width: width * 0.85, 
    maxHeight: height * 0.8, 
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    overflow: 'hidden', 
  },
  scrollContainer: {
    width: '100%',
    paddingBottom: 60, // Adjust padding to ensure the button is visible
  },
  headerText: {
    marginBottom: 10, // Reduced margin
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'column',
    marginBottom: 8, // Reduced margin
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    marginBottom: 4, // Added margin for spacing between values
  },
  closeButton: {
    marginTop: 20,
    width: '100%', 
  },
});

export default DetailsHistoryModal;
