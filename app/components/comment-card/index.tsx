import { useContext, useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { Text } from '../text';
import { PaddingContainer } from '../../styles/grid';
import { Box } from '../box';
import { CommentCardComponents } from './style';
import { theme } from '../../constaints/theme';
import { VirtualizedList } from '../virtualized-list';
import { UserNameCard } from '../username-card';
import { PROFILE_IMAGE, PROFILE_ONE } from '../../constaints/images';
import { getCommentApiHandler, submitCommentApiHandler } from './service';
import { tokenContext } from '../../context/token';
import { tokenStringResolver } from '../../utils/token-string-resolver';
import { LoadingSpinner } from '../loader-spinner';
import { Comment } from '../../types/comment';
import { RenderIf } from '../render-if';
import { Button } from '../button';

type Props = {
  assetId: number;
};

const profile = PROFILE_IMAGE;

const { CommentInput } = CommentCardComponents;

export function CommentCard({ assetId }: Props) {
  const tokenCtx = useContext(tokenContext);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  if (!assetId) {
    return (
      <Box width="100">
        <LoadingSpinner color="red" />
      </Box>
    );
  }

  useEffect(() => {
    setIsLoading(true);
    getData();
    setIsLoading(false);
  }, []);

  const getData = async () => {
    const token = await tokenCtx.getToken();

    if (token === null) {
      return;
    }

    const formattedToken = tokenStringResolver(token);

    await getComments(formattedToken);
  };

  const getComments = async (token: string) => {
    const { isError, res } = await getCommentApiHandler(token, assetId);

    if (isError) {
      return;
    }

    if (res) {
      const { data } = res.data;
      setData(data);
    }
  };

  const postCommentSubmitHandler = async () => {
    if (!inputValue) {
      return;
    }

    setIsSubmitLoading(true);

    const token = await tokenCtx.getToken();

    if (token === null) {
      setIsSubmitLoading(false);

      return;
    }

    const formattedToken = tokenStringResolver(token);

    const body: any = {
      parent_id: null,
      asset_id: assetId,
      body: inputValue,
    };

    const { res } = await submitCommentApiHandler(formattedToken, body);

    if (res) {
      await getData();
    }
    setInputValue('');

    setIsSubmitLoading(false);
  };

  return (
    <VirtualizedList>
      <Box marginTop={24} marginBottom={50}>
        <PaddingContainer>
          <Box
            width="100%"
            borderRadius={8}
            backgroundColor="#4e4e618a"
            additionalStyles={{
              minHeight: 102,
            }}
          >
            <CommentInputBox
              dataLength={data.length}
              setInputValue={setInputValue}
              inputValue={inputValue}
              submitHandler={postCommentSubmitHandler}
              isLoading={isSubmitLoading}
            />
            <RenderIf condition={isLoading}>
              {data.length ? <CommentsList data={data} /> : null}
            </RenderIf>
          </Box>
        </PaddingContainer>
      </Box>
    </VirtualizedList>
  );
}

const CommentsList = ({ data }: { data: Comment[] }) => {
  const renderCommentItem = ({ item }: { item: Comment }) => {
    return (
      <Box
        width="100%"
        backgroundColor="rgba(78, 78, 97, 0.5)"
        padding={24}
        marginBottom={8}
        borderRadius={16}
      >
        <Box width="100%" direction="row" alignItems="center">
          <UserNameCard
            username={item.user.username}
            profileUri={PROFILE_ONE}
            usernameStyles={{
              color: '#A2A2B5',
              marginLeft: 8,
            }}
          />
        </Box>
        <Box marginTop={16} width="100%">
          <Text color="#fff" fontSize={16} lineHeight={16} fontWeight={400}>
            {item.body}
          </Text>
        </Box>
      </Box>
    );
  };

  const keyExtractor = (item: any) => item.id.toString();

  return (
    <Box width="100%" marginTop={40} paddingLeft={24} paddingRight={24} paddingBottom={16}>
      <FlatList data={data} renderItem={renderCommentItem} keyExtractor={keyExtractor} />
    </Box>
  );
};

const CommentInputBox = ({
  dataLength,
  setInputValue,
  inputValue,
  submitHandler,
  isLoading,
}: {
  dataLength: number;
  setInputValue: (str: string) => void;
  inputValue: string;
  submitHandler: () => void;
  isLoading: boolean;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [indicateSubmitButton, setIndicateSubmitButton] = useState(false);

  const indicateButton = () => {
    setIndicateSubmitButton(true);
  };

  const hideButton = () => {
    setIndicateSubmitButton(false);
  };

  return (
    <Box padding={16} paddingRight={24} paddingLeft={24}>
      {/* title */}
      <Box width="100%" direction="row" alignItems="center" justifyContent="space-between">
        <Text color={theme.color.light.WHITE} fontSize={14} lineHeight={14}>
          Comments
        </Text>
        <Text color={theme.color.light.TEXT} fontSize={14} lineHeight={14}>
          {dataLength}
        </Text>
      </Box>
      {/* body */}
      <Box
        marginTop={16}
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Image
            source={{
              uri: profile,
            }}
            style={{
              width: 32,
              height: 32,
              marginRight: 16,
              borderRadius: 100,
            }}
          />
        </Box>
        <Box flex={1}>
          <CommentInput
            placeholder="Add a comment..."
            onBlur={hideButton}
            onFocus={indicateButton}
            onChangeText={(text) => setInputValue(text)}
            placeholderTextColor={theme.color.light.TEXT}
          />
        </Box>
      </Box>
      {inputValue ? (
        <Box width="100%" marginTop={16} direction="row">
          <Box width="13%"></Box>
          <Box flex={1}>
            <Button
              text="Submit"
              varient="primary"
              borderRadius={8}
              isLoading={isLoading}
              marginTop={10}
              onpressHandler={submitHandler}
              additionalStyles={{
                height: 40,
              }}
            />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};
