import React from 'react';
import { View, Text } from 'react-native';
import { StyleService, useStyleSheet } from '@ui-kitten/components';

const monthMapping = {
  'Januari': 0,
  'Februari': 1,
  'Maret': 2,
  'April': 3,
  'Mei': 4,
  'Juni': 5,
  'Juli': 6,
  'Agustus': 7,
  'September': 8,
  'Oktober': 9,
  'November': 10,
  'Desember': 11
};

// Function to get the start and end dates of a given month
const getPeriodText = (month) => {
  const [monthName, year] = month.split(' ');
  const monthIndex = monthMapping[monthName]; // get month index from mapping
  
  const startDate = new Date(year, monthIndex, 5); // Start on the 5th of the given month
  const endDate = new Date(year, monthIndex + 1, 5); // End on the 5th of the next month

  // Format dates to dd/MM/yyyy
  const startFormatted = startDate.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const endFormatted = endDate.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return `Periode ${startFormatted} - ${endFormatted}`;
};

const PaycheckDetailsContent = ({ paycheck }) => {
  const styles = useStyleSheet(themedStyles);
  const periodText = getPeriodText(paycheck.month);

  return (
    <>
      <Text style={styles.headerText} category="h6">Slip Gaji Karyawan</Text>
      <Text style={styles.periodText} category="s1">{periodText}</Text>

      {[
        { label: 'Nama', value: paycheck.name },
        { label: 'NIK', value: paycheck.nik },
        { label: 'Jabatan', value: paycheck.position },
        { label: 'Alamat', value: paycheck.address }
      ].map((item, index) => (
        <View key={index} style={styles.infoContainer}>
          <Text style={styles.infoLabel}>{item.label} :</Text>
          <Text style={styles.infoValue}>{item.value}</Text>
        </View>
      ))}

      <View style={styles.divider} />

      {[
        { label: 'Gaji Pokok', value: paycheck.basicSalary },
        { label: 'Uang Lembur', value: paycheck.overtimePay },
        { label: 'Potongan', value: paycheck.deductions },
        { label: 'Gaji Bersih', value: paycheck.netSalary }
      ].map((item, index) => (
        <View key={index} style={styles.salaryRow}>
          <Text style={styles.salaryText}>{item.label}</Text>
          <Text style={styles.salaryText}>{item.value}</Text>
        </View>
      ))}

      <Text style={styles.acknowledgementText}>Mengetahui</Text>
      <Text style={styles.companyText}>JC CORPORATE</Text>
    </>
  );
};

const themedStyles = StyleService.create({
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
});

export default PaycheckDetailsContent;
