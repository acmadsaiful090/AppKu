import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ApplicationProvider, Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import PayCheckItem from '../Components/Payment/PayCheckItem';
import PaycheckDetailsModal from '../Components/Payment/PaycheckDetailsModal';
import paychecks from '../../assets/data/paychecks';

const PaycheckScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const [visible, setVisible] = useState(false);
  const [selectedPaycheck, setSelectedPaycheck] = useState(null);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const showPaycheckDetails = (paycheck) => {
    setSelectedPaycheck(paycheck);
    toggleModal();
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedPaycheck(null);
  };

  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={{ flex: 1 }}>
          <Layout style={styles.container}>
            <View style={styles.info}>
              <Text category="s1">Nama</Text>
              <Text category="s1">Emmanuel Sebastian</Text>
            </View>
            <View style={styles.info}>
              <Text category="s1">Jabatan</Text>
              <Text category="s1">FO Agent</Text>
            </View>
            <Text category="h4" style={styles.subHeader}>Riwayat Gaji</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {paychecks.map((paycheck) => (
                <PayCheckItem
                  key={paycheck.id}
                  month={paycheck.month}
                  amount={paycheck.amount}
                  date={paycheck.date}
                  onPress={() => showPaycheckDetails(paycheck)}
                />
              ))}
            </ScrollView>
          </Layout>
          <PaycheckDetailsModal
            visible={visible}
            onClose={closeModal}
            paycheck={selectedPaycheck}
          />
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
  subHeader: {
    padding: 10,
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
  scrollContainer: {
    padding: 10,
  },
});

export default PaycheckScreen;
