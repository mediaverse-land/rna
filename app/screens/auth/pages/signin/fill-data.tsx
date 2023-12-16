import { FC, useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box } from '../../../../components/box';
import { Input } from '../../../../components/form';
import { Text } from '../../../../components/text';
import { theme } from '../../../../constaints/theme';
import { tokenContext } from '../../../../context/token';
import { StorageService } from '../../../../services/storage.service';
import { userContext } from '../../../../context/user';
import { signupContext } from './context';
import { Button } from '../../../../components/button';
import { SignupCompleteionBody, signupCompeletionApiHandler } from './service';

const fillDataForm = [
  {
    id: 1,
    placeholder: 'Insert username...',
    labelText: 'Username',
    required: true,
    name: 'username',
    validators: {
      required: 'This field is required',
    },
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
        value: 8,
      },
    },
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
    name: 'first_name',
  },
  {
    id: 7,
    placeholder: 'Insert last name...',
    labelText: 'Last name',
    required: false,
    name: 'last_name',
  },
];

type Props = {
  initial__token: string;
};

const _storageService = new StorageService();

export const FillData: FC<Props> = ({ initial__token }: Props) => {
  const { getToken, getPhoneNumber } = useContext(signupContext);

  const phoneNumber = getPhoneNumber();

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const tokenCtx = useContext(tokenContext);

  const [isLoading, setIsLoading] = useState(false);

  const userCtx = useContext(userContext);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    clearErrors();

    const formattedData: Partial<SignupCompleteionBody> | any = {};

    for (const item in data) {
      if (typeof item !== 'undefined') {
        formattedData[item] = data[item];
      }
    }

    const newFormattedData = {
      ...formattedData,
      username: data.username.toLowerCase(),
    };

    const token = getToken();

    if (!token && !initial__token) {
      return;
    }

    if (initial__token) {
      await _storageService.set('user_data', initial__token);
    }
    if (token) {
      await _storageService.set('user_data', token);
    }

    const { isError, isSuccess, res, errorRes } = await signupCompeletionApiHandler(
      newFormattedData,
      initial__token || token,
    );

    if (errorRes) {
      showErrors(errorRes);
      setIsLoading(false);
      return;
    }

    if (isError || !isSuccess) {
      setIsLoading(false);
      return;
    }

    await userCtx.setUser(res.data);
    setIsLoading(false);

    if (initial__token) {
      await tokenCtx.setToken(initial__token);
    }
    if (token) {
      await tokenCtx.setToken(token);
    }
  };

  const showErrors = (errors: any) => {
    const errorMessage: string = errors?.error;
    if (errorMessage) {
      if (
        errorMessage === 'The username format is invalid.' ||
        errorMessage === 'The username has already been taken.'
      ) {
        setError('username', {});
      }
      if (errorMessage.includes('password')) {
        setError('password', {});
      }
    }
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
              onChangeText={(value: string) => {
                onChange(value || '');
              }}
              value={value}
              hasError={errors?.[f.name] ? true : false}
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
      <Box position="relative" flex={1} width="100%" alignItems="center">
        <Text
          color={theme.color.light.WHITE}
          lineHeight={20}
          fontSize={12}
          fontWeight={600}
          marginBottom={32}
        >
          We send the code to +98{phoneNumber}
        </Text>
        <Box width="100%">{renderForm}</Box>
        <Box position="absolute" bottom={10} width="100%" alignItems="center">
          <Button
            text="Save"
            varient="primary"
            onpressHandler={handleSubmit(onSubmit)}
            size="lg"
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};
