import React from 'react';
import { Toast } from '../Toast';
import { ViewContainer } from './styles';

type Containerprops = {
  children: React.ReactNode;
};

export function Container({ children }: Containerprops) {
  return (
    <ViewContainer>
      <Toast />
      {children}
    </ViewContainer>
  );
}
