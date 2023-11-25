import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Box } from "../../../components/box";
import { Button } from "../../../components/button";
import {
  ICON_ADD,
  ICON_MENU_VERTICAL,
  ICON_SPEAKER_BLACK,
} from "../../../constaints/icons";
import { ChannelItem } from "../types";
import {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../../../components/text";
import { BlurView } from "expo-blur";
import { useClickOutside } from "react-native-click-outside";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { alertContext } from "../../../context/alert";
import { screenSize } from "../../../utils/screen-size";
import { theme } from "../../../constaints/theme";
import { Input } from "../../../components/form";
import { FlashList } from "@shopify/flash-list";

const { height } = screenSize();

const BOTTOM_SHEET_BLUR_BG =
  Platform.OS === "android" ? "rgba(78, 78, 97, 0.75)" : "transparent";

const BOTTOM_SHEET_BLUR_PERCENT = Platform.OS === "android" ? 50 : 80;

export const ChannelsPage = ({
  setSelectedView,
  selectedView,
  headerComponent,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["100%"], []);

  const alrtCtx = useContext(alertContext);

  const hideBottomTabbar = () => {
    alrtCtx?.open();
  };

  const showBottomSheet = () => {
    alrtCtx?.close();
  };

  const handleOnChangeBottomSheet = useCallback((index: number) => {
    if (index === -1) {
      showBottomSheet();
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleOpenPres = useCallback(() => {
    setIsOpen(true);
    hideBottomTabbar();

    sheetRef.current?.expand();
  }, []);

  const handleClosePres = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <>
      <FlashList
        data={[]}
        ListHeaderComponentStyle={styles.header}
        estimatedItemSize={50}
        ListHeaderComponent={headerComponent}
        ListFooterComponent={
          <>
            <Box
              id="wrapper"
              width="100%"
              paddingRight={24}
              paddingLeft={24}
              paddingTop={32}
              flex={1}
              paddingBottom={130}
            >
              <AddChannelButton modalOpener={handleOpenPres} />
              <ChannelsList />
            </Box>
          </>
        }
        renderItem={null}
      />

      {isOpen ? (
        <View style={styles.container}>
          <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose
            onChange={handleOnChangeBottomSheet}
            handleComponent={null}
            backgroundStyle={{
              backgroundColor: BOTTOM_SHEET_BLUR_BG,
            }}
          >
            <AddChannelBottomSheet modalCloser={handleClosePres} />
          </BottomSheet>
        </View>
      ) : null}
    </>
  );
};

const AddChannelBottomSheet = ({
  modalCloser,
}: {
  modalCloser: () => void;
}) => {
  return (
    <BottomSheetScrollView style={styles.bottomSheetScrollView}>
      <BlurView
        style={styles.bottomSheetBlurView}
        tint="dark"
        intensity={BOTTOM_SHEET_BLUR_PERCENT}
      >
        <Box
          width="100%"
          height={300}
          paddingTop={24}
          paddingBottom={32}
          paddingRight={32}
          paddingLeft={32}
        >
          <Box
            id="title"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text
              color={theme.color.light.WHITE}
              fontSize={16}
              fontWeight={600}
            >
              Add channel
            </Text>
            <Box>
              <TouchableOpacity onPress={modalCloser}>
                <Text
                  fontSize={14}
                  fontWeight={300}
                  color={theme.color.light.LIGHT_TEXT}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>

          <Box id="form" marginTop={24}>
            <Input showBorder={false} labelText="Username" placeholder="Insert username..." />
            <Box marginTop={16}></Box>
            <Input showBorder={false} labelText="Type" placeholder="Choose type..." />
            <Box marginTop={24}></Box>
            <Button varient="dark" text="Add" />
          </Box>
        </Box>
      </BlurView>
    </BottomSheetScrollView>
  );
};

const gradientProps = {
  style: {
    width: "100%",
    height: 72,
    borderRadius: 16,
    padding: 1,
  },
  colors: ["rgba(207, 207, 252, 0)", "rgba(207, 207, 252, 0.3)"],
  start: {
    x: 0.7,
    y: 0,
  },
};

const speakerIconGradientProps = {
  style: {
    width: 40,
    height: 40,
    borderRadius: 8,
    padding: 1,
  },
  colors: ["#8bb3ff", "#4484ff"],
  start: {
    x: 0.1,
    y: 0.7,
  },
};

const menuWindowGradientProps = {
  style: {
    width: 127,
    height: 124,
    borderRadius: 16,
    padding: 1,
    opacity: 0.5,
  },
  colors: ["#4b4b55", "#38383c"],
  start: {
    x: 0.1,
    y: 0.7,
  },
};

const MemoChannelsList = () => {
  const [activeEditWindowId, setActiveEditWindowId] = useState<number>(null);

  const openEditWindowHandler = (id: number) => setActiveEditWindowId(id);
  const closeEditWindowHandler = () => setActiveEditWindowId(null);

  const modalWrapperRef = useClickOutside<View>(() => {
    closeEditWindowHandler();
  });

  const renderItem = ({ item }: { item: ChannelItem }) => {
    return (
      <Box
        width="100%"
        marginBottom={16}
        height={activeEditWindowId === item.id ? 190 : 72}
      >
        <Box position="relative" zIndex={10} width="100%">
          <LinearGradient {...gradientProps}>
            <Box
              width="100%"
              height="100%"
              borderRadius={16}
              backgroundColor="#121247"
              padding={16}
              direction="row"
              alignItems="center"
              position="relative"
              justifyContent="space-between"
            >
              <Box
                width="90%"
                height="100%"
                direction="row"
                alignItems="center"
              >
                <LinearGradient {...speakerIconGradientProps}>
                  <Box
                    id="speaker-icon"
                    width={40}
                    height={40}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <ICON_SPEAKER_BLACK />
                  </Box>
                </LinearGradient>
                <Box flex={1} height="100%" paddingLeft={16}>
                  <Text
                    color="rgba(255, 255, 255, 1)"
                    fontWeight={600}
                    fontSize={16}
                  >
                    {item.title}
                  </Text>
                  <Text
                    color="rgba(102, 102, 128, 1)"
                    fontWeight={400}
                    fontSize={12}
                  >
                    {item.status}
                    {item.status === "pending" ? "..." : null}
                  </Text>
                </Box>
              </Box>
              <Box width="10%" height="100%">
                <TouchableOpacity
                  onPress={() => openEditWindowHandler(item.id)}
                  activeOpacity={1}
                >
                  <Box
                    alignItems="center"
                    justifyContent="center"
                    width={40}
                    height={40}
                  >
                    <ICON_MENU_VERTICAL />
                  </Box>
                </TouchableOpacity>
              </Box>
            </Box>
          </LinearGradient>
        </Box>
        {activeEditWindowId === item.id ? (
          <View ref={modalWrapperRef} style={styles.editViewWrapper}>
            <LinearGradient {...menuWindowGradientProps}>
              <BlurView style={styles.blur} tint="dark" intensity={80}>
                <Box width="100%" padding={16} height="100%">
                  <TouchableOpacity activeOpacity={1}>
                    <Text
                      color="#D9D9FF"
                      marginBottom={16}
                      fontSize={14}
                      fontWeight={600}
                    >
                      Edit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1}>
                    <Text
                      color="#D9D9FF"
                      marginBottom={16}
                      fontSize={14}
                      fontWeight={600}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1}>
                    <Text color="#D9D9FF" fontSize={14} fontWeight={600}>
                      Refresh
                    </Text>
                  </TouchableOpacity>
                </Box>
              </BlurView>
            </LinearGradient>
          </View>
        ) : null}
      </Box>
    );
  };

  const key = useCallback((item: ChannelItem) => item.id.toString(), []);

  return (
    <Box id="channels-list" width="100%" marginTop={32}>
      <FlashList
        data={channelsData}
        renderItem={renderItem}
        keyExtractor={key}
        estimatedItemSize={100}
        style={{
          overflow: "visible",
          paddingBottom: 100,
        }}
      />
    </Box>
  );
};
const ChannelsList = memo(MemoChannelsList);

const AddChannelButton = ({ modalOpener }: { modalOpener: () => void }) => {
  return (
    <Button
      varient="flat"
      text="Add channel"
      additionalStyles={{
        height: 56,
      }}
      onpressHandler={modalOpener}
      icon={
        <ICON_ADD
          style={{
            position: "relative",
            top: -3,
          }}
          color="666680"
          width={16}
          height={16}
        />
      }
      size="lg"
    />
  );
};

const channelsData: ChannelItem[] = [
  {
    id: 1,
    status: "pending",
    title: "Channel 01",
  },
  {
    id: 2,
    status: "pending",
    title: "Channel 02",
  },
];

const styles = StyleSheet.create({
  editViewWrapper: {
    position: "absolute",
    width: 124,
    height: 124,
    zIndex: 100000000,
    right: 16,
    top: 58,
  },
  safeAreaView: {
    flex: 1,
  },
  header: {
    flex: 1,
    height: 200,
  },
  blur: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  container: {
    flex: 1,
    height: 300,
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottomSheetScrollView: {
    width: "100%",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  bottomSheetBlurView: {
    width: "100%",
    flex: 1,
    minHeight: 300,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
});
