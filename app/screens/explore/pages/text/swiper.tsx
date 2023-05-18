import { View } from 'react-native';
import {
    PROFILE_ONE,
    TEXT_SWIPER_GRADIENT
} from '../../../../constaints/images';
import { Flex } from '../../../../styles/grid';
import { TextPageComponents } from './style';
import { UserNameCard } from '../../../../shared/components/username-card';
import { ICON_NEXT_GRAY, ICON_PREV_GRAY } from '../../../../constaints/icons';

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
    NavButtonIcon
} = TextPageComponents;

export function TextPageSwiper() {
    return (
        <SwiperContainer>
            <SwiperItem>
                <SwiperBackgroundGradient
                    source={{ uri: TEXT_SWIPER_GRADIENT }}
                />
                <SwiperItemInner>
                    <SwiperItemThumbnail
                        source={{
                            uri: 'https://s3-alpha-sig.figma.com/img/e957/3eaa/f0413870f4925ce9889005c910be2f27?Expires=1685318400&Signature=o9ku2yRRuKeHTQUBGoy190kTAzvU~mBe0AYlWnFz1afgdq1PFojxyKgTRry8E~nrfPwhSGNjc1WBF-qfC2GHWJuFD0jXlY58~MM3JEu3rHv5-6itskKUpVfhQ0D8Wz8~5m64fBCFYu5OhFYfW8JUx5YLnak0j4Nyf1865csSYUZlsq34nYE6re8u9bgnbUZeeaR~1YXjJDPfWm50zKloyZEHMadidQNnEdrD~6HgJ~2WH1d-z5plqc61f79y-4i7pDO~LoVFP1sD2ChSQFFOHsXU8lshYgNpCPWteIGriT19uPzMaSuNQyEDCVse6qhQuYnKMeyEPnopSLZ8Qb8DNw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                        }}
                    />
                    <SwiperItemTitle>Voluptate exercitation</SwiperItemTitle>
                    <SwiperItemContent>
                        Nulla Lorem mollit cupidatat irure. Laborum magna nulla
                        duis ullamco cillum dolor. Voluptate exercitation
                        incididunt aliquip deserunt reprehenderit elit laborum.
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis
                        ad et. Sunt qui esse pariatur duis deserunt mollit
                        dolore cillum minim tempor enim. Elit aute irure tempor
                        cupidatat incididunt sint deserunt ut voluptate aute id
                        deserunt
                    </SwiperItemContent>
                    <Flex
                        direction="row"
                        align="center"
                        justify="space-between"
                        style={{
                            marginTop: 16
                        }}
                    >
                        <View>
                            <UserNameCard
                                username="Ralph Edwards"
                                profileUri={PROFILE_ONE}
                                usernameStyles={{
                                    color: '#666680',
                                    marginLeft: 8
                                }}
                            />
                        </View>
                        <View>
                            <SwiperItemCreationDate>
                                November 7, 2017
                            </SwiperItemCreationDate>
                        </View>
                    </Flex>
                    <Flex
                        direction="row"
                        align="center"
                        justify="space-between"
                        height="40px"
                        style={{
                            marginTop: 24
                        }}
                    >
                        <NextButton>
                            <NavButtonIcon source={{ uri: ICON_PREV_GRAY }} />
                        </NextButton>
                        <PrevButton>
                            <NavButtonIcon source={{ uri: ICON_NEXT_GRAY }} />
                        </PrevButton>
                    </Flex>
                </SwiperItemInner>
            </SwiperItem>
        </SwiperContainer>
    );
}
