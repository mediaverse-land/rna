import { memo, useCallback, useContext, useEffect, useState } from "react";
import { Box } from "../../../components/box";
import { ActivityIndicator } from "react-native";
import { Text } from "../../../components/text";
import { windowSize } from "../../../utils/window-size";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useGetAssetListQuery } from "../../../services/view-all.service";
import { tokenContext } from "../../../context/token";
import { retriveToken } from "../../../utils/retrive-token";
import { Button } from "../../../components/button";
import { ContentListItem } from "./content-list-item";
import { ActiveNav, AssetType } from "../types";
import {
  SelectContentAssetTypeNav,
  SelectContentModalNav,
} from "./select-content-modeal-nav";
import { Asset } from "../../../types/asset";

const { width, height } = windowSize();

const URLS: Record<AssetType, Record<ActiveNav, string>> = {
  Ownership: {
    All: "/profile/assets",
    Images: "/profile/images?page=",
    Videos: "/profile/videos?page=",
    Sounds: "/profile/audios?page=",
    Texts: "/profile/texts?page=",
  },
  Subscribe: {
    All: "/profile/subscriptions?page=",
    Images: "/profile/subscriptions/images?page=",
    Videos: "/profile/subscriptions/videos?page=",
    Sounds: "/profile/subscriptions/audios?page=",
    Texts: "/profile/subscriptions/texts?page=",
  },
};

const SelectContentModalMemo = ({
  closeModalHandler,
  addAssetHandler,
}: {
  closeModalHandler: () => void;
  addAssetHandler: (id: number) => void;
}) => {
  const [assetType, setAssetType] = useState<AssetType>("Subscribe");
  const [activeNav, setActiveNav] = useState<ActiveNav>("All");

  const [selectedItemId, setSelectedItemId] = useState<number>(null);

  const [token, setToken] = useState<string>(null);
  const [page, setPage] = useState(1);

  const [assetsList, setAssetsList] = useState<Asset[]>([]);

  const tokenCtx = useContext(tokenContext);

  useEffect(() => {
    getToken();
  }, []);


  const getToken = async () => {
    const formattedToken = await retriveToken(tokenCtx);
    setToken(formattedToken);
  };

  const setAssetTypeHandler = (type: AssetType) => setAssetType(type);

  const renderMemorizedItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <ContentListItem
          item={item}
          setSelectedItemId={setSelectedItemId}
          selectedItemId={selectedItemId}
        />
      );
    },
    [selectedItemId]
  );

  const key = useCallback(() => Math.random().toString(), []);

  const currentUrl = URLS[assetType][activeNav];

  const { data, isLoading, isFetching, isError, error } = useGetAssetListQuery(
    {
      url: `${currentUrl}${page}`,
      token,
    },
    {
      skip: token ? false : true,
    }
  );

  const current_page = data?.current_page;
  const total = data?.total;

  useEffect(() => {
    setAssetsList([]);
    setPage(1)
  } ,[currentUrl])


  useEffect(() => {
    if (data?.data?.length) {
      if (page === 1 || current_page === 1) {
        setAssetsList(data?.data);
      } else {
        setAssetsList((prev) => [...prev, ...data?.data]);
      }
    }
  }, [page, current_page, data?.data?.length]);

  const closeSelectContentModalHandler = () => {
    closeModalHandler();
  };

  const nextPageHandler = () => {
    if (isLoading || isFetching) {
      return;
    }

    if (total <= assetsList?.length || total === assetsList?.length) {
      return;
    }

    setPage((pg) => pg + 1);
  };

  const hasMoreItems = total > assetsList?.length;

  return (
    <>
      <BottomSheetFlatList
        data={assetsList}
        style={{
          flex: 1,
          height,
        }}
        columnWrapperStyle={{
          width: width - 48,
          position: "relative",
          left: 24,
          gap: 16,
        }}
        numColumns={2}
        renderItem={renderMemorizedItem}
        keyExtractor={key}
        ListHeaderComponent={
          <>
            <SelectContentAssetTypeNav
              setAssetType={setAssetTypeHandler}
              assetType={assetType}
              closeSelectContentModalHandler={closeSelectContentModalHandler}
            />
            <SelectContentModalNav
              setActiveNav={setActiveNav}
              activeNav={activeNav}
            />
          </>
        }
        ListFooterComponent={
          <>
            {hasMoreItems && (!isLoading || !isFetching) ? (
              <Box width={width - 48} position="relative" left={24}>
                <Button
                  text="Load more"
                  onpressHandler={nextPageHandler}
                  varient="dark"
                />
              </Box>
            ) : null}
            <Loader isLoading={isLoading || isFetching} />
            <Box width="100%" height={100}></Box>
          </>
        }
      />
      <Box
        height={50}
        position="absolute"
        left={24}
        width={width - 42}
        bottom={32}
        zIndex={100000}
      >
        <Button
          varient="primary"
          text="Add"
          onpressHandler={() => addAssetHandler(selectedItemId)}
        />
      </Box>
    </>
  );
};

const SelectContentModal = memo(SelectContentModalMemo);

export default SelectContentModal;

const Loader = ({ isLoading }: { isLoading: boolean }) => {
  return <>{isLoading ? <ActivityIndicator color="#8A8AE5" /> : null}</>;
};
