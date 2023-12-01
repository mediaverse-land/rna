import { FC, useEffect, useState } from "react";
import { Box } from "../../../components/box";
import { windowSize } from "../../../utils/window-size";
import { useGetTermsOfUseQuery } from "../../../services/auth.service";
import { ScrollView } from "react-native";
//@ts-ignore
import HTMLView from "react-native-htmlview";
import { Button } from "../../../components/button";

type Props = {
  isOpen: boolean;
  openTermsModalHandler: () => void;
  closeTermsModalHandler: () => void;
};

const { width, height } = windowSize();

const TermsOfUseModal: FC<Props> = ({
  isOpen,
  openTermsModalHandler,
  closeTermsModalHandler,
}) => {
  const [parsedData, setParesedData] = useState<any>(null);

  const { data, isLoading, isFetching } = useGetTermsOfUseQuery();

  useEffect(() => {
    if (data?.data) {
    }
  }, [data?.data]);

  if (!isOpen) {
    return;
  }

  return (
    <>
      <Box
        width="100%"
        height={height + 133}
        backgroundColor="#474755ab"
        position="absolute"
        left={0}
        top={-133}
      ></Box>

      <ScrollView
        style={{
          width: width - 48,
          position: "absolute",
          top: -70,
          backgroundColor: "#474755",
          flex: 1,
          left: 24,
          height: height - 132,
          zIndex: 1000,
          borderRadius: 16,
          paddingHorizontal: 24,
          paddingVertical: 32,
        }}
      >
        {data?.content ? (
          <>
            <HTMLView
              value={data?.content}
            />
            <Button
              marginTop={32}
              marginBottom={64}
              text="Confirm"
              varient="primary"
              onpressHandler={closeTermsModalHandler}
            />
          </>
        ) : null}
      </ScrollView>
    </>
  );
};

export default TermsOfUseModal;
