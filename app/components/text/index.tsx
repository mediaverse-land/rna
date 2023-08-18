import { ReactNode } from "react";
import { Text as ReactNativeText, TextInput, TextStyle } from "react-native";

type Props = {
  children: ReactNode;
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  fontWeight?: any;
  textStyles?: TextStyle;
  isTextArea?: boolean;
};

export function Text({
  children,
  fontSize,
  lineHeight,
  color,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  fontWeight,
  textStyles,
  isTextArea,
}: Props) {
  let defaultStyles = [];

  function addDefinedStyles() {
    const styles = [
      { fontSize },
      { lineHeight },
      { color },
      { marginTop },
      { marginBottom },
      { marginLeft },
      { marginRight },
      { paddingTop },
      { paddingBottom },
      { paddingLeft },
      { paddingRight },
      { fontWeight },
    ];

    let newStyles: Record<string, string | number>[] = [];

    for (const item of styles) {
      if (typeof Object.values(item)[0] !== "undefined") {
        newStyles = [...newStyles, item];
      }
    }

    return newStyles;
  }

  defaultStyles = addDefinedStyles();

  return (
    <>
      {isTextArea ? (
        <TextInput style={[...defaultStyles, textStyles]}>{children}</TextInput>
      ) : (
        <ReactNativeText style={[...defaultStyles, textStyles]}>
          {children}
        </ReactNativeText>
      )}
    </>
  );
}