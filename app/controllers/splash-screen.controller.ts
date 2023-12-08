import * as SplashScreen from "expo-splash-screen";

export const splashScreenController = {
    hide: async() => {
        await SplashScreen.hideAsync();
    },
    preventAutoHiding: async () => {
        await SplashScreen.preventAutoHideAsync();
    }
}