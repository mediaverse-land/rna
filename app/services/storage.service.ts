import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from '../utils/logger';

const logger = new Logger();
export class StorageService {
  async set(key: string, value: string) {
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
