import { View } from 'react-native';
import { Flex, PaddingContainer } from '../../../styles/grid';
import { AssetsComponents } from './style';
import {
    CheckboxList,
    FlatInput,
    Input,
    TextArea,
    HorizontalRadio
} from '../../../shared/components/form';
import { DatePicker } from '../../../shared/components/form/date-picker';
import { TimePicker } from '../../../shared/components/form/time-picker';
import { imageUriResolver } from '../../../utils/image-uri-resolver';
import ICON_TEXT_PNG from './../../../../assets/icons/icon__text-option-active.png';
import ICON_TEXT_ACTIVE_PNG from './../../../../assets/icons/icon__text-active.png';
import ICON_VIDEO_PNG from './../../../../assets/icons/icon__video.png';
import ICON_VIDEO_ACTIVE_PNG from './../../../../assets/icons/icon__video-option-active.png';
import ICON_SOUND_PNG from './../../../../assets/icons/icon__sound.png';
import ICON_SOUND_ACTIVE_PNG from './../../../../assets/icons/icon__sound-option-active.png';
import ICON_IMAGE_PNG from './../../../../assets/icons/icon__img.png';
import ICON_IMAGE_ACTIVE_PNG from './../../../../assets/icons/icon__image-option-active.png';
import { Box } from '../../../shared/components/box';

const ICON_TEXT = imageUriResolver(ICON_TEXT_PNG);
const ICON_TEXT_ACTIVE = imageUriResolver(ICON_TEXT_ACTIVE_PNG);
const ICON_VIDEO = imageUriResolver(ICON_VIDEO_PNG);
const ICON_VIDEO_ACTIVE = imageUriResolver(ICON_VIDEO_ACTIVE_PNG);
const ICON_SOUND = imageUriResolver(ICON_SOUND_PNG);
const ICON_SOUND_ACTIVE = imageUriResolver(ICON_SOUND_ACTIVE_PNG);
const ICON_IMAGE = imageUriResolver(ICON_IMAGE_PNG);
const ICON_IMAGE_ACTIVE = imageUriResolver(ICON_IMAGE_ACTIVE_PNG);

const { TitleText } = AssetsComponents;

const planList = ['free', 'subscribe', 'owner'];

const options = [
    {
        id: 1,
        title: 'Text',
        iconPath: ICON_TEXT,
        activeIconPath: ICON_TEXT_ACTIVE,
        iconStyle: {
            width: 18,
            height: 18
        }
    },
    {
        id: 2,
        title: 'Video',
        iconPath: ICON_VIDEO,
        activeIconPath: ICON_VIDEO_ACTIVE,
        iconStyle: {
            width: 22.24,
            height: 18
        }
    },
    {
        id: 3,
        title: 'Sound',
        iconPath: ICON_SOUND,
        activeIconPath: ICON_SOUND_ACTIVE,
        iconStyle: {
            width: 18,
            height: 18
        }
    },
    {
        id: 4,
        title: 'Image',
        iconPath: ICON_IMAGE,
        activeIconPath: ICON_IMAGE_ACTIVE,
        iconStyle: {
            width: 18,
            height: 16.19
        }
    }
];

export function CreateContentAssets() {
    return (
        <PaddingContainer style={{ paddingBottom: 24 }}>
            <Flex direction="row" justify="center" align="center">
                <TitleText>Insert your asset submit.</TitleText>
            </Flex>

            <Box marginTop={32}>
                <Input
                    labelInSeperateLine={false}
                    labelText="Asset name:"
                    placeholder="asset name..."
                />
            </Box>

            <Box marginTop={16} >
                <DatePicker />
            </Box>

            <View style={{ marginTop: 16 }}>
                <TimePicker />
            </View>
            <View style={{ marginTop: 24 }}>
                <TextArea labelText="Description:" />
            </View>

            <View style={{ marginTop: 24 }}>
                <Input
                    labelInSeperateLine={false}
                    labelText="Price:"
                    placeholder="Insert price..."
                />
            </View>

            <View style={{ marginTop: 24 }}>
                <HorizontalRadio labelText="Plan:" dataList={planList} />
            </View>

            <View style={{ marginTop: 16 }}>
                <FlatInput
                    labelInSeperateLine={false}
                    labelText="Asset name:"
                    placeholder="asset name..."
                />
            </View>
            <View style={{ marginTop: 24 }}>
                <CheckboxList
                    labelText="Permission for:"
                    optionsList={options}
                />
            </View>
        </PaddingContainer>
    );
}
