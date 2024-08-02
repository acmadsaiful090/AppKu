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
      <Card disabled={true} style={styles.card}>
        <Text category='h5' style={styles.title}>{leave.type}</Text>
        <Text category='label' style={styles.label}>Added</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text category='c1' style={ styles.textCenter}>Quota</Text>
            <Text category='c1' style={ styles.textCenter}>Date</Text>
            <Text category='c1' style={ styles.textCenter}>Exp</Text>
          </View>
          <View style={styles.tableRow}>
            <Text category='c1' style={styles.textCenter}>2</Text>
            <Text category='c1' style={styles.textCenter}>17-Jun-2024</Text>
            <Text category='c1' style={styles.textCenter}>30 days</Text>
          </View>
          <View style={styles.tableRow}>
            <Text category='c1' style={styles.textCenter}>1</Text>
            <Text category='c1' style={styles.textCenter}>13-April-2024</Text>
            <Text category='c1' style={styles.textCenter}>5 days</Text>
          </View>
        </View>
        <Button onPress={onClose} style={styles.closeButton}>Close</Button>
      </Card>
    </Modal>
  );
};

const themedStyles = StyleService.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    padding: 24, // Increased padding
    borderRadius: 12, // Increased borderRadius for a more rounded look
    maxWidth: 500, // Increased width
    minWidth: 300, // Ensure a minimum width
    marginHorizontal: 16,
  },
  title: {
    marginBottom: 8,
    fontSize: 20, // Optional: Increase title font size
    textAlign: 'center', // Center align the title
  },
  label: {
    marginBottom: 16,
    textAlign: 'center', // Center align the label
  },
  tableContainer: {
    marginVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    paddingBottom: 4,
  },
  textCenter: {
    textAlign: 'center', // Center align the text
  },
  closeButton: {
    marginTop: 16,
  },
});

export default LeaveModal;
