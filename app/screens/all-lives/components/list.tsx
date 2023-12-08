import { useCallback } from "react";
import { useSelector } from "react-redux";
import { UseNavigationType } from "../../../types/use-navigation";
import { RootState } from "../../../store";
import { useGetSearchLiveQuery } from "../../../services/live.service";
import { SINGLE_LIVE_SCREEN } from "../../../constaints/consts";
import { Live } from "../../../types/live";
import { Image, TouchableOpacity, View } from "react-native";
import { Box } from "../../../components/box";
import { Text } from "../../../components/text";
import { theme } from "../../../constaints/theme";
import { ICON_LIVE_CHANNELS } from "../../../constaints/icons";
import { PaddingContainer } from "../../../styles/grid";
import { RenderIf } from "../../../components/render-if";
import { FlashList } from "@shopify/flash-list";

export const AllLiveList = ({
  navigation,
}: {
  navigation: UseNavigationType;
}) => {
  const { search_params } = useSelector((state: RootState) => state.liveSlice);

  const { data, isLoading, isFetching } = useGetSearchLiveQuery({
    lang: search_params?.selectedLanguage?.toLowerCase() || null,
    country: search_params?.selectedCountry?.toLowerCase() || null,
    title: search_params?.title || "",
  });

  const navigateToLivePage = (id: number) => {
    navigation.navigate(SINGLE_LIVE_SCREEN, {
      id,
    });
  };

  const renderItem = useCallback(({ item }: { item: Live }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigateToLivePage(item.id)}
      >
        <Box
          borderRadius={16}
          width="100%"
          marginBottom={8}
          backgroundColor="rgba(78, 78, 97, 0.50)"
          borderColor="#CFCFFC4D"
          position="relative"
          direction="row"
          alignItems="center"
          padding={16}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={{ width: 88, height: 48, borderRadius: 8 }}
          />
          <Box marginLeft={16}>
            <Text
              color={theme.color.light.WHITE}
              fontWeight={600}
              fontSize={16}
              lineHeight={16}
              textStyles={{
                height:20,
                paddingTop:5
              }}
            >
              {item.title}
            </Text>

            <Text
              marginTop={8}
              color={theme.color.light.TEXT}
              fontWeight={400}
              fontSize={12}
              lineHeight={16}
            >
              {item.country}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    );
  }, []);

  const _keyExtractor = useCallback((item: Live) => item.id.toString(), []);

  return (
    <Box width="100%" flex={1}>
      <Box
        id="title"
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop={28}
      >
        <ICON_LIVE_CHANNELS
          style={{
            marginRight: 8,
          }}
        />
        <Text
          color={theme.color.light.WHITE}
          fontWeight={600}
          fontSize={16}
          lineHeight={16}
          textStyles={{
            height: 20,
            paddingTop:7
          }}
        >
          live channel
        </Text>
      </Box>
      <Box id="list" marginTop={32}>
        <PaddingContainer>
          <RenderIf condition={isLoading || isFetching}>
            {data?.length ? (
              <View style={{ minHeight: 200 }}>
                <FlashList
                  data={data}
                  keyExtractor={_keyExtractor}
                  renderItem={renderItem}
                  estimatedItemSize={25}
                />
              </View>
            ) : null}
            <Box width="100%" height={150}></Box>
          </RenderIf>
        </PaddingContainer>
      </Box>
    </Box>
  );
};
