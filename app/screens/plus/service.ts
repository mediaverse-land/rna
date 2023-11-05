import axios from "axios";
import { Toaster } from "../../utils/toaster";
import { UseNavigationType } from "../../types/use-navigation";
import { Logger } from "../../utils/logger";

const _toast = new Toaster();
const _logger = new Logger();

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
        "X-App": "_Android",
      },
    };

    const result__ = await axios.post(
      `https://api.mediaverse.land/v2/files`,
      formData,
      config
    );

    _logger.log(result__);
    _toast.show("Item created successfully");
    setIsLoading(false);
    return "Ok";
  } catch (err) {
    _logger.logErro(JSON.stringify(err));
    _toast.show("Item creation failed");
    setIsLoading(false);
    return "Err";
  }
};
