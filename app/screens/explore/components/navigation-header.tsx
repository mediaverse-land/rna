import { Dimensions, Image, ImageStyle, Text } from 'react-native';
import { NavigationHeaderComponents } from './style';
import {
    ICON_IMAGE_GRAY,
    ICON_SOUND_GRAY,
    ICON_TEXT_GRAY,
    ICON_VIDEO_GRAY
} from '../../../constaints/icons';
// import ''

type Routes = {
    id: number;
    name: string;
    title?: string;
    iconPath?: string;
    iconStyles?: ImageStyle;
};

type Props = {
    navigation: any;
    route: any;
};

const routes: Routes[] = [
    {
        id: 1,
        title: 'All',
        name: 'AllPage'
    },
    {
        id: 2,
        name: 'ImagesPages',
        title: 'ImagesPage',
        iconPath: ICON_IMAGE_GRAY,
        iconStyles: { width: 16, height: 16 }
    },
    {
        id: 5,
        name: 'VideosPage',
        title: 'VideosPage',
        iconPath: ICON_VIDEO_GRAY,
        iconStyles: { width: 19.76, height: 16 }
    },
    {
        id: 4,
        name: 'SoundsPage',
        title: 'SoundPage',
        iconPath: ICON_SOUND_GRAY,
        iconStyles: { width: 16, height: 14.39 }
    },
    {
        id: 3,
        name: 'TextsPage',
        title: 'TextPage',
        iconPath: ICON_TEXT_GRAY,
        iconStyles: { width: 16, height: 16 }
    },
];

const { Container, Wrapper, Tab } = NavigationHeaderComponents;

const width = Dimensions.get('window').width;

export function NavigationHeader({ navigation, route }: Props) {

    const navigateToRouteHandler = (routeName: string) => {
        console.log(routeName);

        if (navigation) {
            navigation.push(routeName);
        }
    };

    const renderRoutes = routes.map((item) => {
        const routeName = item.name;
        const textColor = route.name === routeName ? '#fff' : '#666680';

        console.log(routeName);

        return (
            <Tab
                key={item.id}
                style={{
                    width: `${100 / routes.length}%`
                }}
                onPress={() => navigateToRouteHandler(routeName)}
            >
                {item.iconPath ? (
                    <Image
                        source={{ uri: item.iconPath }}
                        style={[item.iconStyles]}
                    />
                ) : (
                    <Text style={{ color: textColor }}>
                        {item.title || 'Sample'}
                    </Text>
                )}
            </Tab>
        );
    });

    return (
        <Container>
            <Wrapper
                style={[
                    {
                        width: Math.floor(width) - 48
                    }
                ]}
            >
                {renderRoutes}
            </Wrapper>
        </Container>
    );
}
