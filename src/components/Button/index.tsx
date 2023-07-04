import React from 'react';

import { ButtonContainer } from './styles';
import { TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  onPress: () => void;
}

export function Button({ children, onPress, ...rest }: ButtonProps) {
  return (
    <ButtonContainer {...rest} onPress={onPress}>
      {children}
    </ButtonContainer>
  );
}
