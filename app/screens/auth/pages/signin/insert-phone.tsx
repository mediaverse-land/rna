import { useState, useEffect, useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Box } from '../../../../components/box';
import { Text } from '../../../../components/text';
import { Input } from '../../../../components/form';
import { ICON_FRANCE_FLAG } from '../../../../constaints/icons';
import { theme } from '../../../../constaints/theme';
import { removeZeroFromPhoneNumber } from '../../../../utils/remove-zere-from-pone-number';
import { requestCodeApiHandler } from './service';
import { signupContext } from './context';
import { Button } from '../../../../components/button';

const validators = {
    required: 'This field is required',
    minLength: {
        value: 10,
        message: 'Should be more than 9 chars'
    },
    maxLength: {
        value: 11,
        message: 'Should be less than 12 chars'
    }
};

export const InsertPhone = ({
    setCurrentWindowHandler,
    navigateToLoginPage
}: any) => {
    const {
        control,
        setError,
        clearErrors,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm();

    const signUpCtx = useContext(signupContext);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const defaultPhoneNumber = signUpCtx.getPhoneNumber();
        if (defaultPhoneNumber) {
            setValue('phone_number', defaultPhoneNumber);
        }
    }, []);

    const onSubmit = async (data) => {
        setIsLoading(true);

        const { phone_number } = data;

        signUpCtx.setPhoneNumber(phone_number);

        const formattedPhoneNumber = removeZeroFromPhoneNumber(phone_number);

        const { res, isError, isSuccess } = await requestCodeApiHandler(
            formattedPhoneNumber
        );

        if (isError || !isSuccess) {
            setError('phone_number', {});
            return;
        }

        clearErrors('phone_number');

        const { data: requestData } = res;

        if (res) {
            signUpCtx.setExpireTime(requestData.expires_after);

            setTimeout(() => {
                setIsLoading(false);
                setCurrentWindowHandler('SEND_CODE');
            }, 1000);
        }
    };

    return (
        <Box flex={1} alignItems="center">
            <Box position="relative" top={'27%'} alignItems="center">
                <Text
                    color={theme.color.light.WHITE}
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                    marginBottom={40}
                >
                    Insert your number for loging in.
                </Text>
                <Box width="100%" position="relative">
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder="your number..."
                                labelText="+33"
                                labelIcon={
                                    <ICON_FRANCE_FLAG style={styles.flagIcon} />
                                }
                                onBlur={onBlur}
                                onChangeText={(value) => {
                                    onChange(value || '');
                                }}
                                value={value}
                                hasError={
                                    errors?.['phone_number'] ? true : false
                                }
                                additionalProps={{
                                    inputMode: 'numeric'
                                }}
                            />
                        )}
                        name={'phone_number'}
                        rules={validators}
                    />
                </Box>
            </Box>
            <Box
                position="absolute"
                bottom={10}
                width="100%"
                alignItems="center"
            >
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={navigateToLoginPage}
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
                </TouchableOpacity>
                <Button
                    text="Save"
                    varient="muted"
                    onpressHandler={handleSubmit(onSubmit)}
                    isLoading={isLoading}
                />
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    flagIcon: {
        width: 25,
        height: 18,
        marginTop: 10,
        paddingTop: 10,
        position: 'relative',
        top: 5
    },
    fullWidth: {
        width: '100%'
    }
});
