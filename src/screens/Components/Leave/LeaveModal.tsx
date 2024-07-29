import React from 'react';
import { View } from 'react-native';
import { Modal, Card, Text, Button, useStyleSheet, StyleService } from '@ui-kitten/components';

const LeaveModal = ({ visible, leave, onClose }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onClose}
    >
      <Card disabled={true}>
        <Text category='h5'>{leave.type}</Text>
        <Text category='label'>Added</Text>
        <View style={styles.leaveDetailRow}>
          <Text category='c1'>Quota</Text>
          <Text category='c1'>Date</Text>
          <Text category='c1'>Exp</Text>
        </View>
        <View style={styles.leaveDetailRow}>
          <Text category='c1'>2</Text>
          <Text category='c1'>17-Jun-2024</Text>
          <Text category='c1'>30 days</Text>
        </View>
        <View style={styles.leaveDetailRow}>
          <Text category='c1'>1</Text>
          <Text category='c1'>13-April-2024</Text>
          <Text category='c1'>5 days</Text>
        </View>
        <Button onPress={onClose}>Close</Button>
      </Card>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  leaveDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
});

export default LeaveModal;
