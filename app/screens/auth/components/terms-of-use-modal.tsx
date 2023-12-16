import { FC } from 'react';
import { ScrollView, Text, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import HTMLView from 'react-native-htmlview';
import { Box } from '../../../components/box';
import { windowSize } from '../../../utils/window-size';
import { useGetTermsOfUseQuery } from '../../../services/auth.service';
import { Button } from '../../../components/button';
import { FullScreenSpinnerLoader } from '../../../components/loader-spinner';

type Props = {
  isOpen: boolean;
  openTermsModalHandler: () => void;
  closeTermsModalHandler: () => void;
};

const { width, height } = windowSize();

const TermsOfUseModal: FC<Props> = ({ isOpen, closeTermsModalHandler }) => {
  const { data, isLoading, isFetching, error } = useGetTermsOfUseQuery();

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

      <View
        style={{
          width: width - 48,
          position: 'absolute',
          top: -70,
          backgroundColor: '#474755',
          flex: 1,
          left: 24,
          height: height - 132,
          zIndex: 1000,
          borderRadius: 16,
          paddingHorizontal: 24,
          // paddingVertical: 32,
          paddingTop: 32,
        }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          {isLoading || isFetching ? <FullScreenSpinnerLoader /> : null}
          {error ? (
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                lineHeight: 20,
              }}
              selectable
            >
              {JSON.stringify(error)}
            </Text>
          ) : null}
          {data?.content ? (
            <>
              <HTMLView value={data?.content} />
            </>
          ) : null}
        </ScrollView>
        {data?.content ? (
          <Button
            marginTop={32}
            marginBottom={32}
            text="I agree"
            varient="primary"
            onpressHandler={closeTermsModalHandler}
          />
        ) : null}
      </View>
    </>
  );
};

export default TermsOfUseModal;
