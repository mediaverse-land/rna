import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Flex, PaddingContainer } from '../../../../styles/grid';
import { TextPageComponents } from './style';
import { UserNameCard } from '../../../../components/username-card';
import { theme } from '../../../../constaints/theme';
import { Text } from '../../../../types/text';
import { formatDate } from '../../../../utils/format-date';
import { ICON_PREV_TEXT, ICON_NEXT_TEXT } from '../../../../constaints/icons';
import { PROFILE_ONE, TEXT_SWIPER_GRADIENT } from '../../../../constaints/images';

type Props = {
  data: Text[];
};

const {
  SwiperContainer,
  SwiperItem,
  SwiperBackgroundGradient,
  SwiperItemInner,
  SwiperItemThumbnail,
  SwiperItemTitle,
  SwiperItemContent,
  SwiperItemCreationDate,
  NextButton,
  PrevButton,
} = TextPageComponents;

export function TextPageSwiper({ data }: Props) {
  if (data.length === 0) {
    return null;
  }

  const [currentSlide, setCurrentSlide] = useState<Text | any>();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    setCurrentSlide(data[currentSlideIndex]);
  }, [currentSlideIndex]);

  const thumbnail = currentSlide?.asset?.thumbnail?.thumbnails['852x480'] || '';
  const title = currentSlide?.asset?.name || '';
  const description = currentSlide?.asset?.description || '';
  const date = currentSlide?.created_at && formatDate(currentSlide.created_at);

  const nextSlideHandler = () => {
    if (currentSlideIndex === data.length - 1) {
      return;
    }
    setCurrentSlideIndex((slide) => slide + 1);
  };

  const prevSlideHandler = () => {
    if (currentSlideIndex === 0) {
      return;
    }
    setCurrentSlideIndex((slide) => slide - 1);
  };

  return (
    <PaddingContainer>
      <SwiperContainer>
        <SwiperItem>
          <SwiperBackgroundGradient source={{ uri: TEXT_SWIPER_GRADIENT }} />
          <SwiperItemInner>
            <SwiperItemThumbnail
              source={{
                uri: thumbnail,
              }}
            />
            <SwiperItemTitle>{title}</SwiperItemTitle>
            <SwiperItemContent>{description}</SwiperItemContent>
            <Flex
              direction="row"
              align="center"
              justify="space-between"
              style={{
                marginTop: 16,
              }}
            >
              <View>
                <UserNameCard
                  username="Ralph Edwards"
                  profileUri={PROFILE_ONE}
                  usernameStyles={{
                    color: theme.color.light.TEXT,
                    marginLeft: 8,
                  }}
                />
              </View>
              <View>
                <SwiperItemCreationDate>{date}</SwiperItemCreationDate>
              </View>
            </Flex>
            <Flex
              direction="row"
              align="center"
              justify="space-between"
              height="40px"
              style={{
                marginTop: 24,
              }}
            >
              <NextButton onPress={nextSlideHandler}>
                <ICON_PREV_TEXT
                  style={{
                    width: 7.8,
                    height: 14,
                  }}
                />
              </NextButton>
              <PrevButton onPress={prevSlideHandler}>
                <ICON_NEXT_TEXT
                  style={{
                    width: 7.8,
                    height: 14,
                  }}
                />
              </PrevButton>
            </Flex>
          </SwiperItemInner>
        </SwiperItem>
      </SwiperContainer>
    </PaddingContainer>
  );
}
