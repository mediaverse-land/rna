import { ReactNode, useEffect, useState } from "react";
import {
  TextInputProps,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Box } from "../box";
import { InputComponent } from "./style";
import { Text } from "../text";
import { theme } from "../../constaints/theme";
import { useRtl } from "../../hooks/use-rtl";
import { ICON_ARROW_DOWN_SVG, ICON_FORM_ERROR } from "../../constaints/icons";

const {  Label } = InputComponent;

const IS_IOS = Platform.OS === 'ios'

type Props = {
  labelText: string;
  placeholder?: string;
  labelIcon?: ReactNode;
  additionalProps?: TextInputProps;
  hasError?: boolean;
  value?: any;
  isTextArea?: boolean;
  showBorder?: boolean;
  options: string[]
  setSelected: (...args: any) =>void
};

export function Select({
  labelText,
  placeholder,
  labelIcon,
  hasError = false,
  value,
  isTextArea = false,
  options,
  setSelected
}: Props) {
  const { isRtl } = useRtl();

  const [isSelectBoxOpen, setIsSelectBoxOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
  }, []);

  const selectOptionHandler = (item: string) => {
    setSelectedOption(item);
    setSelected(item)
    setIsSelectBoxOpen(false);
  };

  return (
    <>
      <Box width="100%" direction="row-reverse">
        {!isTextArea ? (
          <Label>
            <Box
              height="100%"
              additionalStyles={[
                IS_IOS
                  ? {
                      height: 50,
                      paddingLeft: 16,
                      paddingTop: 22,
                    }
                  : {
                      borderRightWidth: 1,
                      borderRightColor: theme.color.light.WHITE,
                    },
              ]}
            >
              <Text
                fontSize={14}
                lineHeight={theme.numericLineHeight.md}
                color={"#fff"}
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
        <TouchableOpacity
          style={{
            width: "100%",
          }}
          activeOpacity={1}
          onPress={() => setIsSelectBoxOpen(!isSelectBoxOpen)}
        >
          <Box
            width="100%"
            height={48}
            backgroundColor="rgba(28, 28, 35, 0.75)"
            borderRadius={8}
            paddingLeft={82}
            paddingRight={16}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="#4E4E61" fontSize={16} fontWeight={400}>
              {selectedOption || placeholder}
            </Text>
            <ICON_ARROW_DOWN_SVG />
          </Box>
        </TouchableOpacity>
      </Box>
      {isSelectBoxOpen ? (
        <Box
          id="select-box"
          backgroundColor="rgba(28, 28, 35, 0.75)"
          paddingRight={14}
          paddingLeft={14}
          width="100%"
          marginTop={8}
          additionalStyles={{
            borderWidth: 1,
            borderColor: "#353542",
          }}
          borderRadius={8}
        >
          {options.map((item: string, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => selectOptionHandler(item)}
              >
                <Box
                  width="100%"
                  height={48}
                  direction="row"
                  alignItems="center"
                >
                  <Text
                    color={theme.color.light.WHITE}
                    fontSize={14}
                    fontWeight={400}
                  >
                    {item}
                  </Text>
                </Box>
              </TouchableOpacity>
            );
          })}
        </Box>
      ) : null}
      {hasError ? (
        <ICON_FORM_ERROR
          width={18.21}
          height={16}
          style={{
            position: "absolute",
            right: 16,
            top: 16,
          }}
        />
      ) : null}
    </>
  );
}
