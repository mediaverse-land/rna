import { FC, useContext, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ICON_FRANCE_FLAG } from '../../../../constaints/icons';
import { Box } from '../../../../components/box';
import { Input } from '../../../../components/form';
import { Text } from '../../../../components/text';
import { AuthWindows } from '../types';
import { theme } from '../../../../constaints/theme';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../../../../components/button';
import { tokenContext } from '../../../../context/token';
import { userContext } from '../../../../context/user';
import { signinApiHandler } from './service';
import { removeZeroFromPhoneNumber } from '../../../../utils/remove-zere-from-pone-number';

type Props = {
    setWindowHandler: (window: AuthWindows) => void;
};

const formStructure = [
    {
        id: 1,
        placeholder: 'Insert cellphone...',
        labelText: '+33',
        required: true,
        name: 'cellphone',
        type: 'numeric',
        validators: {
            required: 'This field is required'
        }
    },
    {
        id: 4,
        placeholder: 'Insert password...',
        labelText: 'Password',
        name: 'password',
        validators: {
            required: 'This field is required',
            minLength: {
                message: 'Password should be at least 8 characters',
                value: 8
            }
        }
    }
];

export const InsertPhone: FC<Props> = ({ setWindowHandler }) => {
    const {
        handleSubmit,
        control,
        setError,
        clearErrors,
        formState: { errors }
    } = useForm();

    const tokenCtx = useContext(tokenContext);

    const [isLoading, setIsLoading] = useState(false);

    const userCtx = useContext(userContext);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const navigateToSignupPage = () => {
        setWindowHandler('singin');
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        clearErrors();

        const formattedPhoneNumber = removeZeroFromPhoneNumber(data.cellphone);

        const newData = {
            cellphone: `+98${formattedPhoneNumber}`,
            password: data.password
        };

        // await tokenCtx.setToken('1544f8f3a8759a54a39fcb20d2488797aba5a645eae871263a1620aabfa16815a8d472525514c15a7473223878a4e1883587615d8eed125af68204c230325440');
        const { isError, isSuccess, res, errorRes } = await signinApiHandler(
            newData
        );

        if (errorRes) {
            showErrors(errorRes?.message);
            setIsLoading(false);
            return;
        }

        if (isError || !isSuccess) {
            setIsLoading(false);
            return;
        }

        const response = res.data;

        await userCtx.setUser(response.user);

        await tokenCtx.setToken(response.token);
        setIsLoading(false);
    };

    const showErrors = (errors: any) => {
        const errorMessage: string = errors?.error || errors;
        if (errorMessage) {
            if (
                errorMessage.includes('phone') ||
                errorMessage.includes('cellphone') ||
                errorMessage.includes('number')
            ) {
                setError('cellphone', {});
            }
            if (errorMessage.includes('password')) {
                setError('password', {});
            } else {
                setError('password', {});
                setError('cellphone', {});
            }
        }
    };

    const renderForm = formStructure.map((f) => {
        return (
            <Box width="100%" marginBottom={16} key={f.id}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder={f.placeholder}
                            labelText={f.labelText}
                            onBlur={onBlur}
                            onChangeText={(value) => {
                                onChange(value || '');
                            }}
                            value={value}
                            hasError={errors?.[f.name] ? true : false}
                            labelIcon={
                                f.name === 'cellphone' && (
                                    <ICON_FRANCE_FLAG style={styles.flagIcon} />
                                )
                            }
                            additionalProps={{
                                inputMode: f.type
                            }}
                        />
                    )}
                    name={f.name}
                    rules={f.validators}
                />
            </Box>
        );
    });

    return (
        <Box flex={1} width="100%" alignItems="center">
            <Box
                position="relative"
                flex={1}
                width="100%"
                marginTop={175}
                alignItems="center"
            >
                <Text
                    color={theme.color.light.WHITE}
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                    marginBottom={32}
                >
                    Insert your number and password to login
                </Text>
                <Box width="100%">{renderForm}</Box>
                <Box
                    width="100%"
                    alignItems="center"
                    position="absolute"
                    bottom={1}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={navigateToSignupPage}
                    >
                        <Text
                            color={theme.color.light.LIGHT_DESCRIPTION}
                            lineHeight={20}
                            fontSize={12}
                            fontWeight={600}
                            marginBottom={24}
                        >
                            Dont have an account?
                            <Text color={theme.color.light.PRIMARY}>
                                {' '}
                                Signup
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    <Button
                        varient="muted"
                        text="Signin"
                        isLoading={isLoading}
                        onpressHandler={handleSubmit(onSubmit)}
                    />
                </Box>
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    flagIcon: {
        width: 20,
        height: 10,
        position: 'relative',
        top: 4
    },
    fullWidth: {
        width: '100%'
    }
});

{
    /* <ICON_FRANCE_FLAG
style={styles.flagIcon}
/> */
}
