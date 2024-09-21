import React, { useState, useMemo } from 'react';
import { Modal, FlatList, TouchableOpacity } from 'react-native';
import { Layout, Text, StyleService, useStyleSheet } from '@ui-kitten/components';

const YearDropdown = ({ selectedYear, onSelectYear }) => {
  const styles = useStyleSheet(themedStyles);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  // Generate years from current year to 5 years back
  const years = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => currentYear - index);
  }, [currentYear]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelectYear = (year) => {
    onSelectYear(year);
    toggleDropdown(); 
  };

  return (
    <Layout style={styles.container}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownText}>{selectedYear || 'Select Year'}</Text>
      </TouchableOpacity>

      {isDropdownVisible && (
        <Modal transparent={true} animationType="fade">
          <TouchableOpacity style={styles.modalOverlay} onPress={toggleDropdown}>
            <Layout style={styles.dropdownContainer}>
              <FlatList
                data={years}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.dropdownItem} onPress={() => handleSelectYear(item)}>
                    <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </Layout>
          </TouchableOpacity>
        </Modal>
      )}
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    marginVertical: 10,
  },
  dropdownButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'text-basic-color',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'background-color',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: 'text-basic-color',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    backgroundColor: 'background-color',
    borderRadius: 5,
    width: '40%', 
    maxHeight: 300,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'border-color',
  },
  itemText: {
    fontSize: 16,
    color: 'text-basic-color',
    textAlign: 'center',
  },
});

export default YearDropdown;
