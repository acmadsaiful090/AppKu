import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, Modal, ActivityIndicator } from 'react-native';
import { Text, Button, StyleService, useStyleSheet } from '@ui-kitten/components';

const DetailsHistoryModal = ({ visible, selectedId, onClose }) => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        const response = await fetch('https://66bad3266a4ab5edd6364e75.mockapi.io/leaveHistory');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLeaveHistory(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveHistory();
  }, []);

  const leaveDetail = leaveHistory.find(leave => leave.id === selectedId);

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
          {loading ? (
            <ActivityIndicator size="large" color="color-primary-default" />
          ) : error ? (
            <Text>{`Error: ${error}`}</Text>
          ) : (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {!leaveDetail ? (
                <Text>Data tidak ditemukan</Text>
              ) : (
                <View style={styles.infoContainer}>
                  <Text style={styles.infoLabel}>Leave Type:</Text>
                  <Text style={styles.infoValue}>{leaveDetail.leaveType}</Text>
                  <Text style={styles.infoLabel}>Tanggal Mulai:</Text>
                  <Text style={styles.infoValue}>{leaveDetail.start}</Text>
                  <Text style={styles.infoLabel}>Tanggal Selesai:</Text>
                  <Text style={styles.infoValue}>{leaveDetail.end}</Text>
                  <Text style={styles.infoLabel}>Alasan:</Text>
                  <Text style={styles.infoValue}>{leaveDetail.reason}</Text>
                  <Text style={styles.infoLabel}>Status:</Text>
                  <Text style={styles.infoValue}>{leaveDetail.status}</Text>
                </View>
              )}
            </ScrollView>
          )}
          <Button style={styles.closeButton} onPress={onClose}>
            {props => <Text {...props} style={styles.closeButtonText}>Close</Text>}
          </Button>
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
    backgroundColor: 'background-card-color',
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden', 
  },
  scrollContainer: {
    width: '100%',
    paddingBottom: 60,
  },
  headerText: {
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'column',
    marginBottom: 8, 
    width: '100%',
  },
  infoLabel: {
    fontWeight: 'bold',
    marginBottom: 2, 
  },
  infoValue: {
    marginBottom: 8, 
  },
  closeButton: {
    backgroundColor: 'color-primary-default',
    marginTop: 20,
    width: '100%',
  },
  closeButtonText: {
    color: '#FFFFFF',
  },
});

export default DetailsHistoryModal;
