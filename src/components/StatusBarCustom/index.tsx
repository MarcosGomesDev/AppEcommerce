import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

// import { Container } from './styles';

type StatusBarProps = {
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
};

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 35 : StatusBar.currentHeight;

export function StatusBarCustom({ backgroundColor, barStyle }: StatusBarProps) {
  return (
    <View
      style={{ height: STATUSBAR_HEIGHT, backgroundColor: backgroundColor }}
    >
      <StatusBar
        backgroundColor={backgroundColor}
        // translucent={true}
        barStyle={barStyle}
      />
    </View>
  );
}
