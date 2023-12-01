import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { Toaster } from "../../utils/toaster";
import { Alert, TouchableOpacity } from "react-native";
import { Box } from "../box";
import { windowSize } from "../../utils/window-size";
import { Text } from "../text";
import { Button } from "../button";
import { ModalBottomSheet } from "../bottom-sheet-modal";
import { View } from "react-native";
import { useClickOutside } from "react-native-click-outside";
import { theme } from "../../constaints/theme";

const _toaster = new Toaster();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const { width: WINDOW_WIDTH } = windowSize();
const NOTIFICATION_BOX_WIDTH = WINDOW_WIDTH - 48;

const PushNotificationWrapper = ({
  message,
  setMessage,
}: {
  message: any;
  setMessage: (...args: any) => void;
}) => {
  const [snapPoints, setSnapPoints] = useState(["30%"]);

  const modalWrapperRef = useClickOutside<View>(() => {
    // modalRef?.current?.close();

    modalCloser();
  });

  const modalRef = useRef<any>();

  const modalSnapPoints = useMemo(() => snapPoints, [snapPoints]);

  const open = () => {
    modalRef?.current?.open();
  };

  const modalCloser = () => {
    modalRef?.current?.close();
    setMessage(null);
  };

  useEffect(() => {
    if(message){
      open();
    }
  } ,[message])

  const title =
    message?.notification?.android?.title || message?.android?.title;
  const body = message?.notification?.android?.body || message?.android?.body;

  return (
    <>
      {message ? (
        <TouchableOpacity
          activeOpacity={1}
          style={{
            width: "100%",
            height: windowSize().height,
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100,
          }}
        ></TouchableOpacity>
      ) : null}

      <ModalBottomSheet ref={modalRef} snapPoints={modalSnapPoints}>
        <View
          ref={modalWrapperRef}
          style={{
            marginBottom: 200,
            flex: 1,
            height: 1000,
            zIndex: 10000,
          }}
        >
          <BottomSheet title={title} body={body} />
        </View>
      </ModalBottomSheet>
    </>
  );
};

const BottomSheet = ({ title, body }: { title: string; body: string }) => {
  return (
    <Box width="100%" height={170} paddingLeft={24} paddingRight={24}>
      <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
        New Notification
      </Text>
      <Box marginTop={24}>
        <Text color={theme.color.light.WHITE} fontSize={16} fontWeight={600}>
          {title}
        </Text> 
        <Text color={theme.color.light.WHITE} fontSize={14} fontWeight={600}>
          {body}
        </Text>
      </Box>
    </Box>
  );
};

export default PushNotificationWrapper;
