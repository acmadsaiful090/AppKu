import React, { useState, useRef, useEffect } from 'react';
import { View, Pressable, Alert, Modal } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PaycheckDetailsContent from './PaycheckDetailsContent';
import generatePaycheckHtml from './generatePaycheckHtml'; 

const PaycheckDetailsModal = ({ visible, onClose, paycheck }) => {
  const styles = useStyleSheet(themedStyles);
  const contentRef = useRef();
  const [saveOptionsVisible, setSaveOptionsVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!paycheck || !user) return null;

  const generatePDF = async () => {
    const htmlContent = generatePaycheckHtml({
      name: user.nama,
      nik: user.nik,
      position: user.role,
      address: user.address,
      date: paycheck.date,
      basicSalary: paycheck.basicSalary,
      overtimePay: paycheck.overtimePay,
      deductions: paycheck.deductions,
      netSalary: paycheck.netSalary,
    });

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      return uri;
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handleSharePDF = async () => {
    try {
      const pdfUri = await generatePDF();
      if (pdfUri && await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(pdfUri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Save or share your paycheck PDF',
          UTI: 'com.adobe.pdf',
        });
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error sharing PDF:', error);
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <View ref={contentRef}>
            <PaycheckDetailsContent paycheck={paycheck} user={user} />
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.saveButton} onPress={() => setSaveOptionsVisible(true)}>
              <Text style={styles.saveButtonText}>Simpan</Text>
            </Pressable>

            <Modal
              visible={saveOptionsVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setSaveOptionsVisible(false)}
            >
              <View style={styles.backdrop}>
                <View style={styles.optionsContainer}>
                  <Text style={styles.optionText}>Simpan sebagai:</Text>
                  <View style={styles.buttonContainer}>
                    <Pressable style={styles.optionButton} onPress={handleSharePDF}>
                      <Text style={styles.optionButtonText}>PDF</Text>
                    </Pressable>
                    <Pressable style={styles.closeButton} onPress={() => setSaveOptionsVisible(false)}>
                      <Text style={styles.optionButtonText}>Batal</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'background-card-color',
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  saveButton: {
    padding: 10,
    backgroundColor: 'button-primary-color',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: 'text-control-color',
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'background-card-color',
    borderRadius: 10,
  },
  optionText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  optionButton: {
    padding: 10,
    backgroundColor: 'button-primary-color',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  optionButtonText: {
    color: 'text-control-color',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    backgroundColor: 'button-danger-color',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'text-control-color',
    fontWeight: 'bold',
  },
});

export default PaycheckDetailsModal;
