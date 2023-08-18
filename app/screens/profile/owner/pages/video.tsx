import { useState, useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { tokenContext } from "../../../../context/token";
import { UseSelectContent } from "../../hooks/use-select-content";
import { retriveToken } from "../../../../utils/retrive-token";
import {
  getProfileVideoDataApiHandler,
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
import { Asset } from "../../../../types/asset";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";
import { useGetUserProfileQuery } from "../../../../services/profile.service";

const SUBSCRIBE_BASE_URL = "/subscriptions/videos?page=";
const OWNERSHIP_BASE_URL = "/profile/videos?page=";

const GRADIENTS_COLORS = ["#030340", "#030340"];
const GRADIENT_AXIS = { x: 0.7, y: 0 };

export const ProfileScreenVideoPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInfinitLoading, setIsInfinitLoading] = useState(false);
  const [totalAssetsCount, setTotalAssetsCount] = useState<number>(null);
  const [data, setData] = useState<Asset[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState("");

  const { ACTIVE_PAGE }: { ACTIVE_PAGE: "subscribe" | "ownership" } =
    useSelector((store: RootState) => store.profileSlice);

  const { refetch } = useGetUserProfileQuery({ token });

  const isFocused = useIsFocused();
  const tokenCtx = useContext(tokenContext);

  const {
    selectedContents,
    isSelectedContent,
    selectOwnedItemPressHandler,
    selectBarCloserHandler,
    selectOwnedItemLognPressHandler,
  } = UseSelectContent();

  useEffect(() => {
    const setTokenHandler = async () => {
      const _token = await retriveToken(tokenCtx);
      if (_token) {
        setToken(_token);
      }
    };

    setTokenHandler();
  }, []);

  useEffect(() => {
    setup(isFocused);
  }, [isFocused]);

  useEffect(() => {
    setData([]);
    setCurrentPage(1);
  }, [ACTIVE_PAGE]);

  useEffect(() => {
    getData();
  }, [currentPage]);

  const setup = async (__isFocused: boolean) => {
    setData([]);
    if (__isFocused) {
      await getData();
    }
    if (!__isFocused) {
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

    let __uri: string;
    if (ACTIVE_PAGE === "ownership") {
      __uri = OWNERSHIP_BASE_URL + (__currPage ? __currPage : currentPage);
    }
    if (ACTIVE_PAGE === "subscribe") {
      __uri = SUBSCRIBE_BASE_URL + (__currPage ? __currPage : currentPage);
    }
    // const url = BASE_URL + (__currPage ? __currPage : currentPage);

    const { isError, res, isSuccess } = await getProfileVideoDataApiHandler(
      token,
      __uri
    );

    if (isError || !isSuccess) {
      stopLoad();
      return;
    }

    const total = res?.data?.total;

    if (total) {
      setTotalAssetsCount(total);
    }

    if (currentPage === 1) {
      stopLoad();
      setData(res.data?.data);
      stopLoad();
      return;
    } else {
      setData([...data, ...res.data?.data]);
      stopLoad();
    }
  };

  const getNextPageData = async () => {
    const isFinished = isListFinished();
    if (isFinished) {
      return;
    }
    setCurrentPage((page) => page + 1);
  };

  const onRefresh = async () => {
    setCurrentPage(1);
    setData([]);
    getData(1);
  };

  const isListFinished = () => {
    return totalAssetsCount === data.length ? true : false;
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

    onRefresh();
  };

  const isSelectBarVisible = selectedContents.length ? true : false;
  const IS_OWNERSHIP_ACTIVE = ACTIVE_PAGE === "ownership" ? true : false;

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
          data={data}
          isLoading={isLoading}
          selectedContentsLength={selectedContents.length}
          isSelectedContent={isSelectedContent}
          selectOwnedItemLognPressHandler={selectOwnedItemLognPressHandler}
          selectOwnedItemPressHandler={selectOwnedItemPressHandler}
          onEndReached={getNextPageData}
        />
        {isInfinitLoading ? (
          <Box width="100%" height={100} alignItems="center">
            <LoadingSpinner color="red" />
          </Box>
        ) : null}
        <Spacer />
        <Spacer />
      </VirtualizedList>
    </LinearGradient>
  );
};
