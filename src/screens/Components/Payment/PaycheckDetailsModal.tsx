import React from 'react';
import { View, Pressable } from 'react-native';
import { Text, Modal, StyleService, useStyleSheet } from '@ui-kitten/components';

const PaycheckDetailsModal = ({ visible, onClose, paycheck }) => {
  const styles = useStyleSheet(themedStyles);

  if (!paycheck) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.headerText} category="h6">Slip Gaji Karyawan</Text>
        <Text style={styles.periodText} category="s1">Priode 25 Agustus - 25 September 2024</Text>

        {[
          { label: 'Nama', value: 'Emmanuel Sebastian' },
          { label: 'NIK', value: '117.121.223' },
          { label: 'Jabatan', value: 'FO Agent' },
          { label: 'Alamat', value: 'Malang' }
        ].map((item, index) => (
          <View key={index} style={styles.infoContainer}>
            <Text style={styles.infoLabel}>{item.label} :</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}

        <View style={styles.divider} />

        {[
          { label: 'Gaji Pokok', value: '9.000.000' },
          { label: 'Uang Lembur', value: '3.000.000' },
          { label: 'Potongan', value: '1.000.000' },
          { label: 'Gaji Bersih', value: '11.000.000' }
        ].map((item, index) => (
          <View key={index} style={styles.salaryRow}>
            <Text style={styles.salaryText}>{item.label}</Text>
            <Text style={styles.salaryText}>{item.value}</Text>
          </View>
        ))}

        <Text style={styles.acknowledgementText}>Mengetahui</Text>
        <Text style={styles.companyText}>JC CORPORATE</Text>

        <Pressable style={styles.saveButton} onPress={onClose}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'background-basic-color-1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  headerText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  periodText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'color-primary-300',
    marginVertical: 10,
  },
  salaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  salaryText: {
    fontWeight: 'bold',
  },
  acknowledgementText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  companyText: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'color-primary-500',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PaycheckDetailsModal;
