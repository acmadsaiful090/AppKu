import React from 'react';
import { ScrollView, View } from 'react-native';
import { ApplicationProvider, Layout, Text, Card, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const paychecks = [
  { id: 1, month: 'September 2024', amount: 'Rp 11.000.000', date: '30 September 2024' },
  { id: 2, month: 'September 2024', amount: 'Rp 11.000.000', date: '30 September 2024' },
  { id: 3, month: 'September 2024', amount: 'Rp 11.000.000', date: '30 September 2024' },
  { id: 4, month: 'September 2024', amount: 'Rp 11.000.000', date: '30 September 2024' },
  { id: 5, month: 'September 2024', amount: 'Rp 11.000.000', date: '30 September 2024' },
];

const ScheduleScreen = () => {
  const styles = useStyleSheet(themedStyles);

  const PayCheckItem = ({ month, amount, date }) => (
    <Card style={styles.card}>
      <Text category='h6'>Gaji {month}</Text>
      <Text category='s1'>{amount}</Text>
      <Text appearance='hint'>{date}</Text>
    </Card>
  );

  return (
    <SafeAreaProvider>
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styles.container}>
        <Text category='h1' style={styles.header}>PayCheck</Text>
        <View style={styles.info}>
          <Text category='s1'>Nama</Text>
          <Text category='s1'>Emmanuel Sebastian</Text>
        </View>
        <View style={styles.info}>
          <Text category='s1'>Jabatan</Text>
          <Text category='s1'>FO Agent</Text>
        </View>
        <Text category='h4' style={styles.subHeader}>Riwayat Gaji</Text>
        <ScrollView>
          {paychecks.map((paycheck) => (
            <PayCheckItem
              key={paycheck.id}
              month={paycheck.month}
              amount={paycheck.amount}
              date={paycheck.date}
            />
          ))}
        </ScrollView>
      </Layout>
      </SafeAreaView>
    </ApplicationProvider>
    </SafeAreaProvider>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  header: {
    color: 'text-control-color',
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'color-primary-default',
  },
  subHeader: {
    marginVertical: 8,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'color-primary-300',
    borderRadius: 10,
  },
  card: {
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'color-info-100',
  },
});

export default ScheduleScreen;
