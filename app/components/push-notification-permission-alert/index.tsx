/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, TouchableOpacity } from "react-native";
import { Box } from "../box";
import { Text } from "../text";
import { theme } from "../../constaints/theme";
import { windowSize } from "../../utils/window-size";
// import { FirebasePushNotificationController } from "../../controllers/push-notification-controller";
import { StorageService } from "../../services/storage.service";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { RenderIfWithoutLoading } from "../render-if-without-loading";
import { useIsFocused } from "@react-navigation/native";
import { BackHandler } from "react-native";

type Props = {
  isAuth: boolean;
};

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = windowSize();
const NOTIFICATION_BOX_ALERT_WIDTH = WINDOW_WIDTH - 48;
const NOTIFICATION_BOX_ALERT_TOP_DISTANCE = WINDOW_HEIGHT / 2 - 100;

// const _firebasePushNotificationController =
//   new FirebasePushNotificationController();
const _storageService = new StorageService();

export function PushNotificationPermissionAlert({ isAuth }: Props) {
  const [openBox, setOpenBox] = useState(false);

  const isFocused = useIsFocused();

  BackHandler.addEventListener("hardwareBackPress", () =>
    _deviceBackButtonClickHandler()
  );

  const _deviceBackButtonClickHandler: any = () => {
    // console.log("lkfjkslf");
  };

  const hasUserSeenNotificationPermissionBox = async () => {
    const hasUserSeen = await _storageService.get(
      "HAS_USER_SEEN_NOTIFICATION_BOX"
    );
    return !!hasUserSeen;
  };

  const hasUserChangeNotificationPermission = async () => {
    const result = await _storageService.get(
      "HAS_USER_CHANGE_APP_NOTIFICATION_PERMISSION"
    );
    return !!result;
  };

  const doesAppHasPermission = async () => {
    try {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      return existingStatus === "granted";
      // const {status} = await Notifications.requestPermissionsAsync();
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    const setupNotifPermissions = async () => {
    //   const _hasPermission = await doesAppHasPermission();
      const _hasPermission = await doesAppHasPermission();
      if (_hasPermission) {
        setOpenBox(false);
        return;
      }
      setOpenBox(true);
    };

    setupNotifPermissions();
  }, []);

  function hasUserPermission() {
    if (hasUserSeenNotificationPermissionBox) {
      return;
    }

    if (hasUserChangeNotificationPermission) {
      return;
    }
  }

  const _openSettingsHandler = async () => {
    setOpenBox(false)
    // await _firebasePushNotificationController.openSettings();
  };

  const modalCloserHandler = () => setOpenBox(false);

  if (!isAuth) {
    return <></>;
  }
  return (
    <>
      <RenderIfWithoutLoading condition={openBox}>
        <Box
          width="100%"
          height="100%"
          position="absolute"
          backgroundColor="#00000080"
          zIndex={100}
          top={0}
          left={0}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={NOTIFICATION_BOX_ALERT_WIDTH}
            backgroundColor={"#fff"}
            position="relative"
            zIndex={101}
            borderRadius={16}
            padding={24}
          >
            <Box alignItems="center" justifyContent="center">
              <Text
                fontSize={16}
                fontWeight={600}
                textStyles={{
                  textAlign: "center",
                  color: theme.color.light.TEXT,
                }}
                lineHeight={20}
                marginBottom={24}
              >
                To receive push notifications, please enable notification
                permission in settings.
              </Text>
            </Box>
            <Box
              width="100%"
              id="buttons"
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Box width="50%" height={48} borderRadius={8}>
                <TouchableOpacity style={styles.buttonsTouchableOpacity} onPress={modalCloserHandler}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </Box>
              <Box
                width="50%"
                backgroundColor={theme.color.light.PRIMARY}
                height={48}
                borderRadius={8}
              >
                <TouchableOpacity
                  style={styles.buttonsTouchableOpacity}
                  onPress={_openSettingsHandler}
                >
                  <Text color={theme.color.light.WHITE}>Go to settings</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Box>
      </RenderIfWithoutLoading>
    </>
  );
}

const styles = StyleSheet.create({
  buttonsTouchableOpacity: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: "100%",
    paddingBottom: 3,
  },
});
