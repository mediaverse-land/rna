import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Box } from "../../../../components/box";
import { theme } from "../../../../constaints/theme";
import { Text } from "../../../../components/text";
import { RenderIfWithoutLoading } from "../../../../components/render-if-without-loading";
import { RadioButton } from "../../../../components/form";
import { Button } from "../../../../components/button";

const recordLiveOptions: Record<string, string[]> = {
  recordDurationOptions: ["10 minutes", "20 minutes", "30 minutes", "1 hour"],
  recordDelayOptions: ["Right now", "10 minutes", "20 minutes", "30 minutes"],
};

// Values are in minutes
const durationKeys: Record<string, number> = {
  "10 minutes": 10,
  "20 minutes": 20,
  "30 minutes": 30,
  "1 hour": 60,
};

type Props = {
  bottomSheetRef: BottomSheet | any;
  // Length in minutes
  recoedLiveHandler: (length: number) => void;
  isLoading: boolean
};

/**
 * 
 * @param recoedLiveHandler : (length: minutes) => length  
 * @param isLoading true while submiting record api  
 */
export const SingleLiveRecordBottomSheet = ({
  bottomSheetRef,
  recoedLiveHandler,
  isLoading
}: Props) => {
  // Record duration. for example: start record until 20 minutes
  const [duration, setDuration] = useState(
    recordLiveOptions.recordDurationOptions[0]
  );

  // Record delay. for example: start record after 20 minutes
  //   const [delay, setDelay] = useState(recordLiveOptions.recordDelayOptions[0]);

  const selectDurationOption = (option: string) => {
    setDuration(option);
  };

  //   const selectDelayOption = (option: string) => {
  //     setDelay(option);
  //   };

  const recordVideoSubmitHandler = async() => {
    const selectedDurationValue = durationKeys[duration];
    await recoedLiveHandler(selectedDurationValue);
  };

  const snapPoints = useMemo(() => [430], []);

  return (
    <RenderIfWithoutLoading condition={bottomSheetRef ? true : false}>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleComponent={null}
        backgroundStyle={styles.bottomSheet}
      >
        <BottomSheetScrollView style={styles.bottomSheetView}>
          <Title />
          <Box width="100%" flex={1} marginTop={24}>
            <RadioButton
              labelText="Record duration"
              dataList={recordLiveOptions.recordDurationOptions}
              defaultOption={recordLiveOptions.recordDurationOptions[0]}
              getSelectedOption={(option: string | boolean | any) => {
                selectDurationOption(option);
              }}
            />
            {/* <Input labelText="Or add duration manually"/> */}
            <Button
              marginTop={40}
              text="Start recoring"
              varient="primary"
              size="lg"
              borderRadius={16}
              onpressHandler={recordVideoSubmitHandler}
              isLoading={isLoading}
            />
            {/* <Box width="100%" height={60}></Box> */}
          </Box>
        </BottomSheetScrollView>
      </BottomSheet>
    </RenderIfWithoutLoading>
  );
};

const Title = () => {
  return (
    <Box id="title">
      <Text
        color={theme.color.light.WHITE}
        fontSize={16}
        fontWeight={500}
        lineHeight={16}
      >
        Record live
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  bottomSheetView: {
    position: "absolute",
    backgroundColor: theme.color.light.ADD_ACCOUNT_MODAL_BAKGROUND,
    top: 0,
    left: 0,
    width: "100%",
    height: 430,
    zIndex: 1000,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
    padding: 24,
  },
  bottomSheet: {
    backgroundColor: theme.color.light.ADD_ACCOUNT_MODAL_BAKGROUND,
  },
});
