import { useState, useContext, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import { Asset } from "../../../../types/asset";
import { tokenContext } from "../../../../context/token";
import { UseSelectContent } from "../../hooks/use-select-content";
import { retriveToken } from "../../../../utils/retrive-token";
import {
  getProfileAllDataApiHandler,
  getProfileImageDataApiHandler,
  getProfileSoundDataApiHandler,
  removeAssetApiHandler,
} from "../../service";
import { ASSET_TYPES } from "../../../../heloers/asset-types";
import { stickyStyles } from "../../../../styles/sticky";
import { SelectBar } from "../../components/select-bar";
import { VirtualizedList } from "../../../../components/virtualized-list";
import RenderList from "../../components/render-list";
import { Box } from "../../../../components/box";
import { LoadingSpinner } from "../../../../components/loader-spinner";
import { Spacer } from "../../../../components/spacer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { createArrayOfAssetObject } from "../../../../utils/create-array-of-asset-object";
import {
  profileService,
  useGetUserProfileQuery,
} from "./../../../../services/profile.service";

const OWNERSHIPE_BASE_URL = "/profile/assets?page=";
const SUBSCRIBE_BASE_URL = "/profile/subscriptions  ?page=";
const GRADIENTS_COLORS = ["#030340", "#030340"];
const GRADIENT_AXIS = { x: 0.7, y: 0 };

export const ProfileScreenAllPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInfinitLoading, setIsInfinitLoading] = useState(false);
  const [totalAssetsCount, setTotalAssetsCount] = useState<number>(null);
  const [data, setData] = useState<Asset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState("");

  // const { PROFILE_HEADER_TOUR_HAS_SEEN } = useSelector(
  //   (state: RootState) => state.tourSlice
  // );

  const { ACTIVE_PAGE }: { ACTIVE_PAGE: "subscribe" | "ownership" } =
    useSelector((store: RootState) => store.profileSlice);

  const isFocused = useIsFocused();
  const tokenCtx = useContext(tokenContext);
  const dispatch = useDispatch();

  const {
    selectedContents,
    isSelectedContent,
    selectOwnedItemPressHandler,
    selectBarCloserHandler,
    selectOwnedItemLognPressHandler,
  } = UseSelectContent();

  const { refetch } = useGetUserProfileQuery({ token });

  useEffect(() => {
    setup();
  }, [isFocused]);

  useEffect(() => {
    setData([]);
    setCurrentPage(1);
  }, [ACTIVE_PAGE]);

  useEffect(() => {
    getData(currentPage);
  }, [currentPage, ACTIVE_PAGE]);

  useEffect(() => {
    const setTokenHandler = async () => {
      const _token = await retriveToken(tokenCtx);
      if (_token) {
        setToken(_token);
      }
    };

    setTokenHandler();
  }, []);

  const setup = async () => {
    setData([]);
    if (isFocused) {
      getData();
    }
    if (!isFocused) {
      setCurrentPage(1);
      setData([]);
    }
  };

  const getData = async (__currPage?: number) => {
    startLoad();
    const token = await retriveToken(tokenCtx);

    if (!token) {
      stopLoad();
      return;
    }
    const url =
      ACTIVE_PAGE === "subscribe"
        ? SUBSCRIBE_BASE_URL + currentPage
        : OWNERSHIPE_BASE_URL + currentPage;

    const { isError, res, isSuccess } = await getProfileAllDataApiHandler(
      token,
      url
    );

    if (isError || !isSuccess) {
      stopLoad();
      return;
    }

    const total = res?.data?.total;

    if (total) {
      setTotalAssetsCount(total);
    }

    _createArrayOfAssetObject(res.data);
    stopLoad();
  };

  const startLoad = () => {
    if (currentPage === 1) {
      setIsLoading(true);
      return;
    }
    setIsInfinitLoading(true);
  };

  const stopLoad = () => {
    setIsLoading(false);
    setIsInfinitLoading(false);
  };

  const onRefresh = async () => {
    setCurrentPage(1);
    setData([]);
    getData(1);
  };

  const _createArrayOfAssetObject = (inputData: any) => {
    if (currentPage === 1) {
      const result = createArrayOfAssetObject(inputData, []);

      setData(result);
      return;
    }
    const result = createArrayOfAssetObject(inputData, data);

    setData(result);
  };

  const getNextPageData = async () => {
    const isFinished = isListFinished();
    if (isFinished) {
      return;
    }
    setCurrentPage((page) => page + 1);
  };

  const isListFinished = () => {
    return totalAssetsCount === data.length ? true : false;
  };
  const isSelectBarVisible = selectedContents.length ? true : false;

  const deleteAssetsHandler = async () => {
    if (!selectedContents.length) {
      return;
    }

    const token = await retriveToken(tokenCtx);

    if (!token) {
      return;
    }

    for (const _item of selectedContents) {
      const { id, type } = _item;

      const assetType = ASSET_TYPES[type];

      const { isError, isSuccess, res, errorRes } = await removeAssetApiHandler(
        token,
        assetType,
        id
      );
      console.log({ isError, isSuccess, res, errorRes });
    }

    refetch();
    onRefresh();
  };


  const IS_OWNERSHIP_ACTIVE = ACTIVE_PAGE === "ownership"? true: false

  return (
    <LinearGradient
      style={[stickyStyles.container]}
      colors={GRADIENTS_COLORS}
      start={GRADIENT_AXIS}
    >
      {IS_OWNERSHIP_ACTIVE ? (
        <SelectBar
          isVisible={isSelectBarVisible}
          closerHandler={selectBarCloserHandler}
          deleteAssetsHandler={deleteAssetsHandler}
        />
      ) : null}
      <VirtualizedList paddingTop={-100} onRefresh={onRefresh}>
        <RenderList
          isLoading={isLoading}
          data={data}
          selectedContentsLength={selectedContents.length}
          isSelectedContent={isSelectedContent}
          selectOwnedItemLognPressHandler={selectOwnedItemLognPressHandler}
          selectOwnedItemPressHandler={selectOwnedItemPressHandler}
          onEndReached={getNextPageData}
        />
        {isInfinitLoading ? (
          <Box
            width="100%"
            direction="row"
            justifyContent="flex-start"
            height={130}
            alignItems="center"
          >
            <LoadingSpinner color="red" />
          </Box>
        ) : null}
        <Spacer />
      </VirtualizedList>
    </LinearGradient>
  );
};
