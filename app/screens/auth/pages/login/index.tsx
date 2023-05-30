import { useState, ReactNode } from 'react';
import { PaddingContainer } from '../../../../styles/grid';
import { Box } from '../../../../shared/components/box';
import { windowSize } from '../../../../utils/window-size';
import { INSERT_PHONE, LoginWindows } from '../types';
import { InsertPhone } from './insert-phone';
import { SendCode } from './send-code';
import { UserPass } from './user-pass';

const { height } = windowSize();

export function Login() {
    const [currentWindow, setCurrentWindow] =
        useState<LoginWindows>(INSERT_PHONE);

    const setCurrentWindowHandler = (window: Partial<LoginWindows>) => {
        setCurrentWindow(window);
    };

    const windows: Record<LoginWindows, ReactNode> = {
        INSERT_PHONE: (
            <InsertPhone setCurrentWindowHandler={setCurrentWindowHandler} />
        ),
        SEND_CODE: <SendCode />,
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
