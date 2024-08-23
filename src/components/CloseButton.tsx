import React from 'react';
import { Pressable } from 'react-native';
import { Icon } from '@ui-kitten/components';

const CloseButton = ({ onPress, fill }) => {
  return (
    <Pressable style={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }} onPress={onPress}>
      <Icon name='close-outline' style={{ width: 24, height: 24 }} fill={fill} />
    </Pressable>
  );
};

export default CloseButton;
