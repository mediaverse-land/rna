import { Dimensions } from 'react-native';

export function windowSize() {
  const { width, height } = Dimensions.get('window');
  return { width, height };
}
