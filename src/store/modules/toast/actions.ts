import Icon from 'react-native-vector-icons/MaterialIcons';

export type ToastifyProps = {
  show: any;
  message: string;
  type: 'success' | 'warn' | 'error' | 'default';
  iconName: React.ComponentProps<typeof Icon>['name'];
  duration: 4000;
};

export function showToast(
  message: string,
  type: 'success' | 'warn' | 'error' | 'default',
  iconName: string,
  duration = 4000,
) {
  return {
    type: '@toast/SHOW',
    payload: { type, message, iconName, duration },
  };
}

export function hideToast() {
  return {
    type: '@toast/HIDE',
  };
}
