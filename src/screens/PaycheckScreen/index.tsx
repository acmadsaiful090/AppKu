import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Dimensions, ActivityIndicator } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet, Button } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';

import PayCheckItem from '../Components/Payment/PayCheckItem';
import PaycheckDetailsModal from '../Components/Payment/PaycheckDetailsModal';
import Profile from '../Components/Home/Profile';

const { width, height } = Dimensions.get('window');

const ITEMS_PER_PAGE = 6;

const PaycheckScreen = () => {
  const styles = useStyleSheet(themedStyles);
  const [visible, setVisible] = useState(false);
  const [selectedPaycheck, setSelectedPaycheck] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paychecks, setPaychecks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPaychecks = async () => {
    try {
      const response = await fetch('https://66bad3266a4ab5edd6364e75.mockapi.io/paychecks');
      const data = await response.json();
      setPaychecks(data);
    } catch (error) {
      console.error('Error fetching paychecks:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchPaychecks();
    }, [])
  );

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

  const totalPages = Math.ceil(paychecks.length / ITEMS_PER_PAGE);
  const paginatedPaychecks = paychecks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <Layout style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.profileContainer}>
        <Profile />
      </View>
      <Text category="h4" style={styles.subHeader}>Riwayat Gaji</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {paginatedPaychecks.map((paycheck) => (
          <PayCheckItem
            key={paycheck.id}
            month={paycheck.month}
            amount={paycheck.amount}
            date={paycheck.date}
            onPress={() => showPaycheckDetails(paycheck)}
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        <Button
          appearance='ghost'
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>
        <Text>{`${currentPage} / ${totalPages}`}</Text>
        <Button
          appearance='ghost'
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </View>
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
    backgroundColor: 'background-color',
  },
  profileContainer: {
    backgroundColor: 'background-card-color',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    height: height * 0.2,
  },
  subHeader: {
    paddingHorizontal: width * 0.04, // 4% of screen width
  },
  scrollContainer: {
    paddingHorizontal: width * 0.04, // 4% of screen width
    paddingBottom: height * 0.02, // 2% of screen height
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: height * 0.02, // 2% of screen height
  },
});

export default PaycheckScreen;
