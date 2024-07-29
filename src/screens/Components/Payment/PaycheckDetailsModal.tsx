import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text, Modal, StyleService, useStyleSheet} from '@ui-kitten/components';


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

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Nama :</Text>
          <Text style={styles.infoText}>Emmanuel Sebastian</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>NIK :</Text>
          <Text style={styles.infoText}>117.121.223</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Jabatan :</Text>
          <Text style={styles.infoText}>FO Agent</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Alamat :</Text>
          <Text style={styles.infoText}>Malang</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.salaryContainer}>
          <View style={styles.salaryRow}>
            <Text style={styles.salaryText}>Gaji Pokok</Text>
            <Text style={styles.salaryText}>9.000.000</Text>
          </View>
          <View style={styles.salaryRow}>
            <Text style={styles.salaryText}>Uang Lembur</Text>
            <Text style={styles.salaryText}>3.000.000</Text>
          </View>
          <View style={styles.salaryRow}>
            <Text style={styles.salaryText}>Potongan</Text>
            <Text style={styles.salaryText}>1.000.000</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.salaryRow}>
          <Text style={styles.salaryText}>Gaji Bersih</Text>
          <Text style={styles.salaryText}>11.000.000</Text>
        </View>

        <Text style={styles.acknowledgementText}>Mengetahui</Text>
        <Text style={styles.companyText}>JC CORPORATE</Text>

        <TouchableOpacity style={styles.saveButton} onPress={onClose}>
          <Text style={styles.saveButtonText}>Simpan</Text>
        </TouchableOpacity>
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
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  headerText: {
    marginBottom: 10,
  },
  periodText: {
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoText: {
    marginBottom: 5,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'color-primary-300',
    marginVertical: 10,
  },
  salaryContainer: {
    marginBottom: 10,
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
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'color-primary-500',
  },
  saveIcon: {
    marginRight: 10,
  },
  saveButtonText: {
    color: 'white',
  },
});

export default PaycheckDetailsModal;
