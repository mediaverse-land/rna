import { FC, createContext, useEffect, useMemo, useState } from 'react';

import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Text } from '../components/text';
import { BlurView } from 'expo-blur';
import { ICON_WARNING } from '../constaints/icons';
import { Box } from '../components/box';
import { theme } from '../constaints/theme';

type Props = {
  children: React.ReactNode;
};

type AlertType = 'warning' | 'error' | 'success';

export const alertContext = createContext({
  open: function () {
    //
  },
  close: function () {
    //
  },
  isOpen: function () {
    //
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fire: function (message: string, type: AlertType) {},
});

export const AlertContextProvider: FC<Props> = ({ children }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState<{
    message: string;
    type: AlertType;
  }>(null);

  const openAlert = () => {
    setIsAlertOpen(true);
  };

  const fireAlert = (message: string, type: AlertType) => {
    setAlertText({
      message,
      type,
    });
  };

  const closeAlert = () => {
    setIsAlertOpen(false);
  };

  const isAlertOpenHandler = () => isAlertOpen;

  const store: {
    open: () => void;
    close: () => void;
    isOpen: () => boolean;
    fire: (message: string, type: AlertType) => void;
  } = {
    open: openAlert,
    close: closeAlert,
    isOpen: isAlertOpenHandler,
    fire: fireAlert,
  };

  const renderChildren = useMemo(() => {
    return <>{children}</>;
  }, []);
  return (
    <alertContext.Provider value={store}>
      {renderChildren}
      {alertText?.message ? <Dialog alertInfo={alertText} setAlertText={setAlertText} /> : null}
    </alertContext.Provider>
  );
};
// const Icons = {
//   warning: <ICON_WARNING width={16} color={theme.color.light.ACTIVE_TEXT} />,
// };

const Dialog = ({ alertInfo, setAlertText }: { alertInfo: any; setAlertText: any }) => {
  useEffect(() => {
    setTimeout(() => {
      hideAlert();
    }, 5000);
  }, [alertInfo?.message]);

  const hideAlert = () => {
    setAlertText({
      message: null,
      type: null,
    });
  };

  return (
    <Animated.View
      style={{
        width: '100%',
        position: 'absolute',
        bottom: 200,
        length: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Box
        borderRadius={16}
        additionalStyles={{
          overflow: 'hidden',
        }}
      >
        <BlurView
          style={{
            flex: 1,
            borderRadius: 16,
            paddingHorizontal: 6,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          tint="dark"
          intensity={49}
        >
          <Box marginRight={8}>
            <ICON_WARNING width={16} color={theme.color.light.ACTIVE_TEXT} />
          </Box>
          <Text fontSize={12} fontWeight={400} color={theme.color.light.ACTIVE_TEXT}>
            {alertInfo?.message}
          </Text>
        </BlurView>
      </Box>
    </Animated.View>
  );
};
