import { useMemo } from "react";
import { theme } from "../../../constaints/theme";
import { ActiveNav, AssetType, TabbarItem } from "../types";
import { Box } from "../../../components/box";
import { TouchableOpacity } from "react-native";
import { Text } from "../../../components/text";
import { windowSize } from "../../../utils/window-size";
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

const activeNavBorderStyle = {
  borderBottomWidth: 2,
  borderBottomColor: theme.color.light.PRIMARY,
  height: "100%",
  justifyContent: "center",
};

const { width } = windowSize();

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

export const SelectContentModalNav = ({
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
    <Box marginBottom={40}>
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
    </Box>
  );
};

export const SelectContentAssetTypeNav = ({
  assetType,
  setAssetType,
  closeSelectContentModalHandler,
}: {
  assetType: string;
  setAssetType: (type: AssetType) => void;
  closeSelectContentModalHandler: () => void;
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
      <Title closeSelectContentModalHandler={closeSelectContentModalHandler} />
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

const Title = ({
  closeSelectContentModalHandler,
}: {
  closeSelectContentModalHandler: () => void;
}) => {
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
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeSelectContentModalHandler}
        >
          <ICON_ARROW_LEFT_SVG />
        </TouchableOpacity>
      </Box>
    </>
  );
};
