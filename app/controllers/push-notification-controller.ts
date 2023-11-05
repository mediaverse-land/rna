import {Linking, Platform} from "react-native";
import {startActivityAsync} from "expo-intent-launcher";
import * as IntentLauncher from "expo-intent-launcher";
import * as Application from "expo-application";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import {Toaster} from "../utils/toaster";
import {err} from "react-native-svg/lib/typescript/xml";

interface IFirebasePushNotificationController {
    isDev: boolean;
    config: () => void;
    openSettings: () => Promise<void>;
    requestUserPermission: () => Promise<boolean>;
}

const _toaster = new Toaster();

export class FirebasePushNotificationController implements IFirebasePushNotificationController {
    isDev: boolean;

    config(): void {
    }

    async openSettings(): Promise<void> {
        try {
            if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
            } else {
                await startActivityAsync(
                    IntentLauncher.ActivityAction.APP_NOTIFICATION_SETTINGS,
                    {
                        extra: {'android.provider.extra.APP_PACKAGE': Application.applicationId}
                    },
                )
            }
        } catch (err) {
            console.log(err)
        }
    }

    async requestUserPermission(): Promise<boolean> {
        try {
            await this.openSettings();
            const authStatus = await messaging().requestPermission();
            const enabled =
                authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                authStatus === messaging.AuthorizationStatus.PROVISIONAL;

            if (enabled) {
                console.log("Authorization status:", authStatus);
            }
            return enabled;
        } catch (err) {
            console.log(err)
            return false
        }
    }
}
