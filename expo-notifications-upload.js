const { Expo } = require('expo-server-sdk');
const serviceAccount = require('./path/to/service-account.json');

const expo = new Expo({ 
  accessToken: serviceAccount.private_key,
});

const uploadPushCredentials = async () => {
  await expo.uploadPushCredentialsAsync({
    android: {
      fcmApiKey: serviceAccount.private_key,
    },
    // ios: {
    //   apnsKeyP8: serviceAccount.private_key,
    //   apnsKeyId: serviceAccount.private_key_id,
    //   teamId: serviceAccount.client_email,
    //   // Optionally, you can provide the app bundle identifier
    //   bundleIdentifier: 'your-bundle-identifier',
    // },
  });
  console.log('Push credentials uploaded successfully!');
};

uploadPushCredentials();
