import { Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from "../../layout/header";

export function SingleImagePage() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <Text>SingleImagePage</Text>
            <Text>SingleImagePage</Text>
            <Text>SingleImagePage</Text>
            <Text>SingleImagePage</Text>
        </SafeAreaView>
    )
}