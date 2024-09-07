import React from 'react';
import { View, Text, Modal, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useTheme } from '@ui-kitten/components'; 

const { width } = Dimensions.get('window');

const CustomDropdown = ({ options, selectedIndex, onSelect, isVisible, onClose }) => {
  const theme = useTheme(); 
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={[
          styles.dropdownContainer,
          { backgroundColor: theme['background-card-color'], borderColor: theme['border-card-color'] }
        ]}>
          {options.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.dropdownItem,
                selectedIndex === index && { backgroundColor: theme['background-button-color'] }
              ]}
              onPress={() => {
                onSelect(index);
                onClose();
              }}
            >
              <Text style={[styles.itemText, { color: theme['text-primary-color'] }]}>
                {option.type}
              </Text>
            </Pressable>
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
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
});

export default CustomDropdown;
