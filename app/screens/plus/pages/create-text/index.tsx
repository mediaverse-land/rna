import { useForm } from "react-hook-form";
import axios from "axios";
import { UseNavigationType } from "../../../../types/use-navigation";
import { BottomTabBar } from "../../component/bottom-tab-bar";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { ScreenGradient } from "../../../../components/screen-gradient";
import { CREATE_TEXT } from "../../constaints";
import { createTextFormStructure } from "./form-structure";
import { FileSystemController } from "../../../../controllers/file-system-controller";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../../../../context/token";
import { userContext } from "../../../../context/user";
import { tokenStringResolver } from "../../../../utils/token-string-resolver";
import { Toaster } from "../../../../utils/toaster";
import { useCreateSingleTextMutation } from "../../../../services/single-text.service";
import { SINGLE_TEXT_SCREEN } from "../../../../constaints/consts";
import { CreateAssetForm } from "../../component/create-asset-form";

const _fileSystemController = new FileSystemController();
const _toast = new Toaster();

export const CreateTextScreen = () => {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = useForm();

  const [createNewAsset, response] = useCreateSingleTextMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    Record<string, string | boolean>
  >({
    plan: "ownership",
    forkability_status: true,
  });

  const _getSelectedOption = (option: Record<string, string | boolean>) => {
    setSelectedOption(option);
  };

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  const navigation = useNavigation<UseNavigationType>();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      reset();
    }
  }, [isFocused]);

  const onSubmit = async (data: any) => {
    if (isLoading) {
      return;
    }
    const { file } = data;

    // Generate base64 of text
    const result = await _fileSystemController.convertTextToBase64(file);

    const token = await retriveToken();
    const userId = await retriveUserId();

    const plans: any = {
      free: 1,
      ownership: 2,
      subscription: 3,
    };

    const _plan: any = selectedOption.plan;

    const options = {
      token,
      body: {
        name: data.name,
        user: userId,
        plan: plans[_plan],
        forkability_status:
          selectedOption.forkability_status ? 2: 1,
        price: selectedOption.plan !== "free" ? data.price : 0,
        description: data.description,
        type: 1,
      },
    };

    let newBody: any = {
      ...options.body,
    };

    if (selectedOption.plan === "subscription") {
      newBody.subscription_period = data.subscription_period;
    }

    const newOption = {
      token: options.token,
      body: newBody,
    };

    setIsLoading(true);
    createNewAsset(newOption)
      .then(async (res: any) => {
        console.log(res);
        const asset_id = res?.data?.asset_id;

        if (!asset_id) {
          setIsLoading(false);
          _toast.show("Something went wrong, try again");
          return;
        }

        const id = res?.data?.id;

        await uploadHandler(token, asset_id, result, id);
      })
      .catch((err: any) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const uploadHandler = async (
    token: string,
    asset_id: number,
    file: string,
    id: number
  ) => {
    if (!file) {
      console.log("no file");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("file", `data:text/plain;base64,${file}`);
      formData.append("asset", asset_id.toString());

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          "X-App": "_ReactNative",
        },
      };

      const result = await axios.post(
        `https://api.mediaverse.land/v2/files`,
        formData,
        config
      );

      _toast.show("Item created successfully");
      setIsLoading(false);
      if (reset) {
        navigation?.navigate(SINGLE_TEXT_SCREEN, {
          id,
        });
      }
    } catch (err) {
      _toast.show("Item creation failed");
      setIsLoading(false);
    }
  };

  const retriveToken = async (): Promise<null | string> => {
    const token = await tokenCtx.getToken();

    if (token === null) {
      return null;
    }

    const formattedToken = tokenStringResolver(token);
    return formattedToken;
  };

  const retriveUserId = async (): Promise<null | number> => {
    const { id } = await userCtx.getUser();

    if (!id) {
      return null;
    }
    return id;
  };

  const _submitButtonHandler = async () => {};

  const goBackHandler = () => {
    reset();
    navigation.goBack();
  };

  return (
    <ScreenGradient>
      <CreateAssetForm
        formStructure={createTextFormStructure}
        onSubmitHandler={onSubmit}
        isLoading={isLoading}
        _getSelectedOption={_getSelectedOption}
      />
      {isFocused ? (
        <BottomTabBar
          currentPage={CREATE_TEXT}
          navigation={navigation}
          submitButtonHandler={_submitButtonHandler}
        />
      ) : null}
    </ScreenGradient>
  );
};
