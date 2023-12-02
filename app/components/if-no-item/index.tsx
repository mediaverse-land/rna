import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { Box } from "../box";
import { Text } from "../text";

export const IfNoItem = ({
  dataLength,
  children,
  style,
}: {
  dataLength: number;
  children: ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <>
      {dataLength === 0 ? (
        <Box
          width="100%"
          alignItems="flex-start"
          justifyContent="center"
          marginTop={-10}
          additionalStyles={style}
          paddingTop={24}
        >
          <Text color="#fff">No item to show</Text>
        </Box>
      ) : (
        children
      )}
    </>
  );
};
