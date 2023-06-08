import { FC, ReactNode, useState } from 'react';
import { SendCode } from './send-code';
import { InsertPhone } from './insert-phone';
import { FillData } from './fill-data';
import { Box } from '../../../../shared/components/box';
import type { SignUpWithUsernameWindows } from '../types';
import { FILL_DATA, INSERT_PHONE } from '../types';
import { requestCodeApiHandler, submitCodeApiHandler } from './service';
import { removeZeroFromPhoneNumber } from '../../../../utils/remove-zere-from-pone-number';

type Props = {
    height: number;
    goBackToSigninWindow: () => void;
};

export const SignUpWithUsername: FC<Props> = ({ height }) => {
    const [currentWindow, setCurrentWindow] =
        useState<SignUpWithUsernameWindows>(FILL_DATA);

    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string>(null);
    const [countDownTime, setCountDownTime] = useState<number>(null);
    const [otpCode, setOtpCode] = useState<string | number>(null);
    const [token, setToken] = useState<string>(null);

    const [phoneError, setPhoneError] = useState(false);
    const [codeError, setCodeError] = useState(false)

    const setCurrentWindowHandler = (window: SignUpWithUsernameWindows) => {
        setCurrentWindow(window);
    };



    const submitRequestCodeHandler = async () => {
        if (isLoading || !phoneNumber) return;
        if (phoneNumber.trim().length !== 10) return;

        load();

        const phoneInputValue = removeZeroFromPhoneNumber(phoneNumber);

        const {
            res,
            isError,
            isSuccess,
        } = await requestCodeApiHandler(phoneInputValue);

        if (isError || !isSuccess) {
            stopLoadingAfterOneSec();
            setPhoneError(true);
            return;
        }

        const { data, status } = res;

        setCountDownTime(data.expires_after)
        status === 200 && stopLoadingAfterOneSec(() => setCurrentWindowHandler('SEND_CODE'))
        stopLoadingAfterOneSec();
    }

    const submitOtpCodeHandler = async () => {
        if (isLoading || !otpCode) return;

        load();

        const phoneInputValue = removeZeroFromPhoneNumber(phoneNumber);
        const {
            isError,
            isSuccess,
            res,
        } = await submitCodeApiHandler(phoneInputValue, otpCode);

        if (isError || !isSuccess) {
            stopLoadingAfterOneSec();
            return;
        }
        setToken(res.data.token)
        stopLoadingAfterOneSec();
        setCurrentWindowHandler('FILL_DATA');
    }

    const stopLoadingAfterOneSec = (customHandler?:
        (param?: SignUpWithUsernameWindows) => void) => {
        setTimeout(() => {
            setIsLoading(false);
            customHandler && customHandler()
        }, 1000);
    }

    const setPhoneNumberHandler = (phoneNumber: string) => {
        setPhoneNumber(phoneNumber)
    }

    const goBackToInsertPhoneWindow = () => {
        setCurrentWindow(INSERT_PHONE)
    }

    const load = () => setIsLoading(true)

    const windows: Record<SignUpWithUsernameWindows, ReactNode> = {
        INSERT_PHONE:
            <InsertPhone
                submitHandler={submitRequestCodeHandler}
                setPhoneNumberHandler={setPhoneNumberHandler}
                phoneNumber={phoneNumber}
                setPhoneError={setPhoneError}
                isLoading={isLoading}
                phoneError={phoneError}
            />,
        SEND_CODE:
            <SendCode
                countDown={countDownTime}
                phoneNumber={phoneNumber}
                goBackToInsertPhoneWindow={goBackToInsertPhoneWindow}
                setOtpCode={setOtpCode}
                submitOtpCodeHandler={submitOtpCodeHandler}
                isLoading={isLoading}
                codeError={codeError}
                setCodeError={setCodeError}
            />,
        FILL_DATA:
            <FillData token={token} />
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
};
