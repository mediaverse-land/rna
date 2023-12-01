import { useEffect, useContext, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "../../../../components/form";
import { ScreenGradient } from "../../../../components/screen-gradient";
import { PaddingContainer } from "../../../../styles/grid";
import { Box } from "../../../../components/box";
import { windowSize } from "../../../../utils/window-size";
import { SettingsScreenTitle } from "../../components/title";
import { Button } from "../../../../components/button";
import { updateProfileApiHandler } from "../../service";
import { generalInfoFormStructure } from "../form-structure";
import { tokenContext } from "../../../../context/token";
import { userContext } from "../../../../context/user";
import { useForm, Controller } from "react-hook-form";
import { tokenStringResolver } from "../../../../utils/token-string-resolver";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { Toaster } from "../../../../utils/toaster";

const { width } = windowSize();

const _toaster = new Toaster();

export function GeneralInformationPage() {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  const user = userCtx.getUser();

  useEffect(() => {
    getDefaultUserData();
  }, [user]);

  const getDefaultUserData = () => {
    const { first_name, last_name, email } = user;

    setFormValues(first_name, last_name, email);
  };

  const updateData = async (token: string, updateBody: any) => {
    const { res, isSuccess, isError, errorRes } = await updateProfileApiHandler(
      token,
      updateBody
    );


    if (isError || !isSuccess || errorRes) {
      _toaster.show(errorRes?.message)
      return;
    }

    if (!res.data) {
      return;
    }

    const { first_name, last_name, email } = res.data;

    setFormValues(first_name, last_name, email);

    await userCtx.updateUser();
  };

  const onUpdateSubmit = async (data: string) => {
    setIsLoading(true);
    const { first_name, last_name, email }: any = data;

    const token = await tokenCtx.getToken();
    const formattedToken = await tokenStringResolver(token);

    const updateBody = {
      first_name,
      last_name,
      email,
    };

    if (token !== null) {
      await updateData(formattedToken, updateBody);
    }

    setIsLoading(false);
  };

  const setFormValues = (
    first_name: string,
    last_name: string,
    email: string
  ) => {
    setValue("first_name", first_name);
    setValue("last_name", last_name);
    setValue("email", email);
  };
  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isFocused ? (
        <StatusBar backgroundColor={"#030340"} barStyle="light-content" />
      ) : null}
      <ScreenGradient>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          {/* header */}
          <PaddingContainer>
            <SettingsScreenTitle title="General Information" />
            {/* form */}
            <Box flex={1} width="100%" paddingTop={72}>
              {generalInfoFormStructure.map((form) => (
                <Box key={form.id} marginBottom={16}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder={form.placeholder}
                        labelText={form.labelText}
                        hasError={errors?.[form.name] ? true : false}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                    )}
                    name={form.name}
                    rules={form.validators}
                  />
                </Box>
              ))}
            </Box>
            <Box width={"100%"} height={100}></Box>
          </PaddingContainer>
        </ScrollView>
        <Box position="absolute" bottom={20} marginTop={20}>
          <Button
            varient="primary"
            width={Math.floor(width) - 48}
            text="Save"
            size="sm"
            onpressHandler={handleSubmit(onUpdateSubmit)}
            isLoading={isLoading}
          />
        </Box>
      </ScreenGradient>
    </SafeAreaView>
  );
}
