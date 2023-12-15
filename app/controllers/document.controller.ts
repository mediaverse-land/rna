import * as DocumentPicker from "expo-document-picker";

export class DocumentController {

  // Select and upload a document from user mobile
  async pick(acceptableTypes: string[]){
    try {
      return await DocumentPicker.getDocumentAsync({
        type: acceptableTypes,
      });
    } catch (err) {
      return "err";
    }
  }
}

