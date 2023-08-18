import { useState, ReactNode } from 'react';
import { PaddingContainer } from '../../../../styles/grid';
import { Box } from '../../../../components/box';
import { windowSize } from '../../../../utils/window-size';
import { AuthWindows, INSERT_PHONE, LoginWindows } from '../types';
import { InsertPhone } from './insert-phone';
import { SendCode } from './send-code';
import { UserPass } from './user-pass';

type Props = {
    setWindowHandler: (window: AuthWindows) => void;
};

const { height } = windowSize();

export function Login({ setWindowHandler }: Props) {
    const [currentWindow, setCurrentWindow] =
        useState<LoginWindows>(INSERT_PHONE);

    // const setCurrentWindowHandler = (window: Partial<LoginWindows>) => {
    //     setCurrentWindow(window);
    // };

    const windows: Record<LoginWindows, ReactNode> = {
        INSERT_PHONE: <InsertPhone setWindowHandler={setWindowHandler} />,
        SEND_CODE: <SendCode setWindowHandler={setWindowHandler} />,
        USER_PASS: <UserPass />
    };
    return (
        <PaddingContainer>
            <Box
                additionalStyles={{
                    minHeight: Math.floor(height) - 150
                }}
            >
                {windows[currentWindow]}
            </Box>
        </PaddingContainer>
    );
}
