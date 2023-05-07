import { Image } from "react-native";
import { Flex, PaddingContainer } from "../../../../styles/grid";
import { CreateContentLandingPageComponents } from "./style";
import { imageUriResolver } from "../../../../utils/image-uri-resolver";
import ICON_VIDEO_PNG from './../../../../../assets/icons/icon__video.png'
import ICON_IMAGE_PNG from './../../../../../assets/icons/icon__img.png'
import ICON_SOUND_PNG from './../../../../../assets/icons/icon__sound.png'
import ICON_TEXT_PNG from './../../../../../assets/icons/icon__text.png'

const ICON_VIDEO = imageUriResolver(ICON_VIDEO_PNG)
const ICON_IMAGE = imageUriResolver(ICON_IMAGE_PNG)
const ICON_SOUND = imageUriResolver(ICON_SOUND_PNG)
const ICON_TEXT = imageUriResolver(ICON_TEXT_PNG)

const {
    Container,
    CreateContentItem,
    ItemText,
    TitleText
} = CreateContentLandingPageComponents


export function CreateContentLandingPage() {
    return (
        <PaddingContainer style={{ flex: 1 }}>
            <Container>
                <Flex
                    direction="row"
                    align="center"
                    justify="center"
                >
                    <TitleText>What is your contant?</TitleText>
                </Flex>
                <Flex
                    direction="row"
                    align="center"
                    justify="center"
                    height="127px"
                    style={{ marginTop: 48 }}
                >
                    <CreateContentItem>
                        <Image
                            source={{ uri: ICON_VIDEO }}
                            style={{
                                width: 25.9,
                                height: 23,
                                marginBottom: 8
                            }}
                        />
                        <ItemText>VIDEO</ItemText>
                    </CreateContentItem>
                    <CreateContentItem
                        style={{ marginLeft: 16 }}
                    >
                        <Image
                            source={{ uri: ICON_IMAGE }}
                            style={{
                                width: 26,
                                height: 26,
                                marginBottom: 8
                            }}
                        />
                        <ItemText>PICTURE</ItemText>
                    </CreateContentItem>
                </Flex>

                <Flex
                    direction="row"
                    align="center"
                    justify="center"
                    height="127px"
                    style={{ marginTop: 16 }}
                >
                    <CreateContentItem>
                        <Image
                            source={{ uri: ICON_TEXT }}
                            style={{
                                width: 26,
                                height: 26,
                                marginBottom: 8
                            }}
                        />
                        <ItemText>TEXT</ItemText>
                    </CreateContentItem>
                    <CreateContentItem
                        style={{ marginLeft: 16 }}
                    >
                        <Image
                            source={{ uri: ICON_SOUND }}
                            style={{
                                width: 28,
                                height: 26,
                                marginBottom: 8
                            }}
                        />
                        <ItemText>SOUND</ItemText>
                    </CreateContentItem>
                </Flex>
            </Container>
        </PaddingContainer>
    )
}