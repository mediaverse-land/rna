import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';

type Props = {
  color?: string;
};

export const FocusedStatusBar = ({ color }: Props) => {
  const isFocused = useIsFocused();

  return (
    <>
      {isFocused ? (
        <StatusBar backgroundColor={color || '#030340'} barStyle="light-content" />
      ) : null}
    </>
  );
};
