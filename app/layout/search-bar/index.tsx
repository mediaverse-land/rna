import { ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { SearchBarComponents } from './style';

type Props = {
    style: ViewStyle;
};

const { Container, SearchInput } = SearchBarComponents;

export function SearchBar({ style }: Props) {
    return (
        <BlurView intensity={100} tint="dark" style={[Container, style]}>
            <SearchInput placeholder="Search" placeholderTextColor="#83839C" />
        </BlurView>
    );
}
