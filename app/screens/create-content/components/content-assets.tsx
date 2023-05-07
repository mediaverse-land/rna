import { View } from 'react-native'
import { Flex, PaddingContainer } from '../../../styles/grid'
import { AssetsComponents } from './style'
import { Input } from '../../../shared/components/form'
import { DatePicker } from '../../../shared/components/form/date-picker'
import { TimePicker } from '../../../shared/components/form/time-picker'

const { TitleText } = AssetsComponents

export function CreateContentAssets() {

    return (
        <PaddingContainer>
            {/* title start */}
            <Flex
                direction='row'
                justify='center'
                align='center'
            >
                <TitleText>Insert your asset submit.</TitleText>
            </Flex>
            {/* title end */}

            <View style={{ marginTop: 32 }}>
                <Input
                    labelInSeperateLine={false}
                    labelText='Asset name:'
                />
            </View>

            <View style={{ marginTop: 16 }}>
                <DatePicker />
            </View>

            <View style={{ marginTop: 16 }}>
                <TimePicker />
            </View>
        </PaddingContainer >
    )
}
