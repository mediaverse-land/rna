import { FC, useContext, useState } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Box } from '../../../../shared/components/box';
import { Input } from '../../../../shared/components/form';
import { Text } from '../../../../shared/components/text';
import { theme } from '../../../../constaints/theme';
import { useForm, Controller } from 'react-hook-form';
import { SignupCompleteionBody } from './service';
import { tokenContext } from '../../../../context/token';
import { LoadingSpinner } from '../../../../shared/components/loader-spinner';

const fillDataForm = [
    {
        id: 1,
        placeholder: 'Insert username...',
        labelText: 'Username',
        required: true,
        name: 'username',
        validators: {
            required: 'This field is required',
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
    },
    // {
    //     id: 5,
    //     placeholder: 'Repet password...',
    //     labelText: 'Repet Password',
    //     required: true,
    //     name: 'repeat_password'
    // },
    {
        id: 6,
        placeholder: 'Insert first name...',
        labelText: 'First name',
        required: false,
        name: 'first_name'
    },
    {
        id: 7,
        placeholder: 'Insert last name...',
        labelText: 'Last name',
        required: false,
        name: 'last_name'
    }
];
type Props = {
    token: string;
}

export const FillData: FC<Props> = () => {
    // const navigation = useNavigation<UseNavigationType>();

    const tokenCtx = useContext(tokenContext)

    const [isLoading, setIsLoading] = useState(false)

    const { handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);

        const formattedData: Partial<SignupCompleteionBody> = {};

        for (const item in data) {
            if (typeof item !== 'undefined') {
                formattedData[item] = data[item];
            }
        }

        // const { res, isSuccess, isError } = await signupCompeletionApiHandler(formattedData, token);
        setIsLoading(false);

        tokenCtx.setToken("b9cf4aa3755763531498babf1dd18b212d28373491e74b9b8dac0873bd08033978d3135c1225cb3db8bc210fef457afce496fb2eee7a99b4a46cd3fec500fc12");

    };

    const renderForm = fillDataForm.map((f) => {
        return (
            <Box width="100%" marginBottom={16} key={f.id}>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            placeholder={f.placeholder}
                            labelText={f.labelText}
                            onBlur={onBlur}
                            onChangeText={value => {
                                onChange(value || "")
                            }}
                            value={value}
                            hasError={errors?.[f.name] ? true : false}
                        />
                    )}
                    name={f.name}
                    rules={f.validators}
                />
            </Box>
        )
    })

    return (
        <Box flex={1} width="100%" alignItems="center">
            <Box position="relative" width="100%" alignItems="center">
                <Text
                    color={theme.color.light.WHITE}
                    lineHeight={20}
                    fontSize={12}
                    fontWeight={600}
                    marginBottom={32}
                >
                    We send the code to +339012910407
                </Text>
                <Box width='100%'>
                    {renderForm}
                </Box>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.fullWidth}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Box
                        width="100%"
                        height={48}
                        backgroundColor={theme.color.light.PRIMARY}
                        borderRadius={32}
                        alignItems="center"
                        justifyContent="center"
                        marginTop={24}
                    >
                        <Text
                            color={theme.color.light.WHITE}
                            fontWeight={600}
                            lineHeight={16}
                            fontSize={14}
                        >
                            {isLoading ? <LoadingSpinner color='red' /> : 'Save'}
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
}

const styles = StyleSheet.create({
    fullWidth: {
        width: '100%'
    }
});
