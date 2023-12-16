import { TouchableOpacity } from "react-native";
import { Box } from "../../../../components/box";
import { Text } from "../../../../components/text";
import { Input } from "../../../../components/form";
import { theme } from "../../../../constaints/theme";
import { Button } from "../../../../components/button";
import { FC, useContext, useMemo } from "react";
import { LoginNavigationEvent } from "../types";
import { Controller, useForm } from "react-hook-form";
import { usernameLoginformStructure } from "./form-strucutre";
import { useSignInMutation } from "../../../../services/auth.service";
import { Toaster } from "../../../../utils/toaster";
import { tokenContext } from "../../../../context/token";
import { userContext } from "../../../../context/user";
import { User } from "../../../../types/user";

type Props = {
  loginNavigationEventsHandler: LoginNavigationEvent;
};

const _toaster = new Toaster();

export const UserPass: FC<Props> = ({ loginNavigationEventsHandler }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [_loginHandler, { isLoading, isFetching }] = useSignInMutation();

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  const onSubmit = async (data: any) => {
    const requestBody = {
      password: data.password,
      username: data.username.toLowerCase()
    }

    const response = await _loginHandler({ body: requestBody });

    if (response?.data) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { token, user } = response?.data;
      saveDataToContext(token, user);
    }

    if (response?.error) {
      _toaster.show(response?.error?.data?.message);
    }
  };

  const saveDataToContext = async (token: string, user: User) => {
    await userCtx.setUser(user);
    await tokenCtx.setToken(token);
  };

  const renderForm = useMemo(() => {
    return usernameLoginformStructure.map((f: any, index: number) => {
      return (
        <Box width="100%" marginBottom={index === 0 ? 16 : 0} key={f.id}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={f.placeholder}
                labelText={f.labelText}
                onBlur={onBlur}
                onChangeText={(value: any) => {
                  onChange(value || "");
                }}
                value={value}
                hasError={errors?.[f.name] ? true : false}
                additionalProps={{
                  inputMode: f.type,
                  secureTextEntry: f.type === "password" ? true : false,
                }}
              />
            )}
            name={f.name}
            rules={f.validators}
          />
        </Box>
      );
    });
  }, [errors]);

  return (
    <>
      <Box paddingBottom={32} flex={1} width="100%" alignItems="center">
        <Box
          position="relative"
          flex={1}
          width="100%"
          // marginTop='51%'
          marginTop={175}
          alignItems="center"
        >
          <Text
            color={theme.color.light.WHITE}
            lineHeight={20}
            fontSize={12}
            fontWeight={600}
          >
            Insert your username to login
          </Text>
          <Box width="100%" marginTop={32}>
            {renderForm}
          </Box>

          <Box marginTop={32}>
            <TouchableOpacity
              onPress={loginNavigationEventsHandler.navigateToEmailLogin}
            >
              <Text
                lineHeight={16}
                fontWeight={400}
                fontSize={12}
                color={theme.color.light.LIGHT_DESCRIPTION}
              >
                Login with email
              </Text>
            </TouchableOpacity>
          </Box>
          <Box marginTop={8}>
            <TouchableOpacity
              onPress={loginNavigationEventsHandler.navigateToPhoneLogin}
            >
              <Text
                lineHeight={16}
                fontWeight={400}
                fontSize={12}
                color={theme.color.light.LIGHT_DESCRIPTION}
              >
                Log in with phone
              </Text>
            </TouchableOpacity>
          </Box>
          <Box width="100%" alignItems="center" position="absolute" bottom={2}>
            <Text
              color={theme.color.light.LIGHT_DESCRIPTION}
              lineHeight={20}
              fontSize={12}
              fontWeight={600}
              marginBottom={24}
            >
              Dont have an account?{" "}
              <Text color={theme.color.light.PRIMARY}>Signup</Text>
            </Text>
            <Button
              text="Log in"
              varient="muted"
              size="sm"
              isLoading={isLoading || isFetching}
              onpressHandler={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

