import { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Box } from '../../../../components/box';
import { Text } from '../../../../components/text';
import { Input } from '../../../../components/form';
import { theme } from '../../../../constaints/theme';
import { formatTime } from '../../../../utils/format-time';
import { removeZeroFromPhoneNumber } from '../../../../utils/remove-zere-from-pone-number';
import { submitCodeApiHandler } from './service';
import { signupContext } from './context';
import { Button } from '../../../../components/button';

const validators = {
    required: 'This field is required',
    minLength: {
        value: 6,
        message: 'Should be 6 chars'
    },
    maxLength: {
        value: 6,
        message: 'Should be 6 chars'
    }
};

export const SendCode = ({
    setCurrentWindowHandler,
    goBackToInsertPhoneWindow,
    navigateToLoginPage
}: any) => {
    const {
        control,
        setError,
        clearErrors,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { getPhoneNumber, getExpireTime, setToken } =
        useContext(signupContext);

    const [isLoading, setIsLoading] = useState(false);
    const [countDownNumber, setCountDownNumber] = useState(Number);

    useEffect(() => {
        const countDown = getExpireTime();
        if (!countDown) {
            return;
        }

        setCountDownNumber(parseInt(countDown));

        const interval = setInterval(() => {
            setCountDownNumber((cDown) => {
                if (cDown === 0) {
                    clearInterval(interval);
                    return;
                }
                return cDown - 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const phoneNumber = getPhoneNumber();

    const submitOtpCodeHandler = async (data: any) => {
        setIsLoading(true);

        const { otp_code } = data;

        if (isLoading || !otp_code || !phoneNumber) return;

        const phoneInputValue = removeZeroFromPhoneNumber(phoneNumber);
        const { isError, isSuccess, res, errorRes } = await submitCodeApiHandler(
            phoneInputValue,
            otp_code
        );

        if (isError || !isSuccess) {
            setIsLoading(false);
            setError('otp_code', {});
            return;
        }
        clearErrors('otp_code');

        setToken(res.data.token);
        setCurrentWindowHandler('FILL_DATA');
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const { minute, second } = formatTime(countDownNumber);

    return (
        <>
            <Box flex={1} alignItems="center">
                <Box position="relative" top={'27%'} alignItems="center">
                    <Text
                        color={theme.color.light.WHITE}
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                    >
                        We send the code to {`+98${phoneNumber}`}
                    </Text>

                    <Box width="100%" marginTop={40} position="relative">
                        <Controller
                            control={control}
                            render={({
                                field: { onChange, onBlur, value }
                            }) => (
                                <Input
                                    placeholder="your number..."
                                    labelText="Code"
                                    onBlur={onBlur}
                                    onChangeText={(value: string) => {
                                        onChange(value || '');
                                    }}
                                    value={value}
                                    hasError={
                                        errors?.['otp_code'] ? true : false
                                    }
                                    additionalProps={{
                                        inputMode: 'numeric'
                                    }}
                                />
                            )}
                            name={'otp_code'}
                            rules={validators}
                        />
                        <Box
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            paddingTop={16}
                        >
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={goBackToInsertPhoneWindow}
                            >
                                <Text
                                    color={theme.color.light.LIGHT_DESCRIPTION}
                                    lineHeight={20}
                                    fontSize={12}
                                    fontWeight={600}
                                    marginBottom={24}
                                >
                                    Wrong number?
                                </Text>
                            </TouchableOpacity>
                            <Text
                                color={theme.color.light.LIGHT_DESCRIPTION}
                                lineHeight={20}
                                fontSize={12}
                                fontWeight={600}
                                marginBottom={24}
                            >
                                {typeof countDownNumber === 'number' ? (
                                    <Text>
                                        {minute}:{second}
                                    </Text>
                                ) : null}
                            </Text>
                        </Box>
                    </Box>
                </Box>
                <Box
                    width="100%"
                    alignItems="center"
                    position="absolute"
                    bottom={2}
                >
                    <TouchableOpacity onPress={navigateToLoginPage}>
                        <Text
                            color={theme.color.light.LIGHT_DESCRIPTION}
                            lineHeight={20}
                            fontSize={12}
                            fontWeight={600}
                            marginBottom={24}
                        >
                            Have an account?
                            <Text color={theme.color.light.PRIMARY}>
                                {' '}
                                Log in
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    <Button
                        text="Save"
                        varient="muted"
                        onpressHandler={handleSubmit(submitOtpCodeHandler)}
                        isLoading={isLoading}
                    />
                </Box>
            </Box>
        </>
    );
};
