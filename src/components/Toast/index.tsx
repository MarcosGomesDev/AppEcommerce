import React, { useState, useEffect, useCallback } from 'react';
import {
  Animated,
  StatusBar,
  StatusBarStyle,
  Easing,
  Platform,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { hideToast, ToastifyProps } from '../../store/modules/toast/actions';
import { Colors } from '../../styles/colors';
import { heightPercent } from '../../utils/dimensions';
import Text from '../Text';
import { Button, Container, MessageContainer, ToastContainer } from './styles';

type ToastProps = {
  toast: ToastifyProps;
};

let timer: any = null;

export function Toast() {
  const colors = {
    success: Colors.success,
    warn: Colors.warning,
    error: Colors.danger,
    default: Colors.default,
  };
  const [pos] = useState(
    new Animated.Value(-(getStatusBarHeight() + heightPercent('10'))),
  );
  const dispatch = useDispatch();
  const toastfy = useSelector((state: ToastProps) => state.toast);

  const [styleStatusBar, setStyleStatusBar] =
    useState<StatusBarStyle>('dark-content');

  const hide = useCallback(() => {
    Animated.timing(pos, {
      toValue: -(getStatusBarHeight() + heightPercent('10')),
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => {
      dispatch(hideToast());
    });
    setStyleStatusBar('dark-content');
  }, [dispatch, pos]);

  const show = useCallback(() => {
    clearTimeout(timer);
    Animated.timing(pos, {
      toValue: Platform.OS === 'ios' ? -50 : 0,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start();
    setStyleStatusBar('light-content');
    timer = setTimeout(() => {
      hide();
    }, toastfy.duration);
  }, [hide, pos, toastfy.duration]);

  useEffect(() => {
    toastfy.show && show();
  }, [show, toastfy]);

  return (
    <Container>
      <StatusBar
        barStyle={styleStatusBar}
        backgroundColor={toastfy.show ? colors[toastfy.type] : Colors.primary}
        translucent
      />
      <Button
        onPress={() => {
          clearTimeout(timer);
          hide();
        }}
      >
        <ToastContainer
          style={{
            backgroundColor: colors[toastfy.type],
            transform: [{ translateY: pos }],
          }}
        >
          <MessageContainer>
            {toastfy?.iconName !== '' && (
              <Icon name={toastfy.iconName} size={20} color={Colors.white} />
            )}
            <Text color="#fff" style={{ marginLeft: 10 }}>
              {toastfy?.message}
            </Text>
          </MessageContainer>
        </ToastContainer>
      </Button>
    </Container>
  );
}
