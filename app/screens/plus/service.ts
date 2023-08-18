import axios from "axios";
import { Toaster } from "../../utils/toaster";
import { UseNavigationType } from "../../types/use-navigation";

const _toast = new Toaster();

type Args = {
  token: string;
  asset_id: number;
  input: any;
  setIsLoading: (args: boolean) => void;
};

export const uploadHandler = async ({
  token,
  asset_id,
  input,
  setIsLoading,
}: Args) => {
  try {
    const formData = new FormData();

    formData.append("file", input.base64);
    formData.append("asset", asset_id.toString());

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        "X-App": "_ReactNative",
      },
    };

    const result__ = await axios.post(
      `https://api.mediaverse.land/v2/files`,
      formData,
      config
    );

    console.log(result__);
    _toast.show("Item created successfully");
    setIsLoading(false);
    return "Ok";
  } catch (err) {
    console.log(JSON.stringify(err));
    _toast.show("Item creation failed");
    setIsLoading(false);
    return "Err";
  }
};
