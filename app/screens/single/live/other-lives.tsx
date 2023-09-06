import { FC, useCallback } from "react";
import { Live } from "../../../types/live";
import { useRtl } from "../../../hooks/use-rtl";
import { OTHER_CAHNNELS } from "../../../constaints/consts";
import { HorizontalSlide } from "../../../components/horizontal-slider/slide";
import { Box } from "../../../components/box";
import { Title } from "../../../components/title";
import { RenderIf } from "../../../components/render-if";
import { FlatList } from "react-native-gesture-handler";

type Props = {
  data: Live[];
  isLoading: boolean;
  disableOnIntractions?: boolean;
  handleRedirect: any;
};
``;
export const SingleLiveOtherLives: FC<Props> = ({
  data,
  isLoading,
  handleRedirect,
}) => {
  const { isRtl } = useRtl();

  const renderItems = ({ item, index }: { item: Live; index: number }) => {
    return (
      <Box marginLeft={index === 0 ? 24 : 0}>
        <HorizontalSlide
          id={item.id}
          title={null}
          thumbnailPath={item.thumbnail}
          username={null}
          profileUri={null}
          type={null}
          isRtl={isRtl}
          slidePressRedirectHandler={() => handleRedirect(item.id)}
        />
      </Box>
    );
  };

  const _keyExtractor = useCallback((item: Live) => item.id.toString(), []);

  return (
    <Box marginTop={40}>
      <Box paddingLeft={14}>
        <Title str={OTHER_CAHNNELS} />
      </Box>

      <Box marginTop={24}>
        <RenderIf condition={isLoading}>
          <FlatList
            horizontal
            data={data}
            renderItem={renderItems}
            keyExtractor={_keyExtractor}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
          <Box width="100%" height={100}></Box>
        </RenderIf>
      </Box>
    </Box>
  );
};
