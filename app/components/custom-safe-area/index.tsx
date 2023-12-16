import { FC, ReactNode } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isAndroid } from '../../controllers/platform.controller';

type Props = {
  children: ReactNode;
  style?: any;
};

const _isAndroid = isAndroid();

export const CustomSafeArea: FC<Props> = ({ children, style }) => {
  if (_isAndroid) {
    <SafeAreaView style={{ flex: 1, ...style }}>{children}</SafeAreaView>;
  }

  return <>{children}</>;
};
