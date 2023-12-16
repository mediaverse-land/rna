import * as Google from "expo-auth-session/providers/google";
import { enviroments } from "../../enviroments/enviroments";


export const useGoogleSignin = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [request, response, promptAsync]: any = Google.useAuthRequest({
      androidClientId: enviroments.REACT_APP_ANDROID_CLIENT_ID,
      iosClientId: enviroments.REACT_APP_IOS_CLIENT_ID,
      expoClientId: enviroments.REACT_APP_EXPO_CLIENT_ID,
      scopes: enviroments.GOOGLE_AUTH_SCOPE,
    });
  
    return [response, promptAsync];
  };
  