import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from '../../../../layout/search-bar';
import { NavigationHeader } from '../../components/navigation-header';
import { PaddingContainer } from '../../../../styles/grid';
import { VideoPageBestInMonth } from './best-in-month';
import { VideoPageList } from './list';
import { VideoPageComponents } from './style';

const { ContainerStyles, FixedStyles } = VideoPageComponents

export function VideosPage({ route, navigation }: any) {
    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            <SearchBar style={FixedStyles} />
            <NavigationHeader navigation={navigation} route={route} />
            <ScrollView
                style={[
                    FixedStyles,
                    { backgroundColor: 'transparent', paddingTop: 196 }
                ]}
            >
                <PaddingContainer>
                    <VideoPageBestInMonth />
                    <VideoPageList />
                </PaddingContainer>
                <View style={{ width: '100%', height: 320 }}></View>
            </ScrollView>
        </LinearGradient>
    );
}
