import React, { useEffect, useState } from 'react';
import { View, Switch, Dimensions, Pressable } from 'react-native';
import { StyleService, useStyleSheet, Icon, Text } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window');

const CustomToggleButton = ({ theme, toggleTheme }) => {
  const styles = useStyleSheet(themedStyles);
  const isEnabled = theme === 'dark';

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
      <Text style={isEnabled ? styles.toggleTextDark : styles.toggleTextLight}>
        {isEnabled ? 'Dark' : 'Light'}
      </Text>
      <Pressable onPress={toggleSwitch} style={styles.switchContainer}>
        <Switch
          trackColor={{ false: '#FFE9A0', true: '#192734' }}
          thumbColor={isEnabled ? '#1E90FF' : '#FFD700'}
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
    marginLeft: screenWidth * 0.05,
    marginBottom: screenWidth * 0.05,
  },
  switchContainer: {
    position: 'relative',
    marginLeft: screenWidth * 0.05,
  },
  switch: {
    transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }],
  },
  switchOverlay: {
    position: 'absolute',
    top: '25%',
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
    width: 20,
    height: 20,
    marginRight: screenWidth * 0.02,
  },
  toggleTextLight: {
    color: 'black',
    fontSize: screenWidth * 0.045, 
  },
  toggleTextDark: {
    color: 'white',
    fontSize: screenWidth * 0.045,
  },
});

export default CustomToggleButton;
