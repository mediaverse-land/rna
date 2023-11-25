import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Box } from "../../../components/box";
import { theme } from "../../../constaints/theme";
import { Text } from "../../../components/text";
import { ICON_ADD, ICON_ARROW_DOWN_SVG } from "../../../constaints/icons";
import {
  lazy,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useClickOutside } from "react-native-click-outside";
import { Calendar } from "../../../components/calendar";
import { FlashList } from "@shopify/flash-list";
import { Button } from "../../../components/button";
import { alertContext } from "../../../context/alert";
import BottomSheet, {
} from "@gorhom/bottom-sheet";
import { Input } from "../../../components/form";
import { windowSize } from "../../../utils/window-size";
// import { SelectContentModal } from "../components/select-content-modal";

//@ts-ignore
const SelectContentModal = lazy(
  //@ts-ignore
  () => import("../components/select-content-modal")
);

const {  height } = windowSize();

const BOTTOM_SHEET_BLUR_BG =
  Platform.OS === "android" ? "rgba(78, 78, 97, 0.75)" : "transparent";

const BOTTOM_SHEET_BLUR_PERCENT = Platform.OS === "android" ? 50 : 80;

export const ConductorPage = ({
  headerComponent,
}: any) => {
  const [activeMonth, setActiveMonth] = useState<string>(null);
  const [activeYear, setActiveYear] = useState<number>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenContentModal, setIsOpenContentModal] = useState(false);

  const sheetRef = useRef<BottomSheet>(null);
  const contentModalSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["100%"], []);
  const contentModalSnapPoints = useMemo(() => ["100%"], []);

  const alrtCtx = useContext(alertContext);

  const hideBottomTabbar = useCallback(() => {
    alrtCtx?.open();
  }, []);

  const hideContentModalBottomTabbar = useCallback(() => {
    alrtCtx?.open();
  }, []);

  const showBottomSheet = useCallback(() => {
    alrtCtx?.close();
  }, []);

  const showContentModalBottomSheet = useCallback(() => {
    alrtCtx?.close();
  }, []);

  const handleOnChangeBottomSheet = useCallback((index: number) => {
    if (index === -1) {
      //   showBottomSheet();
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleContentModalOnChangeBottomSheet = useCallback((index: number) => {
    if (index === -1) {
      showContentModalBottomSheet();
      setIsOpenContentModal(false);
    } else {
      hideBottomTabbar();
      setIsOpenContentModal(true);
    }
  }, []);

  const handleOpenPres = useCallback(() => {
    setIsOpen(true);
    hideBottomTabbar();

    sheetRef.current?.expand();
  }, []);

  const handleContnentModalOpenPres = useCallback(() => {
    setIsOpenContentModal(true);
    hideBottomTabbar();

    contentModalSheetRef.current?.expand();
  }, []);

  const handleClosePres = () => {
    showBottomSheet();
    sheetRef.current?.close();
  };

  const handleContentModalClosePres = () => {
    contentModalSheetRef.current?.close();
  };

  const closeFormModalAndOpenContenModal = () => {
    handleClosePres();
    handleContnentModalOpenPres();
  };

  return (
    <>
      <FlashList
        data={[]}
        style={{}}
        ListHeaderComponentStyle={{
          flex: 1,
          height: 200,
        }}
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
              <Calendar
                setActiveMonth={setActiveMonth}
                activeYear={activeYear}
                activeMonth={activeMonth}
                setActiveYear={setActiveYear}
              />
              <AddUpcommingButton
                title="Add channel"
                handler={handleOpenPres}
              />
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
            // enablePanDownToClose
            onChange={handleOnChangeBottomSheet}
            handleComponent={null}
            backgroundStyle={{
              backgroundColor: BOTTOM_SHEET_BLUR_BG,
            }}
          >
            <BlurView
              style={styles.blur}
              tint="dark"
              intensity={BOTTOM_SHEET_BLUR_PERCENT}
            >
              <CreateConductorForm
                handleClosePres={handleClosePres}
                closeFormModalAndOpenContenModal={
                  closeFormModalAndOpenContenModal
                }
              />
            </BlurView>
          </BottomSheet>
        </View>
      ) : null}
      {isOpenContentModal ? (
        <View style={styles.contentModalContainer}>
          <BottomSheet
            ref={contentModalSheetRef}
            snapPoints={contentModalSnapPoints}
            // enablePanDownToClose
            onChange={handleContentModalOnChangeBottomSheet}
            handleComponent={null}
            backgroundStyle={{
              backgroundColor: BOTTOM_SHEET_BLUR_BG,
            }}
          >
            <LinearGradient
              {...bgGradientConfig}
              style={{
                flex: 1,
              }}
            >
              <SelectContentModal />
            </LinearGradient>
          </BottomSheet>
        </View>
      ) : null}
    </>
  );
};
const bgGradientConfig = {
  style: {
    width: "100%",
    flex: 1,
    borderRadius: 16,
    padding: 1,
  },
  colors: ["#0F0F66", "#030340"],
  start: {
    x: 0.2,
    y: 0.1,
  },
};

const CreateConductorFormMemo = ({
  handleClosePres,
  closeFormModalAndOpenContenModal,
}: {
  handleClosePres: () => void;
  closeFormModalAndOpenContenModal: () => void;
}) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Box
        width="100%"
        padding={16}
        paddingTop={24}
        paddingLeft={32}
        paddingRight={32}
        height="100%"
      >
        <Title handleClosePres={handleClosePres} />
        <Box marginTop={-16}>
          <BorderButtonMemo
            handler={closeFormModalAndOpenContenModal}
            title="Add upcoming"
          />
        </Box>
        <Box id="form" marginTop={24}>
          <Input showBorder={false} labelText="Channel" placeholder="Choose" />
          <Box marginTop={16}></Box>
          <Input showBorder={false} labelText="Action" placeholder="Choose" />
          <Box marginTop={16}></Box>
          <Input
            isTextArea
            showBorder={false}
            labelText="Description"
            placeholder="Description"
          />

          <Box marginTop={24}></Box>
          <Button varient="dark" text="Add" />
        </Box>
      </Box>
    </ScrollView>
  );
};

const Title = ({ handleClosePres }: { handleClosePres: () => void }) => {
  return (
    <Box
      id="title"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
        Add upcoming
      </Text>
      <Box>
        <TouchableOpacity onPress={handleClosePres}>
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
  );
};

const BorderButtonMemo = ({
  handler,
  title,
}: {
  handler: () => void;
  title: string;
}) => {
  return (
    <Box marginTop={40}>
      <Button
        varient="flat"
        text={title}
        additionalStyles={{
          height: 56,
        }}
        onpressHandler={handler}
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
    </Box>
  );
};

const CreateConductorForm = memo(CreateConductorFormMemo);
const AddUpcommingButton = memo(BorderButtonMemo);

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
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  container: {
    flex: 1,
    height: 500,
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  contentModalContainer: {
    flex: 1,
    height: height,
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
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
