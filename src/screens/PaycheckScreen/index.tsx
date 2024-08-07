import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import PayCheckItem from '../Components/Payment/PayCheckItem';
import PaycheckDetailsModal from '../Components/Payment/PaycheckDetailsModal';
import paychecks from '../../assets/data/paychecks';
import Profile from '../Components/Home/Profile';

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
    <Layout style={styles.container}>
      <Profile />
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
      <PaycheckDetailsModal
        visible={visible}
        onClose={closeModal}
        paycheck={selectedPaycheck}
      />
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
  },
  subHeader: {
    marginVertical: hp('2%'),
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: hp('2%'),
  },
});

export default PaycheckScreen;
