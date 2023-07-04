import { styled } from 'styled-components/native';
import { Colors } from '../../styles/colors';

export const InputContainer = styled.View`
  padding: 12px 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  padding: 10px 10px;
  align-items: center;
  margin-bottom: 20px;
`;

export const IconContainer = styled.View`
  position: absolute;
  left: 20px;
  align-items: center;
  justify-content: center;
`;

type InputProps = {
  activeIcon?: boolean;
};

export const TitleContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InputText = styled.TextInput<InputProps>`
  flex: 1;
  padding: 18px ${({ activeIcon }) => (activeIcon ? '38px' : '12px')};
  width: 100%;
  color: ${Colors.primary};
  border-width: 1px;
  border-radius: 18px;
  font-size: 16px;
`;

export const Button = styled.TouchableOpacity`
  height: 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 26px;
`;
