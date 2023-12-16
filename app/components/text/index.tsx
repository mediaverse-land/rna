import { ReactNode, useMemo } from 'react';
import { Text as ReactNativeText, TextInput, TextStyle } from 'react-native';

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
  selectable?: boolean;
  fontFamily?: string;
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
  fontFamily,
  textStyles,
  isTextArea,
  selectable = false,
}: Props) {
  const styles: any = useMemo(() => {
    return {
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
      fontFamily,
    };
  }, []);

  return (
    <>
      {isTextArea ? (
        <TextInput style={[styles, textStyles]}>{children}</TextInput>
      ) : (
        <ReactNativeText selectable={selectable} style={[styles, textStyles]}>
          {children}
        </ReactNativeText>
      )}
    </>
  );
}
