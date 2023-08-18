import { useContext, useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Coachmark, CoachmarkComposer } from "react-native-coachmark";
import { Box } from "../../../components/box";
import { Flex, PaddingContainer } from "../../../styles/grid";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { windowSize } from "./../../../utils/window-size";
import { ICON_PROFILE_SETTINGS_SVG } from "../../../constaints/icons";
import { UseNavigationType } from "../../../types/use-navigation";
import { LoadingSpinner } from "../../../components/loader-spinner";
import { User } from "../../../types/user";
import { userContext } from "../../../context/user";
import { PROFILE_IMAGE } from "../../../constaints/images";
import { getProfileStaticsApiHandler } from "../service";
import { tokenContext } from "../../../context/token";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import { ProfileStatic } from "../../../types/profile-static";
import { StorageService } from "../../../services/storage.service";
import { HAS_USER_SEEN_PROFILE_HEADER_TOUR } from "../../../constaints/consts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import {
  activeDisableOnIntractions,
  deActivrDisableOnIntractions,
  seeProfileHeaderTour,
} from "../../../slices/tour.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setPage } from "../../../slices/profile.slicer";
import { useGetUserProfileQuery } from "../../../services/profile.service";

const initialState: ProfileStatic = {
  assets: null,
  audios: null,
  images: null,
  sales_number: null,
  sales_volume: null,
  texts: null,
  videos: null,
};

const { width: windowWidth, height: windowHeight } = windowSize();
const usernameBoxWidth = Math.floor(windowWidth) - 184;

const STATICS_TOUR_GUIDE =
  "How many products do you have? How much did you sell and...? You can see all this in the statistics";
const SETTINGS_TOUR_GUIDE =
  "In the account, you can edit your name, username, password and everything you entered during registration or log out of your !account";

const CoachmarkWrapper: any = Coachmark;

const _storageService = new StorageService();

const SUBSCRIPTION_OWNER_TAB_STYLES = {
  fontSize: 14,
  fontWeight: 14,
  lineHeight: 16,
  activeColor: "#D9D9FF",
  deActiveColor: "#666680",
};

const subscriptionOwnerTabItems = [
  {
    id: 1,
    title: "Subscribe",
    path: "ProfileSubscribeScreen",
  },
  {
    id: 2,
    title: "Ownership",
    path: "ProfileOwnershipScreen",
  },
];

export function ProfileScreenHead() {
  const navigation = useNavigation<UseNavigationType>();
  const userCtx = useContext(userContext);
  const tokenCtx = useContext(tokenContext);
  const dispatch = useDispatch<AppDispatch>();

  const [allowIntraction, setAllowIntraction] = useState(false);
  const [token,setToken] = useState('')

  const [profileStaticsData, setProfileStaticsData] =
    useState<ProfileStatic>(initialState);

  const { DISABLE_INTRACTION } = useSelector(
    (store: RootState) => store.tourSlice
  );

  const { ACTIVE_PAGE }: { ACTIVE_PAGE: "subscribe" | "ownership" } =
    useSelector((store: RootState) => store.profileSlice);

  const staticsRef = useRef();
  const settingsRef = useRef();

  const user: User = userCtx.getUser();

  const isFocused = useIsFocused();

  if (!user) {
    return (
      <Box
        width="100%"
        height={windowHeight}
        alignItems="center"
        justifyContent="center"
      >
        <LoadingSpinner color="red" />
      </Box>
    );
  }

  const {data, isLoading, isError, isFetching, error} = useGetUserProfileQuery({token},
    // pollingInterval: 3000,
    // refetchOnMountOrArgChange: true,
    // skip: false,

    );

  console.log({data, isLoading, isError, isFetching, error})

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    const token = await tokenCtx.getToken();

    if (token === null) {
      return;
    }

    const formattedToken = tokenStringResolver(token);
    setToken(formattedToken)

    // await getProfileStaticsData(formattedToken);
  };

  // const getProfileStaticsData = async (token: string) => {
  //   const { isError, res, isSuccess } = await getProfileStaticsApiHandler(
  //     token
  //   );

  //   if (isError || !isSuccess) {
  //     return;
  //   }

  //   const { data } = res;
  //   setProfileStaticsData(data);
  // };

  const settingsScreenRedirect = () => {
    if (!allowIntraction) {
      return;
    }
    if (DISABLE_INTRACTION) {
      return;
    }
    navigation.navigate("Settings");
  };

  const userProfileData = [
    {
      id: 1,
      value: data?.assets || 0,
      title: "Assets",
    },
    {
      id: 2,
      value: data?.sales_number || 0,
      title: "Sales",
    },
    {
      id: 3,
      value: data?.sales_volume || 0,
      title: "Volume",
    },
  ];

  const setTourStateTrueHandler = () => {
    dispatch(seeProfileHeaderTour());
  };

  const hasUserSeenTour = async () => {
    const res = await _storageService.get(HAS_USER_SEEN_PROFILE_HEADER_TOUR);
    if (res) {
      setAllowIntraction(true);
    }
    const hasSeen = res ? true : false;

    if (hasSeen) {
      setTourStateTrueHandler();
    }
    return hasSeen;
  };

  const _userSeenTourHandler = async () => {
    await _storageService.set(
      HAS_USER_SEEN_PROFILE_HEADER_TOUR,
      HAS_USER_SEEN_PROFILE_HEADER_TOUR
    );
    setTourStateTrueHandler();
  };

  const setupTour = async () => {
    const hasSeen = await hasUserSeenTour();
    if (hasSeen) {
      return;
    }

    if (staticsRef?.current && settingsRef?.current) {
      setTimeout(() => {
        dispatch(activeDisableOnIntractions());
        const composer = new CoachmarkComposer([staticsRef, settingsRef]);
        composer.show().then(async () => {
          await _userSeenTourHandler();
          dispatch(deActivrDisableOnIntractions());
          setAllowIntraction(true);
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setupTour();
    }
  }, [staticsRef, settingsRef, isFocused]);

  // id 1 === Subscribe
  // id 2 === owner
  const handleProfilePage = (id: number) => {
    if (id === 1) {
      dispatch(setPage("subscribe"));
    }
    if (id === 2) {
      dispatch(setPage("ownership"));
    }
  };

  return (
    <Box
      width={"100%"}
      backgroundColor="rgba(14, 14, 18, 0.5)"
      borderBottomLeftRadius={32}
      borderBottomRightRadius={32}
    >
      <Box width={"100%"} height={88}>
        <LinearGradient
          colors={["#204cb4", "#b3c4ea"]}
          start={{ x: 0.6, y: 0.2 }}
          end={{ x: 0.1, y: 0.2 }}
          style={{
            width: "100%",
            height: 82,
          }}
        />
      </Box>
      <Box width={"100%"}>
        <LinearGradient
          colors={["#0a0a2f", "#0b0b30"]}
          start={{ x: 0.7, y: 0.2 }}
          end={{ x: 0.1, y: 0.2 }}
          style={{
            width: "100%",
            height: 247,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }}
        >
          <Box width="100%" height={91.25} paddingLeft={24} paddingRight={24}>
            <Flex
              width="100%"
              height="91.25px"
              direction="row"
              justify="space-between"
              align="center"
            >
              <Box
                width={88}
                height={88}
                borderRadius={100}
                paddingBottom={10}
                paddingRight={10}
                paddingLeft={10}
                paddingTop={10}
                backgroundColor="#0B0B30"
                position="relative"
                top={-14}
                left={-15}
              >
                <Image
                  source={{
                    uri: PROFILE_IMAGE,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                  }}
                />
              </Box>
              <Box width={usernameBoxWidth}>
                <Box direction="row">
                  <Text
                    color={theme.color.light.WHITE}
                    fontWeight={600}
                    fontSize={theme.numericFontSize.md}
                  >
                    {user.username}
                  </Text>
                </Box>
                <Box direction="row">
                  <Text
                    color={theme.color.light.LIGHT_DESCRIPTION}
                    fontSize={theme.numericFontSize.sm}
                    fontWeight={400}
                    marginTop={4}
                  >
                    {user.email}
                  </Text>
                </Box>
              </Box>
              {/* Settings button */}
              <CoachmarkWrapper
                allowBackgroundInteractions={false}
                ref={settingsRef}
                message={SETTINGS_TOUR_GUIDE}
              >
                <Box
                  width={48}
                  height={48}
                  borderRadius={16}
                  borderColor={theme.color.light.INPUT_PLACEHOLDER}
                  backgroundColor="rgba(14, 14, 18, 0.5)"
                  additionalStyles={{
                    overflow: "hidden",
                  }}
                >
                  <Flex
                    align="center"
                    justify="center"
                    width="48px"
                    height="48px"
                  >
                    {/*  */}
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={settingsScreenRedirect}
                    >
                      <ICON_PROFILE_SETTINGS_SVG
                        style={{
                          width: 19.2,
                          height: 20,
                          position: "relative",
                        }}
                      />
                    </TouchableOpacity>
                    {/*  */}
                  </Flex>
                </Box>
              </CoachmarkWrapper>
            </Flex>
          </Box>

          {/* Statics */}
          <CoachmarkWrapper ref={staticsRef} message={STATICS_TOUR_GUIDE}>
            <Box width="100%" position="relative">
              {/*  */}
              <Box
                position="relative"
                width="100%"
                height={100}
                paddingLeft={24}
                paddingRight={24}
              >
                <Flex
                  width="100%"
                  height="100px"
                  direction="row"
                  align="center"
                  justify="space-between"
                >
                  {userProfileData.map((data) => (
                    <Box
                      key={data.id}
                      backgroundColor="#181839"
                      width="30%"
                      height={68}
                      borderRadius={16}
                    >
                      <Box
                        position="absolute"
                        height={1}
                        width={46}
                        backgroundColor={theme.color.light.PRIMARY}
                        left="29%"
                      ></Box>
                      <Flex
                        width="100%"
                        height="68"
                        align="center"
                        justify="center"
                      >
                        <Text
                          color={theme.color.light.CARD_TITLE_TEXT}
                          fontSize={theme.numericFontSize.md}
                          lineHeight={20}
                        >
                          {data.title === "Volume"
                            ? `${data.value} $`
                            : data.value}
                        </Text>
                        <Text
                          color={theme.color.light.LIGHT_DESCRIPTION}
                          fontSize={theme.numericFontSize.sm}
                          lineHeight={12}
                          marginTop={4}
                        >
                          {data.title}
                        </Text>
                      </Flex>
                    </Box>
                  ))}
                </Flex>
              </Box>
              {/*  */}
            </Box>
          </CoachmarkWrapper>

          <PaddingContainer>
            <Box
              id="subscription-owner-tab"
              width="100%"
              direction="row"
              justifyContent="space-evenly"
              marginTop={20}
            >
              {subscriptionOwnerTabItems.map((item) => {
                const activeSubscribeItem =
                  (item.id === 1 && ACTIVE_PAGE === "subscribe") || false;
                const activeOwnershipItem =
                  (item.id === 2 && ACTIVE_PAGE === "ownership") || false;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={1}
                    onPress={() => handleProfilePage(item.id)}
                  >
                    <Box
                      paddingBottom={16}
                      additionalStyles={{
                        borderBottomWidth:
                          activeSubscribeItem || activeOwnershipItem ? 2 : 0,
                        borderBottomColor:
                          activeSubscribeItem || activeOwnershipItem
                            ? theme.color.light.PRIMARY
                            : 'transparent',
                      }}
                    >
                      <Text
                        color={
                          activeSubscribeItem || activeOwnershipItem
                            ? SUBSCRIPTION_OWNER_TAB_STYLES.activeColor
                            : SUBSCRIPTION_OWNER_TAB_STYLES.deActiveColor
                        }
                        fontSize={SUBSCRIPTION_OWNER_TAB_STYLES.fontSize}
                        lineHeight={SUBSCRIPTION_OWNER_TAB_STYLES.lineHeight}
                        fontWeight={SUBSCRIPTION_OWNER_TAB_STYLES.fontWeight}
                      >
                        {item.title}
                      </Text>
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </Box>
          </PaddingContainer>
        </LinearGradient>
      </Box>
    </Box>
  );
}

// @Mahdi1212
