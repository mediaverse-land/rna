import { FC, ReactNode, useState } from "react";
import { SendCode } from "./send-code";
import { InsertPhone } from "./insert-phone";
import { FillData } from "./fill-data";
import { Box } from "../../../../shared/components/box";
import type { SignUpWithUsernameWindows } from "../types";
import { INSERT_PHONE } from "../types";

type Props = {
    height: number
}

export const SignUpWithUsername: FC<Props> = ({ height }) => {
    const [currentWindow, setCurrentWindow] = useState<
        SignUpWithUsernameWindows
    >(INSERT_PHONE);

    const setCurrentWindowHandler = (
        window: SignUpWithUsernameWindows
    ) => {
        setCurrentWindow(window);
    };

    const windows: Record<
        SignUpWithUsernameWindows,
        ReactNode
    > = {
        INSERT_PHONE: (
            <InsertPhone
                setCurrentWindowHandler={setCurrentWindowHandler}
            />
        ),
        SEND_CODE: (
            <SendCode
                setCurrentWindowHandler={setCurrentWindowHandler}
            />
        ),
        FILL_DATA: (
            <FillData />
        )
    };
    return (
        <Box
            additionalStyles={{
                minHeight: Math.floor(height) - 150
            }}
        >
            {windows[currentWindow]}
        </Box>
    );
}
