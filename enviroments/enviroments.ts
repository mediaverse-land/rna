


export const enviroments = {
  BASE_URL: proccess.env.EXPO_APPBASE_URL,
  REACT_APP_ANDROID_CLIENT_ID:proccess.env.REACT_APP_ANDROID_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID:proccess.env.REACT_APP_IOS_CLIENT_ID,
  REACT_APP_EXPO_CLIENT_ID:proccess.env.REACT_APP_EXPO_CLIENT_ID,
  REACT_APP_WEB_CLIENT_SECTET: proccess.env.REACT_APP_WEB_CLIENT_SECTET,
  GOOGLE_AUTH_SCOPE: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/youtube.upload",
  ],
};
