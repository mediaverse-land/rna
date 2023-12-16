import { useState, ReactNode } from 'react';
import { Box } from '../../../../components/box';
import { PaddingContainer } from '../../../../styles/grid';
import { windowSize } from '../../../../utils/window-size';
import { SignUpWithProvider } from './signup-width-provider';
import { SignUpWithUsername } from './signup-with-username';
import { AuthWindows, SIGNUP_WITH_USERNAME, SINGUP_WITH_PROVIDER, SignupWindows } from '../types';

const { height } = windowSize();

type Props = {
  goBackToSigninWindow: () => void;
  setWindowHandler: (window: AuthWindows) => void;
};

export function Signin({ goBackToSigninWindow, setWindowHandler }: Props) {
  const [shouldIndicateFillData, setShouldIndicateFillData] = useState<boolean>(null);
  const [initial__token, _setInitital__token] = useState<string>(null);

  const [signUpCurrentWindow, setSigUpCurrentWindow] =
    useState<SignupWindows>(SINGUP_WITH_PROVIDER);

  const setSIgnupWithUsernameHandler = () => {
    setSigUpCurrentWindow(SIGNUP_WITH_USERNAME);
  };

  const navigateToFillData = (tk: string) => {
    _setInitital__token(tk);
    setShouldIndicateFillData(true);
    setSigUpCurrentWindow(SIGNUP_WITH_USERNAME);
  };

  const currentWindow: Record<SignupWindows, ReactNode> = {
    SINGUP_WITH_PROVIDER: (
      <SignUpWithProvider
        height={height}
        setSIgnupWithUsernameHandler={setSIgnupWithUsernameHandler}
        navigateToFillData={navigateToFillData}
      />
    ),
    SIGNUP_WITH_USERNAME: (
      <SignUpWithUsername
        height={height}
        goBackToSigninWindow={goBackToSigninWindow}
        setWindowHandler={setWindowHandler}
        intialWindw={shouldIndicateFillData ? 'FILL_DATA' : null}
        initial__token={initial__token}
      />
    ),
  };

  return (
    <Box
      additionalStyles={{
        minHeight: height - 130,
      }}
      flex={1}
      paddingBottom={20}
    >
      <PaddingContainer>{currentWindow[signUpCurrentWindow]}</PaddingContainer>
    </Box>
  );
}
