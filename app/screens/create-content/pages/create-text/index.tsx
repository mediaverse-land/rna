import { useState } from 'react';
import { CreateTextContent } from './content';
import { CreateTextContentAssets } from './assets';
import { ScrollView } from 'react-native-gesture-handler';

export function CreateTextPage() {
    const [isContentDataSaved, setIsContentDataSaved] = useState(true);

    function activeIsContentDataSaved() {
        setIsContentDataSaved(true);
    }

    return (
        <ScrollView>
            {!isContentDataSaved ? (
                <CreateTextContent />
            ) : (
                <CreateTextContentAssets />
            )}
        </ScrollView>
    );
}
