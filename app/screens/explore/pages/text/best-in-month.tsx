import { useNavigation } from '@react-navigation/native'
import { Title } from '../../../../components/title';
import { PROFILE_TWO, TEXT_SLIDER_ITEM_GRADIENT } from '../../../../constaints/images';
import { UserNameCard } from '../../../../components/username-card';
import { Box } from '../../../../components/box';
import { Text } from '../../../../types/text';
import { TextSlider } from '../../../../components/text-slider';
import { UseNavigationType } from '../../../../types/use-navigation';


type Props = {
    data: Text[]
}

export function SoundsPageBestInMonth({ data }: Props) {

    const navigation = useNavigation<UseNavigationType>()

    return (
        <Box flex={1} paddingLeft={24}>
            <Title str="Best in month" />
            <TextSlider
                data={data}
                isLoading={false}
                navigation={navigation}
            />
        </Box>
    );
}
