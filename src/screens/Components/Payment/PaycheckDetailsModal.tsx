import React, { useState, useRef } from 'react';
import { View, Pressable, Alert, Modal } from 'react-native';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import PaycheckDetailsContent from './PaycheckDetailsContent';
import generatePaycheckHtml from './generatePaycheckHtml';

const PaycheckDetailsModal = ({ visible, onClose, paycheck }) => {
  const styles = useStyleSheet(themedStyles);
  const viewRef = useRef();
  const [saveOptionsVisible, setSaveOptionsVisible] = useState(false);

  if (!paycheck) {
    return null;
  }

  const generatePDF = async () => {
    const htmlContent = generatePaycheckHtml(paycheck);

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

      if (await Sharing.isAvailableAsync()) {
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

  const handleSaveImage = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'jpg',
        quality: 1.0,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/jpeg',
          dialogTitle: 'Save or share your paycheck image',
          UTI: 'public.jpeg',
        });
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
      }
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleSave = () => {
    setSaveOptionsVisible(true);
  };

  const hideSaveOptions = () => {
    setSaveOptionsVisible(false);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer} ref={viewRef}>
          <PaycheckDetailsContent paycheck={paycheck} />

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Simpan</Text>
          </Pressable>

          <Modal
            visible={saveOptionsVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={hideSaveOptions}
          >
            <View style={styles.backdrop}>
              <View style={styles.optionsContainer}>
                <Text style={styles.optionText}>Simpan sebagai:</Text>
                <View style={styles.buttonContainer}>
                  <Pressable style={styles.optionButton} onPress={handleSharePDF}>
                    <Text style={styles.optionButtonText}>PDF</Text>
                  </Pressable>
                  <Pressable style={styles.optionButton} onPress={handleSaveImage}>
                    <Text style={styles.optionButtonText}>JPG</Text>
                  </Pressable>
                  <Pressable style={styles.optionButton} onPress={hideSaveOptions}>
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
    backgroundColor: 'color-basic-100',
    borderRadius: 10,
  },
  saveButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'color-primary-500',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'color-basic-100',
    borderRadius: 10,
  },
  optionText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  optionButton: {
    padding: 10,
    backgroundColor: 'color-primary-500',
    borderRadius: 5,
    alignItems: 'center',
  },
  optionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'color-danger-500',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PaycheckDetailsModal;
