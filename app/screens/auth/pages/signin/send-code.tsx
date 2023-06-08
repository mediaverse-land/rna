import { FC, useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box } from '../../../../shared/components/box';
import { Text } from '../../../../shared/components/text';
import { Input } from '../../../../shared/components/form';
import { theme } from '../../../../constaints/theme';
import { formatTime } from '../../../../utils/format-time';
import { LoadingSpinner } from '../../../../shared/components/loader-spinner';

type Props = {
    countDown: number | null;
    phoneNumber: string,
    goBackToInsertPhoneWindow: () => void;
    setOtpCode: (otp: string) => void;
    submitOtpCodeHandler: () => void;
    isLoading: boolean,
    codeError: boolean,
    setCodeError: (hasError: boolean) => void;
};

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    }
});

export const SendCode: FC<Props> = ({
    submitOtpCodeHandler,
    countDown,
    phoneNumber,
    goBackToInsertPhoneWindow,
    setOtpCode,
    codeError,
    setCodeError,
    isLoading
}) => {
    const [countDownNumber, setCountDownNumber] = useState<number>(null);

    useEffect(() => {
        setCountDownNumber(countDown)

        const interval = setInterval(() => {
            setCountDownNumber((cDown) => {
                if (cDown === 0) {
                    clearInterval(interval)
                    return;
                }
                return cDown - 1
            });
        }, 1000)

        return () => {
            clearInterval(interval);
        }
    }, []);

    const { minute, second } = formatTime(countDownNumber)

    const onChangeTextHandler = (text) => {
        if (text.trim().length !== 6) {
            setCodeError(true)
        }
        else {
            setCodeError(false);
            setOtpCode(text);
        }
    }

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
                        We send the code to 0{phoneNumber}
                    </Text>

                    <Box width="100%" marginTop={40} position="relative">
                        <Input
                            placeholder="your number..."
                            labelText="Code"
                            onChangeText={(text) => onChangeTextHandler(text)}
                            hasError={codeError}
                            additionalProps={{
                                inputMode: 'numeric',
                            }}
                        />
                        <Box
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'
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
                                {typeof countDownNumber === 'number' ?
                                    <Text>
                                        {minute}
                                        :
                                        {second}
                                    </Text> : null
                                }
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
                    <Text
                        color={theme.color.light.LIGHT_DESCRIPTION}
                        lineHeight={20}
                        fontSize={12}
                        fontWeight={600}
                        marginBottom={24}
                    >
                        Have an account?
                        <Text color={theme.color.light.PRIMARY}> Log in</Text>
                    </Text>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.fullWidth}
                        onPress={submitOtpCodeHandler}
                    >
                        <Box
                            width="100%"
                            height={48}
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={32}
                            backgroundColor="rgba(78, 78, 97, 0.5)"
                        >
                            <Text
                                color={theme.color.light.WHITE}
                                lineHeight={20}
                                fontSize={12}
                                fontWeight={600}
                            >
                                {isLoading ? <LoadingSpinner color='red' /> : 'Send code'}
                            </Text>
                        </Box>
                    </TouchableOpacity>
                </Box>
            </Box>
        </>
    );
};



