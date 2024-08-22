import React, { useEffect, useState } from 'react';
import { View, Switch, Dimensions, Pressable } from 'react-native';
import { StyleService, useStyleSheet, Icon, Text } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const CustomToggleButton = ({ theme, toggleTheme }) => {
  const styles = useStyleSheet(themedStyles);
  const [isEnabled, setIsEnabled] = useState(theme === 'dark');

  useEffect(() => {
    setIsEnabled(theme === 'dark');
  }, [theme]);

  const toggleSwitch = () => {
    toggleTheme();
  };

  return (
    <View style={styles.toggleContainer}>
      <Icon
        name={isEnabled ? "moon-outline" : "sun-outline"}
        fill={isEnabled ? "#FFFFFF" : "#FFD700"}
        style={styles.switchIcon}
      />
      <Text style={isEnabled ? styles.toggleTextOff : styles.toggleTextOn}>
        {isEnabled ? 'Dark' : 'Light'}
      </Text>
      <Pressable onPress={toggleSwitch} style={styles.switchContainer}>
        <Switch
          trackColor={{ false: '#FFE9A0', true: '#192734' }}
          thumbColor={isEnabled ? '#1E90FF' : '#FFD700'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
        <View style={[styles.switchOverlay, isEnabled ? styles.darkOverlay : styles.lightOverlay]} />
      </Pressable>
    </View>
  );
};

const themedStyles = StyleService.create({
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: screenWidth * 0.05, // Adjust spacing between text and switch
  },
  switchContainer: {
    position: 'relative',
    marginLeft: screenWidth * 0.05, // Adjust spacing between text/icon and switch
  },
  switch: {
    transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }], // Slightly enlarged switch
  },
  switchOverlay: {
    position: 'absolute',
    top: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  lightOverlay: {
    left: '20%',
  },
  darkOverlay: {
    left: '65%',
  },
  switchIcon: {
    width: 20,  // Slightly larger icon
    height: 20,
    marginRight: screenWidth * 0.02,  // Space between icon and text
  },
  toggleTextOn: {
    color: 'black',
    fontSize: screenWidth * 0.045,  // Slightly larger text
  },
  toggleTextOff: {
    color: 'white',
    fontSize: screenWidth * 0.045,  // Slightly larger text
  },
});

export default CustomToggleButton;
