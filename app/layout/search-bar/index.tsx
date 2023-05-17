import { View, ViewStyle } from 'react-native';
import { SearchBarComponents } from './style';
// import { BlurView } from '@react-native-community/blur';
// import styled from 'styled-components/native';

type Props = {
    style: ViewStyle;
};

const { Container, SearchInput } = SearchBarComponents;

// const BlurBox = styled(BlurView)`
//     width: 100%;
//     height: 50px;
// `

export function SearchBar({ style }: Props) {
    return (
        <View style={[Container, style]}>
            <SearchInput placeholder="Search" placeholderTextColor="#83839C" />
        </View>
    );
}
