import { View } from 'react-native';
import { Title } from '../../../../shared/components/title';
import { HorizontalSlider } from '../../../../shared/components/horizontal-slider';
import { bestIMonthVideosMockData } from './mock-data/video-mock-data';

export function VideoPageBestInMonth() {
    return (
        <View>
            <Title str="Best in month" />
            <View style={{ marginTop: 24 }}>
                <HorizontalSlider data={bestIMonthVideosMockData} />
            </View>
        </View>
    );
}
