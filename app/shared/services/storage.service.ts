import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from '../../utils/logger';

export class StorageService {
    async set(key: string, value: any) {
        try {
            const valueToJson = JSON.stringify(value);
            await AsyncStorage.setItem(key, valueToJson);
        } catch (er) {
            logger.log(er);
        }
    }

    async get(key: string) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (er) {
            logger.log(er);
        }
    }

    async getKeysList() {
        try {
            const value = await AsyncStorage.getAllKeys();
            return value;
        } catch (er) {
            logger.log(er);
        }
    }

    async removeItem(key: string) {
        try {
            await AsyncStorage.removeItem(key);
        } catch (er) {
            logger.log(er);
        }
    }
}
