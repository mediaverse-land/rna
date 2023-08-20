import { FC } from "react";
import { ImagesPageComponents } from "./style";
import { Title } from "../../../../components/title";
import { Box } from "../../../../components/box";
import { useRtl } from "../../../../hooks/use-rtl";
import { RenderIf } from "../../../../components/render-if";
import { FlatList } from "react-native";
import { Live } from "../../../../types/live";
import { HorizontalSlide } from "../../../../components/horizontal-slider/slide";
import { LIVES, SINGLE_LIVE_SCREEN } from "../../../../constaints/consts";
import { UseNavigationType } from "../../../../types/use-navigation";

const { DailyRecomended } = ImagesPageComponents;

type Props = {
  data: Live[];
  isLoading: boolean;
  disableOnIntractions?: boolean;
  navigation: UseNavigationType;
};

export const AllPageLives: FC<Props> = ({
  data,
  isLoading,
  disableOnIntractions = false,
  navigation,
}) => {
  const { isRtl } = useRtl();

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

  const viewMoreNavigationHandler = () => {
    // navigation.navigate("livesView");
  };

  return (
    <Box marginLeft={24} marginTop={40}>
      <Box marginRight={32}>
        <Title
          str={LIVES}
          showViewMoreButton
          navigateHandler={viewMoreNavigationHandler}
        />
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
