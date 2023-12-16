import { useState, ReactNode, useMemo } from 'react';
import { Platform } from 'react-native';
import { Box } from '../../../../components/box';
import { InsertPhone } from './insert-phone';
import { UserPass } from './user-pass';
import { EmailPass } from './email-pass';
import { windowSize } from '../../../../utils/window-size';
import { PaddingContainer } from '../../../../styles/grid';
import { AuthWindows, INSERT_PHONE, LoginNavigationEvent, LoginWindows } from '../types';

type Props = {
  setWindowHandler: (window: AuthWindows) => void;
};

const { height } = windowSize();

const flooredHeight = Math.floor(height);

const PAGE_WIDTH = Platform.OS === 'android' ? flooredHeight - 132 : flooredHeight - 10;

export function Login({ setWindowHandler }: Props) {
  const [currentWindow, setCurrentWindow] = useState<LoginWindows>(INSERT_PHONE);

  const loginNavigationEventsHandler = useMemo<LoginNavigationEvent>(() => {
    return {
      navigateToEmailLogin: () => {
        setCurrentWindow('EMAIL_PASS');
      },
      navigateToUsernameLogin: () => {
        setCurrentWindow('USER_PASS');
      },
      navigateToPhoneLogin: () => {
        setCurrentWindow('INSERT_PHONE');
      },
    };
  }, []);

  const windows: Record<LoginWindows, ReactNode> = useMemo(() => {
    return {
      INSERT_PHONE: (
        <InsertPhone
          setWindowHandler={setWindowHandler}
          loginNavigationEventsHandler={loginNavigationEventsHandler}
        />
      ),
      EMAIL_PASS: <EmailPass loginNavigationEventsHandler={loginNavigationEventsHandler} />,
      USER_PASS: <UserPass loginNavigationEventsHandler={loginNavigationEventsHandler} />,
    };
  }, []);

  return (
    <PaddingContainer>
      <Box height={PAGE_WIDTH}>{windows[currentWindow]}</Box>
    </PaddingContainer>
  );
}
