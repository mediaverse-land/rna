import { ReactNode, useCallback, useState } from "react";
import { StyleSheet, TextInputProps } from "react-native";
import { Box } from "../box";
import { InputComponent } from "./style";
import { Text } from "../text";
import { theme } from "../../constaints/theme";
import { LayoutChangeEvent } from "react-native";
import { useRtl } from "../../hooks/use-rtl";
import { ICON_FORM_ERROR } from "../../constaints/icons";
import { isIos } from "../../controllers/platform.controller";

const { InputBox, Label } = InputComponent;

const isIOS = isIos();

type Props = {
  labelText?: string;
  placeholder?: string;
  labelIcon?: ReactNode;
  inputMode?:
    | "decimal"
    | "email"
    | "none"
    | "numeric"
    | "search"
    | "tel"
    | "text"
    | "url";
  additionalProps?: TextInputProps;
  hasError?: boolean;
  onBlur?: any;
  onChangeText?: any;
  value?: any;
  isTextArea?: boolean;
  showBorder?: boolean;
  varient?: "bordered-light" | "flat-dark";
  height?: number;
  defaultValue?: string| number;
};

export function Input({
  labelText,
  placeholder,
  labelIcon,
  additionalProps,
  hasError = false,
  onBlur,
  onChangeText,
  value,
  isTextArea = false,
  inputMode,
  showBorder = true,
  varient = "bordered-light",
  defaultValue,
  height,
}: Props) {
  const [labelWidth, setLabelWidth] = useState<number>(0);

  const [textAreaState, setTextAreaState] = useState({ height: 100 });

  const { isRtl } = useRtl();

  const inputChangeContentSizeDetectHandler = useCallback((event: any) => {
    if (!isTextArea) {
      return;
    }
    setTextAreaState({
      height: event.nativeEvent.contentSize.height,
    });
  }, []);


  const possibleVarients: Record<"bordered-light" | "flat-dark", any> = {
    "bordered-light": {
      labelWrapperStyles: [
        isIOS
          ? {
              height: 50,
              paddingLeft: 16,
              paddingTop: 19,
            }
          : {
              borderRightWidth: 1,
              borderRightColor: theme.color.light.WHITE,
            },
      ],
      labelColor: "#fff",
      inputPlaceholderColor: isTextArea
        ? theme.color.light.INPUT_PLACEHOLDER
        : labelWidth
        ? theme.color.light.INPUT_PLACEHOLDER
        : "transparent",
      inputStyles: {
        paddingLeft: isTextArea ? 12 : labelWidth,
        height: isTextArea
          ? textAreaState.height < 100
            ? 100
            : textAreaState.height
          : 48,
        padding: isTextArea ? 12 : 0,
        textAlignVertical: isTextArea ? "top" : "center",
        paddingTop: 5,
      },
    },
    "flat-dark": {
      labelWrapperStyles: [
        isIOS
          ? {
              height: 50,
              paddingLeft: 16,
              paddingTop: 20,
            }
          : {
              height: 50,
              paddingLeft: 16,
              paddingTop: 25,
            },
      ],
      labelColor: "#353542",
      inputPlaceholderColor: isTextArea
        ? theme.color.light.INPUT_PLACEHOLDER
        : labelWidth
        ? theme.color.light.INPUT_PLACEHOLDER
        : "transparent",
      inputStyles: [
        {
          paddingLeft: isTextArea ? 12 : labelWidth,
          height: isTextArea
            ? textAreaState.height < 100
              ? 100
              : textAreaState.height
            : 48,
          padding: isTextArea ? 12 : 0,
          borderColor: "#353542",
          backgroundColor: "rgba(14, 14, 18, 0.50)",
          textAlignVertical: isTextArea ? "top" : "center",
        },
        isIOS ? { paddingTop: 2 } : { paddingTop: 12 },
      ],
    },
  };

  const currentVarient = possibleVarients[varient];

  return (
    <>
      <Box width="100%" direction="row-reverse">
        {!isTextArea && labelText ? (
          <Label
            isIOS={isIOS}
            onLayout={(e: LayoutChangeEvent) => {
              const { width } = e.nativeEvent.layout;
              setLabelWidth(Math.floor(width));
            }}
          >
            <Box
              height="100%"
              additionalStyles={currentVarient.labelWrapperStyles}
            >
              <Text
                fontSize={14}
                lineHeight={theme.numericLineHeight.md}
                color={currentVarient.labelColor}
                paddingRight={!isRtl ? 16 : 0}
                paddingLeft={isRtl ? 16 : 0}
              >
                {labelIcon ? (
                  <Box marginTop={10} paddingTop={20}>
                    {labelIcon}
                  </Box>
                ) : null}
                <Text>
                  {labelIcon ? "   " : null}
                  {labelText}
                </Text>
              </Text>
            </Box>
          </Label>
        ) : null}
        <InputBox
          placeholder={placeholder}
          placeholderTextColor={currentVarient.labelColor}
          showBorder={showBorder}
          defaultValue={defaultValue}
          style={[
            currentVarient.inputStyles,
            !labelText && { paddingLeft: 16 },
            height && { height },
            {
              textAlignVertical: "top",
            },
            isTextArea && {
              paddingTop: 16,
            },
          ]}
          hasError={hasError}
          textAlign={isRtl ? "right" : "left"}
          onBlur={onBlur}
          onContentSizeChange={inputChangeContentSizeDetectHandler}
          onChangeText={onChangeText}
          value={value}
          multiline={isTextArea}
          {...additionalProps}
        />
      </Box>
      {hasError ? (
        <ICON_FORM_ERROR width={18.21} height={16} style={styles.iconStyles} />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  iconStyles: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});
