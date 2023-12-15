
# Mediaverse

Mediaverse Platform is the next generation of media asset management tools for social TVs (or social media) that helps users manage the content cycle from procurement (or production) to distribution.

---

## Application setup

Mediaverse mobile application is developed under React native Expo managed workflow system. To start develop the app, follow the bellow steps.

The first step to running mediaverse locally is downloading node_modules dependencies by running:

```sh
yarn install
```

Then run the application via Expo go:

```sh
yarn start
```

### Codebase

#### Technologies

Codebase common technologies are listed bellow:

**React Native**: We use React native to develop our Android and Ios applications

**Expo**: Application is develop in Expo managed workflow

**Typescript**: Codebase is written is typescript


### Folder structure

```sh
Mediaverse/
├── app
    ├── components
    ├── constaints # Including image paths, svg paths, errors and messages, icons and constaints
    ├── context # Common contexts which are used in all parts of application
    ├── controllers # Core modules and common utility injectors
    ├── helpers # Core modules and common utility injectors
    ├── hooks # Core modules and common utility injectors
    ├── layout # Layout views
    ├── screens # Main pages
    ├── services # Api services
    ├── slices # App states
    ├── store # Redux implementation
    ├── styles # Common shared and reusable styles
    ├── types
    ├── utils
├── assets
├── enviroments   # Application variables
```

### Enviroment variables

```sh
EXPO_APPBASE_URL=
EXPO_APP_ANDROID_CLIENT_ID=
EXPO_APP_IOS_CLIENT_ID=
EXPO_APP_EXPO_CLIENT_ID=
EXPO_APP_WEB_CLIENT_SECTET=
#Firebase
EXPO_APP_FIREBASE_API_KEY=
EXPO_APP_AUTH_DOMAIN=
EXPO_APP_DATABASE_URL=
EXPO_APP_PROJECT_ID=
EXPO_APP_STORAGE_BUCKET=
EXPO_APP_MESSAGING_SENDER_ID=
EXPO_APP_FIREBASE_APP_ID=
EXPO_APP_FIREBASE_MESUREMENT_ID=
```

### Attention
Please download the google-services.json and GoogleService-Info.plist from your firebase console and attach them in root of project. And add your own eas.json file to root of your project