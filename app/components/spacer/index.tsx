import { Box } from '../box';

export const Spacer = ({margin = 130}:{margin?: number}) => {
  return <Box width="100%" height={margin}></Box>;
};
