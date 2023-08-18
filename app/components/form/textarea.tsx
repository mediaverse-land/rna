// import { ReactNode, useState } from "react";
// import { TextInputProps } from "react-native";
// import { Box } from "../box";
// import { InputComponent } from "./style";
// import { Text } from "../text";
// import { theme } from "../../constaints/theme";
// import { LayoutChangeEvent } from "react-native";
// import { useRtl } from "../../hooks/use-rtl";
// import { ICON_FORM_ERROR } from "../../constaints/icons";

// const { TextareaBox, Label } = InputComponent;

// type Props = {
//   labelText: string;
//   placeholder?: string;
//   labelIcon?: ReactNode;
//   inputMode?:
//     | "decimal"
//     | "email"
//     | "none"
//     | "numeric"
//     | "search"
//     | "tel"
//     | "text"
//     | "url";
//   additionalProps?: TextInputProps;
//   hasError?: boolean;
//   onBlur?: any;
//   onChangeText?: any;
//   value?: any;
// };

// export function Textarea({
//   labelText,
//   placeholder,
//   labelIcon,
//   additionalProps,
//   hasError = false,
//   onBlur,
//   onChangeText,
//   value,
// }: Props) {
//   const [labelWidth, setLabelWidth] = useState<number>(0);

//   const { isRtl } = useRtl();

//   return (
//     <>
//       <Box width="100%" direction="row-reverse">
//         <Label
//           onLayout={(e: LayoutChangeEvent) => {
//             const { width } = e.nativeEvent.layout;
//             setLabelWidth(Math.floor(width));
//           }}
//         >
//           <Box
//             height="100%"
//             additionalStyles={{
//               borderRightWidth: 1,
//               borderRightColor: theme.color.light.WHITE,
//             }}
//           >
//             <Text
//               isTextArea={true}
//               fontSize={14}
//               lineHeight={theme.numericLineHeight.md}
//               color={theme.color.light.TEXT}
//               paddingRight={!isRtl ? 16 : 0}
//               paddingLeft={isRtl ? 16 : 0}
//             >
//               {labelIcon ? (
//                 <Box marginTop={10} paddingTop={20}>
//                   {labelIcon}
//                 </Box>
//               ) : null}
//               <Text>
//                 {labelIcon ? "   " : null}
//                 {labelText}
//               </Text>
//             </Text>
//           </Box>
//         </Label>
//         <TextareaBox
//           placeholder={placeholder}
//           placeholderTextColor={theme.color.light.INPUT_PLACEHOLDER}
//           style={{
//             paddingLeft: labelWidth,
//           }}
//           hasError={hasError}
//           textAlign={isRtl ? "right" : "left"}
//           {...additionalProps}
//           onBlur={onBlur}
//           onChangeText={onChangeText}
//           value={value}
//         />
//       </Box>
//       {hasError ? (
//         <ICON_FORM_ERROR
//           width={18.21}
//           height={16}
//           style={{
//             position: "absolute",
//             right: 16,
//             top: 16,
//           }}
//         />
//       ) : null}
//     </>
//   );
// }
