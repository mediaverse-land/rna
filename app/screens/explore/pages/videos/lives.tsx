import { FC } from "react";
import { Title } from "../../../../components/title";
import { Box } from "../../../../components/box";
import { useRtl } from "../../../../hooks/use-rtl";
import { RenderIf } from "../../../../components/render-if";
import { FlatList } from "react-native";
import { Live } from "../../../../types/live";
import { HorizontalSlide } from "../../../../components/horizontal-slider/slide";
import { PROFILE_ONE } from "../../../../constaints/images";
import { LIVES, SINGLE_LIVE_SCREEN } from "../../../../constaints/consts";
import { useNavigation } from "@react-navigation/native";
import { UseNavigationType } from "../../../../types/use-navigation";

type Props = {
  data: Live[];
  isLoading: boolean;
  disableOnIntractions?: boolean;
};

export const VideosPageLives: FC<Props> = ({
  data,
  isLoading,
  disableOnIntractions = false,
}) => {
  const { isRtl } = useRtl();
  const navigation = useNavigation<UseNavigationType>();

  const handleRedirect = (id: number) => {
    if (disableOnIntractions) {
      return;
    }
    navigation.navigate(SINGLE_LIVE_SCREEN, {
      id,
    });
  };

  const renderItems = ({ item }: { item: Live }) => {
    return (
      <HorizontalSlide
        id={item.id}
        title={item.title}
        thumbnailPath={item.thumbnail}
        username={null}
        profileUri={null}
        type={null}
        isRtl={isRtl}
        slidePressRedirectHandler={() => handleRedirect(item.id)}
      />
    );
  };

  const keyExtractor = (item: Live) => item.id.toString();

  return (
    <Box paddingLeft={24} paddingRight={isLoading && 24}>
      <Box marginRight={32}>
        <Title str={LIVES} />
      </Box>
      <Box marginTop={24}>
        <RenderIf condition={isLoading}>
          <FlatList
            horizontal
            data={data}
            renderItem={renderItems}
            keyExtractor={keyExtractor}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        </RenderIf>
      </Box>
    </Box>
  );
};
