import {  useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { ScreenGradient } from "../../../../components/screen-gradient";
import { FileSystemController } from "../../../../controllers/file-system.controller";
import { CustomSafeArea } from "../../../../components/custom-safe-area";
import { windowSize } from "../../../../utils/window-size";
import { TopToolbar } from "../../component/top-toolbar";
import { Box } from "../../../../components/box";
import { PaddingContainer } from "../../../../styles/grid";
import { Input } from "../../../../components/form";
import { NoteBook } from "../../component/notebook";
import { VirtualizedList } from "../../../../components/virtualized-list";
import { BottomTabBar } from "../../component/bottom-tab-bar";
import { CREATE_TEXT } from "../../constaints";
import { UseNavigationType } from "../../../../types/use-navigation";
import { theme } from "../../../../constaints/theme";
import { AppDispatch, RootState } from "../../../../store";
import { setFileBase64, setTitle } from "../../../../slices/plus.slice";

const _fileSystemController = new FileSystemController();

const { width } = windowSize();

export const CreateTextScreen = () => {
  const [contentText, setContetText] = useState<string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<UseNavigationType>();
  const dispatch = useDispatch<AppDispatch>();

  const { title } = useSelector((state: RootState) => state.plusSlice);

  const { top } = useSafeAreaInsets();

  const _submitButtonHandler = async () => {
    if (!contentText || !title) {
      return;
    }
    setIsLoading(true);

    const base64Content = await convertTextToBase64(contentText);

    if (!base64Content) {
      setIsLoading(false);
      return;
    }

    const base64ContentDataUri = `data:text/plain;base64,${base64Content}`;
    dispatch(setFileBase64(base64ContentDataUri));

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("addAssetMetadata");
    }, 1000);
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  const convertTextToBase64 = async (str: string) => {
    try {
      return await _fileSystemController.convertTextToBase64(str);
    } catch (err) {
      console.log(err);
    }
  };

  const updateTitleHandler = (str: string) => {
    dispatch(setTitle(str));
  };

  const input = (
    <Input
      placeholder="your title"
      varient="flat-dark"
      defaultValue={title}
      onChangeText={updateTitleHandler}
    />
  );

  return (
    <CustomSafeArea>
      <ScreenGradient colors={theme.gradients.PLUS_PAGE_GRADIENT}>
        <VirtualizedList>
          <Box id="scroll-wrapper" flex={1} width={width} marginTop={top}>
            <TopToolbar goBackHandler={goBackHandler} />
            <PaddingContainer>
              <Box id="main" marginTop={76}>
                {input}
                <NoteBook setCaptionText={setContetText} />
              </Box>
            </PaddingContainer>
          </Box>
        </VirtualizedList>
        <BottomTabBar
          currentPage={CREATE_TEXT}
          navigation={navigation}
          submitButtonHandler={_submitButtonHandler}
          isLoading={isLoading}
        />
      </ScreenGradient>
    </CustomSafeArea>
  );
};

// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { UseNavigationType } from "../../../../types/use-navigation";
// import { BottomTabBar } from "../../component/bottom-tab-bar";
// import { useNavigation, useIsFocused } from "@react-navigation/native";
// import { ScreenGradient } from "../../../../components/screen-gradient";
// import { CREATE_TEXT } from "../../constaints";
// import { createTextFormStructure } from "./form-structure";
// import { FileSystemController } from "../../../../controllers/file-system.controller";
// import { useContext, useEffect, useState } from "react";
// import { tokenContext } from "../../../../context/token";
// import { userContext } from "../../../../context/user";
// import { tokenStringResolver } from "../../../../utils/token-string-resolver";
// import { Toaster } from "../../../../utils/toaster";
// import { useCreateSingleTextMutation } from "../../../../services/single-text.service";
// import { REDIRECTED_FROM_CREATE_ASSET, SINGLE_TEXT_SCREEN } from "../../../../constaints/consts";
// import { CreateAssetForm } from "../../component/create-asset-form";
// import { Logger } from "../../../../utils/logger";
// import { GoBackButton } from "../../../single/components/goback-button";
// import { Box } from "../../../../components/box";

// const _fileSystemController = new FileSystemController();
// const _toast = new Toaster();
// const _logger = new Logger();

// export const CreateTextScreen = () => {
//   const {
//     handleSubmit,
//     control,
//     setValue,
//     reset,
//     resetField,
//     formState: { errors },
//   } = useForm();

//   const [createNewAsset, response] = useCreateSingleTextMutation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedOption, setSelectedOption] = useState<
//     Record<string, string | boolean>
//   >({
//     plan: "ownership",
//     forkability_status: true,
//   });

//   const _getSelectedOption = (option: Record<string, string | boolean>) => {
//     setSelectedOption(option);
//   };

//   const tokenCtx = useContext(tokenContext);
//   const userCtx = useContext(userContext);

//   const navigation = useNavigation<UseNavigationType>();

//   const isFocused = useIsFocused();

//   useEffect(() => {
//     if (!isFocused) {
//       reset();
//     }
//   }, [isFocused]);

//   const onSubmit = async (data: any) => {
//     if (isLoading) {
//       return;
//     }
//     const { file } = data;

//     // Generate base64 of text
//     const result = await _fileSystemController.convertTextToBase64(file);

//     const token = await retriveToken();
//     const userId = await retriveUserId();

//     const plans: any = {
//       free: 1,
//       ownership: 2,
//       subscription: 3,
//     };

//     const _plan: any = selectedOption.plan;

//     const options = {
//       token,
//       body: {
//         name: data.name,
//         user: userId,
//         plan: plans[_plan],
//         forkability_status: selectedOption.forkability_status ? 2 : 1,
//         price: selectedOption.plan !== "free" ? data.price : 0,
//         description: data.description,
//         type: 1,
//       },
//     };

//     let newBody: any = {
//       ...options.body,
//     };

//     if (selectedOption.plan === "subscription") {
//       newBody.subscription_period = data.subscription_period;
//     }

//     const removePriceIfPlanFree = () => {
//       if(newBody?.plan === 1){
//         delete newBody.price;
//       }
//     }
//     removePriceIfPlanFree();

//     const newOption = {
//       token: options.token,
//       body: newBody,
//     };

//     setIsLoading(true);
//     createNewAsset(newOption)
//       .then(async (res: any) => {
//         _logger.log(res);
//         const asset_id = res?.data?.asset_id;

//         if (!asset_id) {
//           setIsLoading(false);
//           _toast.show(res?.error?.data?.message || "Something went wrong, try again");
//           return;
//         }

//         const id = res?.data?.id;

//         await uploadHandler(token, asset_id, result, id);
//       })
//       .catch((err: any) => {
//         setIsLoading(false);
//         _logger.log(err);
//       });
//   };

//   const uploadHandler = async (
//     token: string,
//     asset_id: number,
//     file: string,
//     id: number
//   ) => {
//     if (!file) {
//       _logger.logErro("no file");
//       return;
//     }
//     try {
//       const formData = new FormData();

//       formData.append("file", `data:text/plain;base64,${file}`);
//       formData.append("asset", asset_id.toString());

//       const config = {
//         headers: {
//           "Content-type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//           "X-App": "_Android",
//         },
//       };

//       const result = await axios.post(
//         `${process.env.process.env.EXPO_APPBASE_URL}/files`,
//         formData,
//         config
//       );

//       _toast.show("Item created successfully");
//       setIsLoading(false);
//       if (reset) {
//         navigation?.navigate(SINGLE_TEXT_SCREEN, {
//           id,
//           ORIGIN: REDIRECTED_FROM_CREATE_ASSET,
//         });
//       }
//     } catch (err) {
//       _toast.show("Item creation failed");
//       setIsLoading(false);
//     }
//   };

//   const retriveToken = async (): Promise<null | string> => {
//     const token = await tokenCtx.getToken();

//     if (token === null) {
//       return null;
//     }

//     const formattedToken = tokenStringResolver(token);
//     return formattedToken;
//   };

//   const retriveUserId = async (): Promise<null | number> => {
//     const { id } = await userCtx.getUser();

//     if (!id) {
//       return null;
//     }
//     return id;
//   };

//   const _submitButtonHandler = async () => {};

//   // const goBackHandler = () => {
//   //   reset();
//   //   navigation.goBack();
//   // };

//   return (
//     <ScreenGradient>
//       <CreateAssetForm
//         formStructure={createTextFormStructure}
//         onSubmitHandler={onSubmit}
//         isLoading={isLoading}
//         _getSelectedOption={_getSelectedOption}
//       />
//       {isFocused ? (
//         <BottomTabBar
//           currentPage={CREATE_TEXT}
//           navigation={navigation}
//           submitButtonHandler={_submitButtonHandler}
//         />
//       ) : null}
//     </ScreenGradient>
//   );
// };
