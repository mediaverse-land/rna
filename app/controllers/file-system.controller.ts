import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

const ENCODING_OPTIONS = { encoding: FileSystem.EncodingType.Base64 };
const BUFFER_TEXT_OPTION = 'base64'

export class FileSystemController {
  constructor() {
    //
  }

  async convertFileToBase64(fileUri: string) {
    if(!fileUri){
      return;
    }
    try{
      const result = await FileSystem.readAsStringAsync(
        fileUri,
        ENCODING_OPTIONS
      );
  
      return result
    }
    catch(err){
      console.log(err)
    }
  }

  // async convertTextToBase64(uri: string){
  //   try{
  //     return await FileSystem.readAsStringAsync(
  //       uri,
  //       ENCODING_OPTIONS
  //     );
  //   }
  //   catch(err){
  //     console.log(err)
  //     return 'err'
  //   }
  // }

  async convertTextToBase64(text: string){
    const result = new Buffer(text).toString(BUFFER_TEXT_OPTION);
    return result;
  }
}

