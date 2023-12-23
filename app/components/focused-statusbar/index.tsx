import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { isAndroid } from '../../controllers/platform.controller';

type Props = {
  color?: string;
  showOnAndroid?: boolean
};

const IS_ANDROID = isAndroid();

export const FocusedStatusBar = ({ color, showOnAndroid }: Props) => {
  const isFocused = useIsFocused();

  const showOnAndroidPlatform = IS_ANDROID && showOnAndroid ? true: false

  if(!showOnAndroidPlatform){
    return;
  }
  return (
    <>
      {isFocused ? (
        <StatusBar backgroundColor={color || '#030340'} barStyle="light-content" />
      ) : null}
    </>
  );
};
