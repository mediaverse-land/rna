import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "../../../components/text";
import { reportAssetApiHandler } from "../service";
import { tokenStringResolver } from "../../../utils/token-string-resolver";
import { tokenContext } from "../../../context/token";
import { LoadingSpinner } from "../../../components/loader-spinner";
import { Box } from "../../../components/box";
import { Toaster } from "../../../utils/toaster";

type Props = {
  openReportModal: boolean;
  ref: any;
};

const reportItems = [
  {
    id: 1,
    fa_title: "محتوای آزاردهنده",
    en_title: "Disturbing content",
  },
  {
    id: 2,
    fa_title: "محتوای جنسی",
    en_title: "Sexual content",
  },
  {
    id: 3,
    fa_title: "محتوای نژادپرستانه",
    en_title: "Racist content",
  },
  {
    id: 4,
    fa_title: "توهین به مذهبی ها",
    en_title: "Insulting religious people",
  },
  {
    id: 5,
    fa_title: "توهین به سیاست",
    en_title: "Insulting politics",
  },
  {
    id: 6,
    fa_title: "گسترش خشونت",
    en_title: "The spread of violence",
  },
  {
    id: 7,
    fa_title: "گسترش کودک آزاری",
    en_title: "The spread of child abuse",
  },
  {
    id: 8,
    fa_title: "قلدری",
    en_title: "bullying",
  },
  {
    id: 9,
    fa_title: "محتوای نامناسب کودکان",
    en_title: "Inappropriate child content",
  },
  {
    id: 10,
    fa_title: "نقض حق نسخه برداری",
    en_title: "Copyright infringement",
  },
  {
    id: 11,
    fa_title: "تبلیغات غیرمجاز",
    en_title: "Unauthorized advertising",
  },
  {
    id: 12,
    fa_title: "حیوان آزاری",
    en_title: "animal cruelty",
  },
  {
    id: 20,
    fa_title: "دیگر",
    en_title: "Other",
  },
];

const toaster = new Toaster();

export const ReportModal = ({
  assetId,
  reportModalCloseHandler,
}: {
  assetId: number;
  reportModalCloseHandler: () => void;
}) => {
  const tokenCtx = useContext(tokenContext);
  const [isLoading, setIsLoading] = useState(false);

  const reportHandler = async (categoryId: number) => {
    setIsLoading(true);
    const token = await tokenCtx.getToken();

    if (token === null) {
      setIsLoading(false);
      return;
    }

    const formattedToken = tokenStringResolver(token);
    const { isError, res, errorRes } = await reportAssetApiHandler(
      formattedToken,
      assetId,
      categoryId
    );

    if (!isError) {
      toaster.show("Reported successfully");
    }
    setIsLoading(false);
    reportModalCloseHandler();
  };

  return (
    <ScrollView
      style={{
        width: "100%",
        height: 250,
        padding: 16,
        borderRadius: 16,
      }}
    >
      {isLoading ? (
        <LoadingSpinner color="red" />
      ) : (
        reportItems.map((r) => (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              marginBottom: 20,
            }}
            key={r.id}
            onPress={() => reportHandler(r.id)}
          >
            <Text color="#fff" fontSize={14}>
              {r.en_title}
            </Text>
          </TouchableOpacity>
        ))
      )}
      <Box width="100%" height={20}></Box>
    </ScrollView>
  );
};
