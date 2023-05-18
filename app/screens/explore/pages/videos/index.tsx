import { ScrollView, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SearchBar } from '../../../../layout/search-bar';
import { NavigationHeader } from '../../components/navigation-header';
import { PaddingContainer } from '../../../../styles/grid';
import { VideoPageBestInMonth } from './best-in-month';
import { VideoPageList } from './list';
import { VideoPageComponents } from './style';

const { ContainerStyles, FixedStyles } = VideoPageComponents;

export function VideosPage({ route, navigation }: any) {
    // const image = useImage(require("./../../../../../assets/img/10-profile-picture.png"));

    return (
        <LinearGradient
            style={[ContainerStyles]}
            colors={['#030340', '#030340']}
            start={{ x: 0.7, y: 0 }}
        >
            {/* <Blur /> */}

            {/* <SearchBar style={FixedStyles} /> */}
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

//           <WebView
// style={[s.absolute, s.transparent]}
// originWhitelist={['*']}
// source={{ html:
//     '<div style="' +
//     'position: absolute; top: 0; right:0; bottom: 0; left: 0;' +
//     'background: rgba(255,255,255,0.2); backdrop-filter: blur(48px);' +
//     '/*width:100%; height:100%; margin:0; padding:-10px;*/' +
//     '/*background: #ff000033;*/ /*transparent*/ /*background: #4fc3f733;*/
//     /*border: none*/" ' +
//     '></div>'
// }}
// />
