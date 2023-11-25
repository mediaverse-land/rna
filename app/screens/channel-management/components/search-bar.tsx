import { TextInput, TouchableOpacity } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import {
  ICON_ARROW_LEFT_SVG,
  ICON_SEARCH_SVG_PATH,
} from "../../../constaints/icons";
import { StyleSheet } from "react-native";
import { screenSize } from "../../../utils/screen-size";
import { ChanelManagementView } from "../types";
import { useMemo } from "react";

const { width: WINDOW_WIDTH } = screenSize();
const BG_COLOR = "rgba(14, 14, 18, 0.50)";

type NavTab = {
  id: number;
  title: string;
  path: ChanelManagementView;
};

const NAV_TABS: NavTab[] = [
  {
    id: 1,
    title: "Channels",
    path: "CHANNEL",
  },
  {
    id: 2,
    title: "Conductor",
    path: "CONDUCTOR",
  },
];

type Props = {
  setSelectedView: (view: ChanelManagementView) => void;
  selectedView: ChanelManagementView;
};

export function ChannelManagementSearchBar({
  selectedView,
  setSelectedView,
}: Props) {
  
  const navigator = useMemo(() => {
    return (
      <Box
        backgroundColor={BG_COLOR}
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
            const isSelected = item.path === selectedView;

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.half}
                onPress={() => setSelectedView(item.path)}
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
  }, [selectedView]);

  const titleComponent = useMemo(() => <Title />, []);
  const searchBoxCompoonent = useMemo(() => <SearchBox />, []);

  return (
    <Box
      width="100%"
      height={139}
      backgroundColor={BG_COLOR}
      paddingTop={32}
      position="relative"
    >
      {titleComponent}
      {searchBoxCompoonent}
      {navigator}
    </Box>
  );
}

const SearchBox = () => {
  return (
    <Box
      width={WINDOW_WIDTH - 48}
      height={48}
      marginTop={32}
      position="relative"
      left={24}
    >
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        placeholderTextColor="#83839C"
      />
      <Box width={16} height={16} position="absolute" top={15.5} right={16}>
        <ICON_SEARCH_SVG_PATH />
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
      >
        <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
          Channel Management
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

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#353542",
    padding: 16,
  },
  half: {
    width: "50%",
  },
});
