import { FlatList } from "react-native";
import { HorizontalSliderComponents } from "./style";
import { HorizontalSlide } from "./slide";
import { useNavigation } from "@react-navigation/native";
import { Asset } from "../../types/asset";
import { PROFILE_ONE } from "../../constaints/images";
import { UseNavigationType } from "../../types/use-navigation";
import { Sound } from "../../types/sound";
import { Text } from "../../types/text";

type ContentType = 1 | 2 | 3 | 4;

export type HorizontailSlideType = {
  id: number;
  title: string;
  thumbnailPath: string;
  username: string;
  profileUri: string;
  slidePressRedirectHandler?: () => void;
  type?: ContentType;
};

type Props = {
  data: Asset[] | Sound[] | Text[] | any;
  navigationScreenName?: string;
  isRtl?: boolean;
  disableOnIntractions?: boolean;
};

const { Wrapper } = HorizontalSliderComponents;

const contentTypeMapperToScreenMapper = (type: ContentType) => {
  const screens = {
    1: "SingleTextScreen",
    2: "SingleImageScreen",
    3: "SingleSoundScreen",
    4: "SingleVideoScreen",
  };

  return screens[type] || null;
};

export function HorizontalSlider({
  data,
  isRtl,
  disableOnIntractions = false,
}: Props) {
  const navigation = useNavigation<UseNavigationType>();

  function slidePressRedirectHandler(
    id: number,
    name: string,
    contentType: ContentType,
    asset_username: string,
    asset_user_image_url: string
  ) {
    if (disableOnIntractions) {
      return;
    }
    const screen = contentTypeMapperToScreenMapper(contentType);

    if (screen) {
      navigation.navigate(screen, {
        id: id,
        asset_username,
        isOwner: false,
        asset_user_image_url,
        name,
      });
    }
  }

  const renderItem = ({ item }: { item: Asset | Sound | Text | any }) => {
    const thumbUri =
    item?.asset?.thumbnails["525x525"]||
      item?.asset?.thumbnails["336x366"] ||
      item.asset?.thumbnails["226x226"] 

      // type Size = '1080x1080' |'226x226' | '336x366' | '340x220' | '523x304' | '525x525' |
      // '648x651'

    const title = item.name || item?.asset?.name;
    const type = item?.asset?.type || item.type;
    const username = item?.asset?.user?.username || "Mahdi Alipoor";
    const asset_user_image_url = item?.asset?.user?.image_url || PROFILE_ONE;

    return (
      <HorizontalSlide
        id={item.id}
        title={title}
        thumbnailPath={thumbUri}
        username={username}
        profileUri={PROFILE_ONE}
        type={type}
        isRtl={isRtl}
        slidePressRedirectHandler={() =>
          slidePressRedirectHandler(
            item.id,
            title,
            type,
            username,
            asset_user_image_url
          )
        }
      />
    );
  };

  const keyExtractor = (item: Asset) => item.id.toString();

  return (
    <Wrapper>
      <FlatList
        data={data}
        horizontal
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </Wrapper>
  );
}
