import { Dimensions, PixelRatio } from 'react-native';

export const widthPercent = (percent: string): number => {
  const width = Dimensions.get('window').width;
  return PixelRatio.roundToNearestPixel((width * parseFloat(percent)) / 100);
};

export const heightPercent = (percent: string): number => {
  const height = Dimensions.get('window').height;
  return PixelRatio.roundToNearestPixel((height * parseFloat(percent)) / 100);
};
