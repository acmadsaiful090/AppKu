import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomDropdown = ({ options, selectedIndex, onSelect, isVisible, onClose }) => {
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.dropdownContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dropdownItem,
                selectedIndex === index && styles.selectedItem
              ]}
              onPress={() => {
                onSelect(index);
                onClose();
              }}
            >
              <Text style={styles.itemText}>{option.type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
  },
  dropdownItem: {
    padding: 10,
  },
  selectedItem: {
    backgroundColor: 'lightgray',
  },
  itemText: {
    fontSize: 16,
  },
});

export default CustomDropdown;
