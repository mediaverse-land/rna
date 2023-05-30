import { useState, ReactNode } from 'react';
import { Box } from '../../../../shared/components/box';
import { PaddingContainer } from '../../../../styles/grid';
import { windowSize } from '../../../../utils/window-size';
import { SignUpWithProvider } from './signup-width-provider';
import { SignUpWithUsername } from './signup-with-username';
import {
    SIGNUP_WITH_USERNAME,
    SINGUP_WITH_PROVIDER,
    SignupWindows
} from '../types';

const { height } = windowSize();

export function Signin() {
    const [signUpCurrentWindow, setSigUpCurrentWindow] =
        useState<SignupWindows>(SINGUP_WITH_PROVIDER);

    const setSIgnupWithUsernameHandler = () => {
        setSigUpCurrentWindow(SIGNUP_WITH_USERNAME);
    };

    const currentWindow: Record<SignupWindows, ReactNode> = {
        SINGUP_WITH_PROVIDER: (
            <SignUpWithProvider
                height={height}
                setSIgnupWithUsernameHandler={setSIgnupWithUsernameHandler}
            />
        ),
        SIGNUP_WITH_USERNAME: <SignUpWithUsername height={height} />
    };

    return (
        <Box flex={1} paddingBottom={20}>
            <PaddingContainer>
                {currentWindow[signUpCurrentWindow]}
            </PaddingContainer>
        </Box>
    );
}
