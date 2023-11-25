import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box } from "../../../components/box";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import {
  ICON_ARROW_LEFT_SVG,
  ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG,
  ICON_TOP_TABBAR_IMAGE_SVG,
  ICON_TOP_TABBAR_SOUND_ACTIVE_SVG,
  ICON_TOP_TABBAR_SOUND_SVG,
  ICON_TOP_TABBAR_TEXT_ACTIVE_SVG,
  ICON_TOP_TABBAR_TEXT_SVG,
  ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG,
  ICON_TOP_TABBAR_VIDEO_SVG,
} from "../../../constaints/icons";
import { windowSize } from "../../../utils/window-size";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useGetAssetListQuery } from "../../../services/view-all.service";
import { tokenContext } from "../../../context/token";
import { retriveToken } from "../../../utils/retrive-token";
import { PROFILE_ONE } from "../../../constaints/images";
import { Button } from "../../../components/button";

type AssetType = "Subscribe" | "Ownership";

type ActiveNav = "All" | "Images" | "Videos" | "Sounds" | "Texts";

type TabbarItem = {
  id: number;
  title: string;
  path: ActiveNav;
  icon: JSX.Element;
  activeIcon: JSX.Element;
};
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

const SelectContentModalMemo = () => {
  const [assetType, setAssetType] = useState<AssetType>("Subscribe");
  const [activeNav, setActiveNav] = useState<ActiveNav>("All");

  const [token, setToken] = useState<string>(null);
  const [page, setPage] = useState(1);

  const [assetsList, setAssetsList] = useState<any>([]);

  const tokenCtx = useContext(tokenContext);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const formattedToken = await retriveToken(tokenCtx);
    setToken(formattedToken);
  };

  const setAssetTypeHandler = (type: AssetType) => setAssetType(type);

  const renderMemorizedItem = useCallback(({ item }: { item: any }) => {
    return <ContentListItem item={item} />;
  }, []);

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

  useEffect(() => {
    if (error) {
      setAssetsList([]);
      return;
    }
    if (Array.isArray(data?.data)) {
      setAssetsList(data?.data);
    }
  }, [data?.data, error]);

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
            <AssetTypeNav
              setAssetType={setAssetTypeHandler}
              assetType={assetType}
            />
            <Box marginBottom={40}>
              <Nav setActiveNav={setActiveNav} activeNav={activeNav} />
            </Box>
          </>
        }
        ListFooterComponent={
          <>
            {isLoading || isFetching ? (
              <ActivityIndicator color="#8A8AE5" />
            ) : null}
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
        <Button varient="primary" text="Add"/>
      </Box>
    </>
  );
};

const ITEM_WIDTH = (width - 48 - 16) / 2;

const ContentListItem = ({ item }: any) => {
  const thumbnail =
    item?.asset?.thumbnails?.["336x366"] ||
    item?.asset?.thumbnails?.["226x226"];

  const userData = item?.asset?.user;

  return (
    <Box width={ITEM_WIDTH} flex={1} marginBottom={32}>
      <Box
        position="relative"
        id="thumbnail_box"
        width={ITEM_WIDTH}
        height={ITEM_WIDTH}
      >
        <Image
          source={{ uri: thumbnail }}
          style={{
            width: ITEM_WIDTH,
            height: ITEM_WIDTH,
            borderRadius: 16,
          }}
        />
        <Box
          id="fade-bg"
          width={ITEM_WIDTH - 1}
          height={ITEM_WIDTH - 3}
          position="absolute"
          borderRadius={16}
          top={1}
          left={1}
          backgroundColor="#00000042"
        ></Box>
      </Box>
      <Box
        id="body"
        width={ITEM_WIDTH}
        paddingRight={8}
        paddingLeft={8}
        marginTop={16}
        height={50}
      >
        <Text color={theme.color.light.TEXT} fontWeight={400} fontSize={14}>
          {item?.name}
        </Text>
        <Box marginTop={8} direction="row" alignItems="center">
          <Image
            source={{
              uri: PROFILE_ONE,
            }}
            style={{
              width: 16,
              height: 16,
              marginRight: 8,
            }}
          />
          <Text color={theme.color.light.TEXT}>{userData?.username}</Text>
        </Box>
      </Box>
    </Box>
  );
};

const activeNavBorderStyle = {
  borderBottomWidth: 2,
  borderBottomColor: theme.color.light.PRIMARY,
  height: "100%",
  justifyContent: "center",
};

const Nav = ({
  activeNav,
  setActiveNav,
}: {
  activeNav: ActiveNav;
  setActiveNav: (type: ActiveNav) => void;
}) => {
  const renderTabitems = useMemo(
    () =>
      tabbarItems.map((tab) => {
        const isSelected = tab.path === activeNav;

        let placeholderIcon = isSelected ? tab.activeIcon : tab.icon;

        return (
          <Box
            width="20%"
            // @ts-ignore
            additionalStyles={[isSelected ? activeNavBorderStyle : null]}
            alignItems="center"
            key={tab.id}
          >
            <TouchableOpacity onPress={() => setActiveNav(tab.path)}>
              {tab.title ? (
                <Text
                  fontSize={14}
                  fontWeight={400}
                  textStyles={{
                    color: isSelected
                      ? theme.color.light.ACTIVE_TEXT
                      : theme.color.light.TEXT,
                  }}
                >
                  {tab.title}
                </Text>
              ) : (
                <>{placeholderIcon}</>
              )}
            </TouchableOpacity>
          </Box>
        );
      }),
    [activeNav]
  );

  return (
    <Box
      width={width - 48}
      position="relative"
      left={24}
      marginTop={10}
      height={50}
      backgroundColor="rgba(14, 14, 18, 0.50)"
      borderRadius={16}
      direction="row"
      alignItems="center"
      paddingLeft={10}
      paddingRight={10}
      justifyContent="space-between"
    >
      {renderTabitems}
    </Box>
  );
};

const AssetTypeNav = ({
  assetType,
  setAssetType,
}: {
  assetType: string;
  setAssetType: (type: AssetType) => void;
}) => {
  const navigator = useMemo(() => {
    return (
      <Box
        width="100%"
        height={56}
        borderBottomEndRadius={32}
        borderBottomStartRadius={32}
        marginTop={5}
        paddingRight={24}
        paddingLeft={24}
      >
        <Box
          id="inner"
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {NAV_TABS.map((item) => {
            const isSelected = item.title === assetType;

            return (
              <TouchableOpacity
                key={item.id}
                style={{
                  width: "50%",
                  height: "100%",
                }}
                onPress={() => setAssetType(item.title)}
              >
                <Box
                  width="100%"
                  height={56}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text
                    fontSize={16}
                    fontWeight={400}
                    textStyles={{
                      height: "100%",
                      borderBottomWidth: 2,
                      borderColor: isSelected
                        ? theme.color.light.PRIMARY
                        : "transparent",
                      paddingTop: 17,
                      color: isSelected
                        ? theme.color.light.ACTIVE_TEXT
                        : theme.color.light.TEXT,
                    }}
                  >
                    {item.title}
                  </Text>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      </Box>
    );
  }, [assetType]);

  return (
    <Box
      width="100%"
      borderBottomEndRadius={16}
      borderBottomStartRadius={16}
      height={136}
      backgroundColor="rgba(14, 14, 18, 0.50)"
      paddingLeft={24}
      paddingRight={24}
    >
      <Title />
      <Box
        width="100%"
        height={56}
        marginTop={24}
        direction="row"
        alignItems="center"
      >
        {navigator}
      </Box>
    </Box>
  );
};

const Title = () => {
  return (
    <>
      <Box
        direction="row"
        alignItems="center"
        position="relative"
        justifyContent="center"
        paddingTop={32}
      >
        <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
          Select content
        </Text>
      </Box>
      <Box width={22} height={17} position="absolute" left={24} top={35}>
        <TouchableOpacity>
          <ICON_ARROW_LEFT_SVG />
        </TouchableOpacity>
      </Box>
    </>
  );
};

const SelectContentModal = memo(SelectContentModalMemo);

export default SelectContentModal;

const NAV_TABS: {
  id: number;
  title: AssetType;
}[] = [
  {
    id: 1,
    title: "Subscribe",
  },
  {
    id: 2,
    title: "Ownership",
  },
];

const tabbarItems: TabbarItem[] = [
  {
    id: 1,
    title: "All",
    path: "All",
    icon: null,
    activeIcon: null,
  },
  {
    id: 2,
    title: null,
    path: "Images",
    icon: <ICON_TOP_TABBAR_IMAGE_SVG width={19.76} height={16} />,
    activeIcon: <ICON_TOP_TABBAR_IMAGE_ACTIVE_SVG width={19.76} height={16} />,
  },
  {
    id: 3,
    title: null,
    path: "Videos",
    icon: <ICON_TOP_TABBAR_VIDEO_SVG width={19.76} height={16} />,
    activeIcon: <ICON_TOP_TABBAR_VIDEO_ACTIVE_SVG width={19.76} height={16} />,
  },
  {
    id: 4,
    title: null,
    path: "Sounds",
    icon: <ICON_TOP_TABBAR_SOUND_SVG width={19.76} height={16} />,
    activeIcon: <ICON_TOP_TABBAR_SOUND_ACTIVE_SVG width={19.76} height={16} />,
  },
  {
    id: 5,
    title: null,
    path: "Texts",
    icon: <ICON_TOP_TABBAR_TEXT_SVG width={19.76} height={16} />,
    activeIcon: <ICON_TOP_TABBAR_TEXT_ACTIVE_SVG width={19.76} height={16} />,
  },
];
