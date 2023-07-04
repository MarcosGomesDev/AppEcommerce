import { styled } from 'styled-components/native';
import { Colors } from '../../styles/colors';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CheckInput = styled.TouchableOpacity`
  border-color: ${Colors.primary};
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border-width: 1px;
  margin-right: 6px;
  align-items: center;
  justify-content: center;
`;
