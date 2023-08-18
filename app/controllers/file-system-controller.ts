import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

const ENCODING_OPTIONS = { encoding: FileSystem.EncodingType.Base64 };
const BUFFER_TEXT_OPTION = 'base64'

export class FileSystemController {
  constructor() {
    //
  }

  async convertFileToBase64(fileUri: string) {
    console.log({fileUri})
    const result = await FileSystem.readAsStringAsync(
      fileUri,
      ENCODING_OPTIONS
    );

    return result
  }

  async convertTextToBase64(text: string){
    const result = new Buffer(text).toString(BUFFER_TEXT_OPTION);
    return result;
  }
}

