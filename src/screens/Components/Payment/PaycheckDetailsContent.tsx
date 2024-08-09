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
  const monthIndex = monthMapping[monthName];
  
  const startDate = new Date(year, monthIndex, 5);
  const endDate = new Date(year, monthIndex + 1, 5);

  const formatDate = date => date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return `Periode ${formatDate(startDate)} - ${formatDate(endDate)}`;
};

const PaycheckDetailsContent = ({ paycheck }) => {
  const styles = useStyleSheet(themedStyles);
  const periodText = getPeriodText(paycheck.month);

  const renderInfoRow = (label, value) => (
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>{label} :</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const renderSalaryRow = (label, value) => (
    <View style={styles.salaryRow}>
      <Text style={styles.salaryText}>{label}</Text>
      <Text style={styles.salaryText}>{value}</Text>
    </View>
  );

  return (
    <>
      <Text style={styles.headerText} category="h6">Slip Gaji Karyawan</Text>
      <Text style={styles.periodText} category="s1">{periodText}</Text>

      {renderInfoRow('Nama', paycheck.name)}
      {renderInfoRow('NIK', paycheck.nik)}
      {renderInfoRow('Jabatan', paycheck.position)}
      {renderInfoRow('Alamat', paycheck.address)}

      <View style={styles.divider} />

      {renderSalaryRow('Gaji Pokok', paycheck.basicSalary)}
      {renderSalaryRow('Uang Lembur', paycheck.overtimePay)}
      {renderSalaryRow('Potongan', paycheck.deductions)}
      {renderSalaryRow('Gaji Bersih', paycheck.netSalary)}

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
