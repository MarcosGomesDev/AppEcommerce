import { Animated, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { heightPercent } from '../../utils/dimensions';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View.attrs({
  elevation: 100,
  zIndex: 100,
})``;

export const Button = styled(TouchableWithoutFeedback)`
  padding-top: ${getStatusBarHeight() + heightPercent('10')}px;
`;

export const ToastContainer = styled(Animated.View)`
  position: absolute;
  width: 100%;
  padding: 0 7px 20px;
  padding-top: ${getStatusBarHeight() + heightPercent('10')}px;
  align-self: center;
  justify-content: center;
`;

export const MessageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 15px;
  width: 100%;
`;
