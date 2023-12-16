import { FC, ReactNode, useState } from 'react';
import { SendCode } from './send-code';
import { InsertPhone } from './insert-phone';
import { FillData } from './fill-data';
import { Box } from '../../../../components/box';
import { INSERT_PHONE } from '../types';
import { TokenContextProvider } from './context';
import type { AuthWindows, SignUpWithUsernameWindows } from '../types';

type Props = {
  height: number;
  goBackToSigninWindow: () => void;
  setWindowHandler: (window: AuthWindows) => void;
  intialWindw?: SignUpWithUsernameWindows;
  initial__token?: string;
};

export const SignUpWithUsername: FC<Props> = ({
  height,
  setWindowHandler,
  intialWindw,
  initial__token,
}) => {
  const [currentWindow, setCurrentWindow] = useState<SignUpWithUsernameWindows>(
    intialWindw ? intialWindw : INSERT_PHONE,
  );

  const setCurrentWindowHandler = (window: SignUpWithUsernameWindows) => {
    setCurrentWindow(window);
  };

  const goBackToInsertPhoneWindow = () => {
    setCurrentWindow(INSERT_PHONE);
  };

  const navigateToLoginPage = () => {
    setWindowHandler('login');
  };

  const windows: Record<SignUpWithUsernameWindows, ReactNode> = {
    INSERT_PHONE: (
      <InsertPhone
        setCurrentWindowHandler={setCurrentWindowHandler}
        navigateToLoginPage={navigateToLoginPage}
      />
    ),
    SEND_CODE: (
      <SendCode
        setCurrentWindowHandler={setCurrentWindowHandler}
        goBackToInsertPhoneWindow={goBackToInsertPhoneWindow}
        navigateToLoginPage={navigateToLoginPage}
      />
    ),
    FILL_DATA: <FillData initial__token={initial__token} />,
  };

  return (
    <TokenContextProvider>
      <Box
        additionalStyles={{
          minHeight: Math.floor(height) - 150,
        }}
      >
        {windows[currentWindow]}
      </Box>
    </TokenContextProvider>
  );
};
