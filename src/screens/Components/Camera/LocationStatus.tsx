import React from 'react';
import { Text } from 'react-native';
import { StyleService } from '@ui-kitten/components';

interface LocationStatusProps {
  isLocationValid: boolean;
}

const LocationStatus: React.FC<LocationStatusProps> = ({ isLocationValid }) => {
  return (
    <Text style={[styles.statusText, isLocationValid ? styles.validLocation : styles.invalidLocation]}>
      {isLocationValid ? 'Valid Location' : 'Invalid Location'}
    </Text>
  );
};

const styles = StyleService.create({
  statusText: {
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 4,
  },
  validLocation: {
    color: 'text-primary-color',
  },
  invalidLocation: {
    color: 'red',
  },
});

export default LocationStatus;