import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { CreateVideoPage } from "./pages/create-video";
import { CreateImagePage } from "./pages/create-image";
import { CreateSoundPage } from "./pages/create-sound";
import { CreateTextPage } from "./pages/create-text";

const Stack = createStackNavigator();


export function Navigator() {
    return <View style={{ width: '100%', flex: 1 }}>
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}
        >
            <Stack.Screen
                name="CreateVideoPage"
                component={CreateVideoPage}
                options={{
                    title: 'video'
                }} />
            <Stack.Screen
                name="CreateImagePage"
                component={CreateImagePage}
                options={{
                    title: 'image'
                }} />
            <Stack.Screen
                name="CreateSoundPage"
                component={CreateSoundPage}
                options={{
                    title: 'sound'
                }} />
            <Stack.Screen
                name="CreateTextPage"
                component={CreateTextPage}
                options={{
                    title: 'text'
                }} />
        </Stack.Navigator>
    </View>
}