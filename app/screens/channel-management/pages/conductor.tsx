/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FlatList, Platform,  View } from "react-native";
import { Box } from "../../../components/box";
import {
  lazy,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "../../../components/calendar";
import { alertContext } from "../../../context/alert";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { CreateConductorFormMemo } from "../components/create-conductor-form";
import { BorderButton } from "../components/border-button";
import { SelectAccountModal } from "../components/select-account-modal";
import { useGetShareListQuery, useShareMutation } from "../../../services/asset.service";
import { Toaster } from "../../../utils/toaster";
import { ExternalAccount } from "../../../types/external-account";
import { retriveToken } from "../../../utils/retrive-token";
import { tokenContext } from "../../../context/token";
import { channelManagementStyles } from "../styles";
import { ShareList } from "../components/share-list";

//@ts-ignore
const SelectContentModal = lazy(
  //@ts-ignore
  () => import("../components/select-content-modal")
);

const styles = channelManagementStyles;

const _toaster = new Toaster();

const BOTTOM_SHEET_BLUR_BG =
  Platform.OS === "android" ? "rgba(78, 78, 97, 0.75)" : "transparent";

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

const BOTTOM_SHEET_BLUR_PERCENT = Platform.OS === "android" ? 50 : 80;

const monthIndex: Record<string, number> = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

export const ConductorPage = ({ headerComponent }: any) => {
  const [activeDay, setActiveDay] = useState<{
    month: string;
    day: number;
    year: number;
  }>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenContentModal, setIsOpenContentModal] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<ExternalAccount>(null);
  const [action, setAction] = useState<"Archive" | "Stream" | "Share">(null);
  const [titleInput, setTitleInput] = useState("");
  const [token, setToken] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [privacy, setPrivacy] = useState<'public'|'private'>('public');
  const [isOpenSelectAccountModal, setIsOpenSelectAccountModal] =
    useState(false);
  const [selectedAssetToShareId, setSelectedAssetToShareId] =
    useState<number>(null);

  const sheetRef = useRef<BottomSheet>(null);
  const contentModalSheetRef = useRef<BottomSheet>(null);
  const selectAccountModalSheetRef = useRef<BottomSheet>(null);

  const [_shareApiHandler, { isLoading, isFetching }] = useShareMutation();

  const {refetch} = useGetShareListQuery({
    page: 1,
    token,
  }, {
    skip: !token? true: false
  });

  const snapPoints = useMemo(() => ["100%"], []);
  const contentModalSnapPoints = useMemo(() => ["100%"], []);
  const selectAccountModalSnapPoints = useMemo(() => ["100%"], []);

  const tokenCtx = useContext(tokenContext);
  const alrtCtx = useContext(alertContext);

  useEffect(() => {
    const getToken = async () => {
      const _tk = await retriveToken(tokenCtx);
      setToken(_tk);
    };

    getToken();
  }, []);

  const hideBottomTabbar = useCallback(() => {
    alrtCtx?.open();
  }, []);

  const showBottomSheet = useCallback(() => {
    alrtCtx?.close();
  }, []);

  const handleOnChangeBottomSheet = useCallback((index: number) => {
    if (index === -1) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const handleSelectAccountOnChangeBottomSheet = useCallback(
    (index: number) => {
      if (index === -1) {
        setIsOpenSelectAccountModal(false);
      } else {
        setIsOpenSelectAccountModal(true);
      }
    },
    []
  );

  const handleContentModalOnChangeBottomSheet = useCallback((index: number) => {
    if (index === -1) {
      setIsOpenContentModal(false);
    } else {
      setIsOpenContentModal(true);
    }
  }, []);

  const handleOpenPres = useCallback(() => {
    setIsOpen(true);
    hideBottomTabbar();

    sheetRef.current?.expand();
  }, []);

  const handleContnentModalOpenPress = useCallback(() => {
    setIsOpenContentModal(true);
    hideBottomTabbar();

    contentModalSheetRef.current?.expand();
  }, []);

  const handleSelectAccountModalOpenPress = useCallback(() => {
    setIsOpenSelectAccountModal(true);
    hideBottomTabbar();

    selectAccountModalSheetRef?.current?.expand();
  }, []);

  const handleClosePres = () => {
    showBottomSheet();
    sheetRef.current?.close();
  };

  const handleContentModalClosePres = () => {
    contentModalSheetRef.current?.close();
  };

  const handleselectAccountModalClosePress = () => {
    selectAccountModalSheetRef?.current?.close();
  };

  const closeFormModalAndOpenContenModal = () => {
    handleContnentModalOpenPress();
  };

  const addAssetHandler = (assetId: number) => {
    if (!assetId) {
      return;
    }
    setSelectedAssetToShareId(assetId);
    handleContentModalClosePres();
  };

  const setSelectedChannelHandler = (account: ExternalAccount) => {
    setSelectedChannel(account);
    handleselectAccountModalClosePress();
  };


  const shwoInputValue = action === "Stream";

  const showYoutubeFields = action === "Share";

  const createConductorHandler = async () => {
    if (!selectedChannel) {
      _toaster.show("Please select a channel to continue");
      return;
    }
    if (!selectedAssetToShareId) {
      _toaster.show("Please select a content to continue");
      return;
    }

    if (!action) {
      _toaster.show("Please select an action to continue");
      return;
    }

    if (action === "Stream" && !titleInput) {
      _toaster.show("Please insert title");
      return;
    }

    if (!activeDay?.year || !activeDay?.month || !activeDay?.day) {
      _toaster.show("Please select a date to continue");
      return;
    }

    const asset = selectedAssetToShareId;
    const account = selectedChannel?.id;

    const __monthIndex = monthIndex[activeDay?.month];

    const times = [
      `${activeDay?.year}-${__monthIndex}-${activeDay?.day} 00:00:00`,
    ];

    let requestBody;

    let url;

    // Google Drive
    if (action === "Archive") {
      url = "/share/google-drive";
      requestBody = {
        asset,
        account,
        times,
      };
    }

    // Youtube
    if (action == "Share") {
      url = "/share/youtube";
      requestBody = {
        asset,
        account,
        title: titleInput,
        description: descriptionInput,
        times,
        privacy
      };
    }

    // Stream(RTMP)
    if (action === "Stream") {
      url = "/share/stream";
      requestBody = {
        asset,
        account,
        times,
      };
    }

    const response = await _shareApiHandler({ token, url, body: requestBody });
    console.log(response)
    if (response?.error) {
      _toaster.show("Failed");
    }
    if (response?.data) {
      _toaster.show("Shared successfully");
      handleClosePres();
      await refetch();
    }
  };



  return (
    <>
      <FlatList
        data={[]}
        style={{}}
        ListHeaderComponentStyle={{
          flex: 1,
          height: 200,
        }}
        onEndReachedThreshold={4}
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
              <Calendar setActiveDay={setActiveDay} />
              <AddUpcommingButton
                title="Add channel"
                handler={handleOpenPres}
              />
              <ShareList token={token} />
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
            onChange={handleOnChangeBottomSheet}
            handleComponent={null}
            backgroundStyle={{
              backgroundColor: BOTTOM_SHEET_BLUR_BG,
            }}
          >
            <BottomSheetScrollView
              style={{
                flex: 1,
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
                  handleSelectAccountModalOpenPress={
                    handleSelectAccountModalOpenPress
                  }
                  setTitleInput={setTitleInput}
                  setDescriptionInput={setDescriptionInput}
                  showTitleInput={shwoInputValue}
                  showYoutubeFields={showYoutubeFields}
                  setAction={setAction}
                  isLoading={isLoading || isFetching}
                  createConductorHandler={createConductorHandler}
                  setPrivacy={setPrivacy}
                />
              </BlurView>
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      ) : null}
      {isOpenContentModal ? (
        <View style={styles.contentModalContainer}>
          <BottomSheet
            ref={contentModalSheetRef}
            snapPoints={contentModalSnapPoints}
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
              <SelectContentModal
                closeModalHandler={handleContentModalClosePres}
                addAssetHandler={addAssetHandler}
              />
            </LinearGradient>
          </BottomSheet>
        </View>
      ) : null}
      {isOpenSelectAccountModal ? (
        <View style={styles.contentModalContainer}>
          <BottomSheet
            ref={selectAccountModalSheetRef}
            snapPoints={selectAccountModalSnapPoints}
            onChange={handleSelectAccountOnChangeBottomSheet}
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
              <SelectAccountModal
                closerHandler={handleselectAccountModalClosePress}
                setSelectedChannel={setSelectedChannelHandler}
              />
            </LinearGradient>
          </BottomSheet>
        </View>
      ) : null}
    </>
  );
};

const CreateConductorForm = memo(CreateConductorFormMemo);
const AddUpcommingButton = memo(BorderButton);
