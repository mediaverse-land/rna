import { I18nManager } from 'react-native';

export function useRtl() {
  const isRtl = I18nManager.isRTL;
  return { isRtl };
}
