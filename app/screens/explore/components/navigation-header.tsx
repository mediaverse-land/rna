import { Dimensions, ViewStyle } from 'react-native'
import { NavigationHeaderComponents } from "./style"

type Props = {
    style: ViewStyle
}

const width = Dimensions.get('window').width
const { Container }: any = NavigationHeaderComponents

export function NavigationHeader({ style }: Props) {
    return (
        <Container style={[{
            width: Math.floor(width) - 48
        }, style]}>
        </Container>
    )
}