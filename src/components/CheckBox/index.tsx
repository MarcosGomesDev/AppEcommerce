import React from 'react';
import { CheckInput, Container } from './styles';
import Text from '../Text';
import { Colors } from '../../styles/colors';
import Icon from 'react-native-vector-icons/AntDesign';

type CheckBoxProps = {
  text: string;
};

export function CheckBox({ text }: CheckBoxProps) {
  return (
    <Container>
      <CheckInput>
        <Icon name={'check'} />
      </CheckInput>
      <Text size={14} color={Colors.primary}>
        {text}
      </Text>
    </Container>
  );
}
