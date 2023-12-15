import { ReactNode, lazy, useContext, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { CustomSafeArea } from "../../../../components/custom-safe-area";
import { ScreenGradient } from "../../../../components/screen-gradient";
import { VirtualizedList } from "../../../../components/virtualized-list";
import { CreateAssetToolbar } from "../../component/create-asset-toolbar";
import { Box } from "../../../../components/box";
import { TopToolbar } from "../../component/top-toolbar";
import { Button } from "../../../../components/button";
import { AssetDataView } from "./add-asset-data";
import { theme } from "../../../../constaints/theme";
import { SaveAndPublish } from "./save-and-publish";
import { AppDispatch, RootState } from "../../../../store";
import {
  navigateToAddMetaDataView,
  navigateToSaveAndPublishView,
} from "../../../../slices/plus.slice";
import { PaddingContainer } from "../../../../styles/grid";
import { UseNavigationType } from "../../../../types/use-navigation";
import { tokenContext } from "../../../../context/token";
import { retriveToken } from "../../../../utils/retrive-token";
import { userContext } from "../../../../context/user";
import { useCreateAssetMutation } from "../../../../services/asset.service";
import { UploadLoader } from "./upload-loader";

const SelectPlan = lazy(() => import("../../component/select-plan"));
const SelectLanguage = lazy(() => import("../../component/select-language"));
const SelectForkability = lazy(
  () => import("../../component/select-forkability")
);

const BG_GRADIENT = theme.gradients.PLUS_PAGE_GRADIENT;

export const AddAssetMetaData = () => {
  const { top } = useSafeAreaInsets();

  const [progress, setProgress] = useState<number>(0);

  const [createdAssetId, setCreatedAssetId] = useState<number>(null);

  const navigation = useNavigation<UseNavigationType>();
  const dispatch: any = useDispatch<AppDispatch>();

  const tokenCtx = useContext(tokenContext);
  const userCtx = useContext(userContext);

  // types: 'add-metadata'| 'save-and-publish' | 'upload-loader'
  const {
    createAssetActiveView,
    selectedLanguage,
    title,
    description,
    price,
    subscriptionPriod,
    forkabilityStatus,
    selectedPlan,
  } = useSelector((state: RootState) => state.plusSlice);

  let mutateCreateAssetActiveView = createAssetActiveView;

  const [createAssetApiHandler, { isLoading, isFetching }] =
    useCreateAssetMutation();

  const publishPressHandler = () => {
    if (!selectedLanguage || !title || !description) {
      return;
    }
    dispatch(navigateToSaveAndPublishView());
  };

  const navigateToAddMetaDataViewHandler = () => {
    dispatch(navigateToAddMetaDataView());
  };

  const goBackHandler = () => {
    if (mutateCreateAssetActiveView === "save-and-publish") {
      navigateToAddMetaDataViewHandler();
      return;
    }

    navigation.goBack();
  };

  const getToken = async () => {
    return await retriveToken(tokenCtx);
  };

  const getUser = async () => {
    return await userCtx.getUser();
  };

  const plans: any = {
    Free: 1,
    Ownership: 2,
    Subscription: 3,
  };

  // const submitHandler = async (file: string) => {
  //   try {
  //     const requestBody = {
  //       asset: 91,
  //       is_thumbnail: true,
  //       file: file,
  //     };

  //     const result = await axios.post(
  //       "${process.env.EXPO_APPBASE_URL}/files",
  //       requestBody,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //         onUploadProgress: uploadProgress,
  //       }
  //     );
  //   } catch (err: any) {
  //     console.log(err?.response?.data);
  //   }
  // };

  const uploadProgress = (progressEvent: any) => {
    var Percentage = Math.round(
      (progressEvent.loaded / progressEvent.total) * 100
    );
    setProgress(Percentage);
  };

  const cleanupCreatedAssetId = () => {
    setCreatedAssetId(null);
  };

  // Create asset
  // first, we create asset and then, we upload file based on the asset_id
  const getRequestBody = async () => {
    const token = await getToken();
    const user = await getUser();

    const currentPlan = plans[selectedPlan];

    let options: any = {
      name: title,
      user: user?.id,
      plan: currentPlan,
      forkability_status: forkabilityStatus,
      description: description,
      type: 1,
      lang:selectedLanguage
    };

    if (currentPlan === 2) {
      options = {
        ...options,
        price,
      };
    }
    if (currentPlan === 3) {
      options = {
        ...options,
        price,
        subscription_period: subscriptionPriod,
      };
    }

    return [options, token];
  };

  const createAssetHandler = async () => {
    const [options, token] = await getRequestBody();
    const url = "/texts";

    const response = await createAssetApiHandler({
      url,
      token,
      body: options,
    });

    if (response?.data) {
      setCreatedAssetId(response?.data?.asset?.id);
    }
  };

  const views = useMemo<
    Record<"add-metadata" | "save-and-publish" | "upload-loder", ReactNode>
  >(() => {
    return {
      "add-metadata": <AssetDataView />,
      "save-and-publish": <SaveAndPublish />,
      "upload-loder": (
        <UploadLoader
          assetId={createdAssetId}
          cleanupCreatedAssetId={cleanupCreatedAssetId}
        />
      ),
    };
  }, [mutateCreateAssetActiveView, createdAssetId]);


  // Indicate toolbar if current view is "add-metadata"
  const Toolbar = () => {
    if (mutateCreateAssetActiveView === "add-metadata") {
      return <CreateAssetToolbar publishPressHandler={publishPressHandler} />;
    }

    if (mutateCreateAssetActiveView === "save-and-publish"){

      return <Box marginTop={100} marginBottom={32}>
        <PaddingContainer>
          <Button
            varient="primary"
            text="Publish"
            onpressHandler={createAssetHandler}
            isLoading={isLoading || isFetching}
            />
        </PaddingContainer>
      </Box>
          }
  };

  if (createdAssetId) {
    mutateCreateAssetActiveView = "upload-loder";
  }

  const currentView = views[mutateCreateAssetActiveView];

  let pageTitle =
    mutateCreateAssetActiveView === "add-metadata"
      ? "Information"
      : "Save $ publish";

  pageTitle = mutateCreateAssetActiveView === "upload-loder" && "";

  return (
    <>
      <CustomSafeArea>
        <ScreenGradient colors={BG_GRADIENT}>
          <VirtualizedList>
            <Box id="scroll-wrapper" flex={1} width="100%" marginTop={top}>
              <TopToolbar title={pageTitle} goBackHandler={goBackHandler} />
              {currentView}
              <Toolbar />
            </Box>
          </VirtualizedList>
        </ScreenGradient>
      </CustomSafeArea>

      {/* Selet language bottom sheet */}
      <SelectLanguage />
      {/* Selet plan bottom sheet */}
      <SelectPlan />
      {/* Selet forkability bottom sheet */}
      <SelectForkability />
    </>
  );
};
