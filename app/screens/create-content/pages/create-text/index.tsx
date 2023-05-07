import { useState } from 'react';
import { CreateTextContent } from './content';
import { CreateContentAssets } from './assets';
import { ScrollView } from 'react-native-gesture-handler';

export function CreateTextPage() {
    const [isContentDataSaved, setIsContentDataSaved] = useState(false);

    function activeIsContentDataSaved() {
        setIsContentDataSaved(true)
    }

    return (
        <ScrollView>
            {!isContentDataSaved ?
                <CreateTextContent /> :
                <CreateContentAssets />
            }
        </ScrollView>
    );
}
