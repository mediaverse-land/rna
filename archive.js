  // usePreventScreenCapture();

  useEffect(() => {
    registerForPushNotificationsAsync();
    const unsubscribe: any =
      Notifications.addNotificationReceivedListener(handleNotification);

    return () => {
      unsubscribe();
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo push token:", token);

    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).update({
      pushToken: token,
    });

    firebase
      .messaging()
      .subscribeToTopic("all")
      .then(() => console.log('Subscribed to topic "all"'))
      .catch((error: any) =>
        console.log('Failed to subscribe to topic "all":', error)
      );
  }

  function handleNotification(notification: any) {
    console.log("Notification received:", notification);
    Notifications.setBadgeCountAsync(notification.data.badge);
  }






  //////////////////////

  import { View, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { AllPageMostViewed } from "./most-viewed";
import { AllPageTopTenText } from "./top-ten-texts";
import { AllPageChillSongs } from "./chill-songs";
import { VirtualizedList } from "../../../../components/virtualized-list";
import { FocusedStatusBar } from "../../../../components/focused-statusbar";
import { AllPageLives } from "./lives";
import { AppDispatch, RootState } from "../../../../store";
import { ImagesPageComponents } from "./style";
import {
  useGetChillSongsQuery,
  useGetLivesQuery,
  useGetMostViewdImagesQuery,
  useGetTopTenTextsQuery,
} from "../../../../services/explore.service";

const { ContainerStyles } = ImagesPageComponents;

export function AllPage() {
  const {
    data: _livesData,
    isError: _isLivesError,
    isSuccess: _isLivesSuccess,
    isLoading: _isLivesLoading,
    refetch: refreshLives,
  } = useGetLivesQuery();

  const {
    data: _imagesData,
    isError: _isImagesError,
    isSuccess: _isImagesSuccess,
    isLoading: _isImagesLoading,
    error: _imagesError,
    refetch: refetchImages,
  } = useGetMostViewdImagesQuery();

  const {
    data: _topTenTextData,
    isError: _isTopTenTextError,
    isSuccess: _isTopTenTextSuccess,
    isLoading: _isTopTenTextLoading,
    error: _topTenTextError,
    refetch: refetchTopTenText,
  } = useGetTopTenTextsQuery();

  const {
    data: _chillSongsData,
    isError: _isChillSongsError,
    isSuccess: _isChillSongsSuccess,
    isLoading: _isChillSongsLoading,
    error: _chillSongsError,
    refetch: regreshChillSongs,
  } = useGetChillSongsQuery();

  const { DISABLE_INTRACTION } = useSelector(
    (state: RootState) => state.tourSlice
  );

  const onRefreshHandler = async () => {
    refreshLives();
    refetchImages();
    refetchTopTenText();
    regreshChillSongs();
  };

  return (
    <>
      <FocusedStatusBar color="#0c0c21" />
      <LinearGradient
        style={[ContainerStyles]}
        colors={["#030340", "#030340"]}
        start={{ x: 0.7, y: 0 }}
      >
        <VirtualizedList paddingTop={160} onRefresh={onRefreshHandler}>
          {/* Lives  */}

          <AllPageLives
            isLoading={_isLivesLoading}
            data={_livesData || []}
            disableOnIntractions={DISABLE_INTRACTION}
          />
          <AllPageMostViewed
            isLoading={_isImagesLoading}
            data={_imagesData || []}
            disableOnIntractions={DISABLE_INTRACTION}
          />
          <AllPageTopTenText
            isLoading={_isTopTenTextLoading}
            data={_topTenTextData || []}
            disableOnIntractions={DISABLE_INTRACTION}
          />
          <AllPageChillSongs
            isLoading={_isChillSongsLoading}
            data={_chillSongsData || []}
          />
          <View style={styles.space}></View>
        </VirtualizedList>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 196,
    backgroundColor: "transparent",
  },
  space: {
    width: "100%",
    height: 350,
  },
});















