import React from 'react';
import { View } from 'react-native';
import { StyleService, useStyleSheet ,Text} from '@ui-kitten/components';

const PaycheckDetailsContent = ({ paycheck, user }) => {
  const styles = useStyleSheet(themedStyles);

  if (!paycheck || !user) {
    return null;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getPeriod = (date) => {
    if (!date || typeof date !== 'string') {
      return 'Periode: N/A';
    }

    const [day, month, year] = date.split('-').map(Number);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return 'Periode: N/A';
    }

    // Start date: last day of the previous month
    const endDate = new Date(year, month - 1, day);
    const startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
    startDate.setDate(new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate());

    return `Periode ${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const renderRow = (label, value) => (
    <View style={styles.rowContainer}>
      <Text style={styles.rowLabel}>{label} :</Text>
      <Text style={styles.rowValue}>{value || 'N/A'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText} category="h6">Slip Gaji Karyawan</Text>
      <Text style={styles.periodText} category="s1">{getPeriod(paycheck.date)}</Text>

      {renderRow('Nama', user.nama)}
      {renderRow('NIK', user.nik)}
      {renderRow('Jabatan', user.role)}
      {renderRow('Alamat', user.address)}

      <View style={styles.divider} />

      {renderRow('Gaji Pokok', paycheck.basicSalary)}
      {renderRow('Uang Lembur', paycheck.overtimePay)}
      {renderRow('Potongan', paycheck.deductions)}
      {renderRow('Gaji Bersih', paycheck.netSalary)}

      <Text style={styles.acknowledgementText}>Mengetahui</Text>
      <Text style={styles.companyText}>JC CORPORATE</Text>
    </View>
  );
};

const themedStyles = StyleService.create({
  container: {
    margin: 20,
  },
  headerText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  periodText: {
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowLabel: {
    fontWeight: 'bold',
  },
  rowValue: {
    flex: 1,
    textAlign: 'right',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
    marginVertical: 10,
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
