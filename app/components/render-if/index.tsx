import { ReactNode } from 'react';
import { Box } from '../box';
import { ActivityIndicator } from 'react-native';

export const RenderIf = ({
  condition,
  children,
  paddingLeft,
  paddingRight,
}: {
  condition: boolean;
  children: ReactNode;
  paddingLeft?: number;
  paddingRight?: number;
}) => {
  return (
    <>
      {condition ? (
        <Box
          width="100%"
          height={200}
          alignItems="center"
          justifyContent="center"
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
        >
          <ActivityIndicator />
        </Box>
      ) : (
        children
      )}
    </>
  );
};
