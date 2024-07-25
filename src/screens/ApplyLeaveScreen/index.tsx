// screens/ApplyLeaveScreen.js
import React from 'react';
import { ApplicationProvider,Layout, Text, Input, Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';

const ApplyLeaveScreen = () => {
  const styles = useStyleSheet(themedStyles);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
    <Layout style={styles.container}>
      <Text category='h1'>Apply Leave</Text>
      <Input
        style={styles.input}
        label='Name'
        placeholder='Enter your name'
        value='Emmanuel Sebastian'
      />
      <Input
        style={styles.input}
        label='Leave Type'
        placeholder='Select leave type'
        value='Medical Leave'
      />
      <Input
        style={styles.input}
        label='Start Date'
        placeholder='Enter start date'
        value='July 17, 2024'
      />
      <Input
        style={styles.input}
        label='End Date'
        placeholder='Enter end date'
        value='July 18, 2024'
      />
      <Input
        style={styles.input}
        label='Reason for Leave'
        placeholder='Enter reason'
        value='Melakukan pemeriksaan kesehatan'
      />
      <Button style={styles.button}>
        Apply Leave
      </Button>
    </Layout>
        </SafeAreaView>
        </SafeAreaProvider>
      </ApplicationProvider>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginVertical: 8,
  },
  button: {
    marginVertical: 8,
  },
});

export default ApplyLeaveScreen;
