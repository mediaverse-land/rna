import { Controller, useForm } from "react-hook-form";
import { EditScreenStyles } from "./style";
import { useContext, useEffect, useState } from "react";
import type { Image as ImageType } from "./../../types/image";
import { tokenContext } from "../../context/token";
import { useIsFocused } from "@react-navigation/native";
import { tokenStringResolver } from "../../utils/token-string-resolver";
import { SafeAreaView, ToastAndroid } from "react-native";
import { FocusedStatusBar } from "../../components/focused-statusbar";
import { ScreenGradient } from "../../components/screen-gradient";
import { VirtualizedList } from "../../components/virtualized-list";
import { RenderIf } from "../../components/render-if";
import { EditSubmitButton } from "./components/submit-button";
import { AssetThumbnail } from "../../components/asset-thumbnail";
import { Box } from "../../components/box";
import { updateImageFormStructure } from "./form-structure";
import { PaddingContainer } from "../../styles/grid";
import { Text } from "../../components/text";
import { RadioButton } from "../../components/form";
import { getAssetApiHandler, updateAssetApiHandler } from "./service";
import { userContext } from "../../context/user";

type Params = {
  id: number;
  assetType: "image" | "video" | "sound" | "text";
};

const { ThumbnailWrapper, EditableTitleInput, EditableInput } =
  EditScreenStyles;

export const EditScreen = ({ navigation, route }: any) => {
  const { id, assetType }: Params = route.params;


  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ImageType>(null);

  const [_selectedItems, _setSelecteItems] = useState<
    { plan: string; forkability_status: boolean } | any
  >({
    plan: "free",
    forkability_status: true,
  });

  const _tokenCtx = useContext(tokenContext);
  const _userCtx = useContext(userContext);

  const isFocuses = useIsFocused();

  useEffect(() => {
    if (isFocuses) {
      getData();
    }
  }, [isFocuses]);

  useEffect(() => {
    if (data) {
      const name = data?.name;
      const price = data?.asset?.price;
      const description = data?.description;

      setValue("name", name);
      setValue("description", description);
      setValue("price", price.toString() );


      const st: any = data?.asset?.forkability_status;

      const availablePlans: Record<number, string> = {
        1: "free",
        2: "ownership",
        3: "subscription",
      };
      const plan = data?.asset?.plan;
      _setSelecteItems({
        plan: availablePlans[plan],
        forkability_status: st === 2 ? true : false,
      });
    }
  }, [data]);

  const getData = async () => {
    setIsLoading(true);
    const token = await _tokenCtx.getToken();

    if (token === null) {
      setIsLoading(false);
      return;
    }

    const formattedToken = tokenStringResolver(token);

    await getSingleData(formattedToken);
  };

  const getSingleData = async (token: string) => {
    setIsLoading(true);

    const { isError, res } = await getAssetApiHandler(token,  id, assetType);

    if (isError) {
      setIsLoading(false);
      return;
    }
    if (res) {
      setData(res?.data);
    }

    setIsLoading(false);
  };

  const getSelectedItem = (value: string, field: string) => {
    _setSelecteItems({ ..._selectedItems, [field]: value });
  };
  const _onSubmit = async (_formData: any) => {
    const token = await _tokenCtx.getToken();

    if (token === null) {
      setIsLoading(false);

      return;
    }

    // "image" | "video" | "sound" | "text"
    const types = {
      text: 1,
      image: 2,
      sound: 3,
      video: 4,
    };

    const itemType = types[assetType];

    const userId = await _userCtx.getUser().id;
    const formattedToken = tokenStringResolver(token);

    const initFork = _selectedItems.forkability_status === true ? 2 : 1;


    const updatedData = {
      ..._formData,
      plan: _selectedItems.plan,
      forkability_status: initFork,
      // ..._selectedItems,
      user: userId,
      type: itemType,
    };

    const { res, isSuccess, isError, errorRes } = await updateAssetApiHandler(
      formattedToken,
      id,
      assetType,
      updatedData
    );
    console.log({res, isSuccess, isError, errorRes })
    if (isSuccess) {
      ToastAndroid.show("Asset edited successfully", ToastAndroid.BOTTOM);
      navigation?.goBack();
    }
    if (isError) {
      ToastAndroid.show("Asset update failed", ToastAndroid.BOTTOM);
    }
  };


  const getThumbnail = data?.asset?.thumbnails?.["390x218"];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar />
      <ScreenGradient>
        <VirtualizedList>
          <RenderIf condition={data?.id ? false : true}>
            <ThumbnailWrapper>
              <AssetThumbnail
                assetType="image"
                thumnailImageUri={getThumbnail}
              />
              <Box marginTop={16}></Box>
              {updateImageFormStructure.map((_form: any) => {
                if (_form.type !== "radio-button") {
                  return (
                    <PaddingContainer>
                      <Box marginBottom={8} marginTop={8} key={_form.id}>
                        <Box marginBottom={8}>
                          <Text color="#fff">{_form.labelText}</Text>
                        </Box>
                        <Controller
                          control={control}
                          name={_form.name}
                          render={({ field: { onChange, value, onBlur } }) => (
                            <EditableInput
                              {...register(_form.name, { required: true })}
                              value={value}
                              onBlur={onBlur}
                              onChangeText={onChange}
                            />
                          )}
                        />
                      </Box>
                    </PaddingContainer>
                  );
                }
                if (_form.type === "radio-button") {
                  if(typeof _selectedItems[_form.name] ==='boolean'){
                    
                  }
                  return (
                    <Box marginTop={8}>
                      <PaddingContainer>
                        <RadioButton
                          labelText={_form.labelText}
                          dataList={_form.options}
                          getSelectedOption={(option: any) =>
                            getSelectedItem(option, _form.name)
                          }
                          defaultOption={_selectedItems[_form.name]}
                        />
                      </PaddingContainer>
                    </Box>
                  );
                }
                return null;
              })}
            </ThumbnailWrapper>
          </RenderIf>
        </VirtualizedList>
        <EditSubmitButton
          isLoading={isLoading}
          onSave={handleSubmit(_onSubmit)}
        />
      </ScreenGradient>
    </SafeAreaView>
  );
};
