import { useCallback } from 'react';
import { FlatList } from 'react-native';
import { Text } from '../text';
import { Box } from '../box';
import { UserNameCard } from '../username-card';
import { Comment } from '../../types/comment';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  data: Comment[];
};

const gradientProps: any = {
  style: {
    width: '100%',
    minHeight: 115,
    borderRadius: 16,
    padding: 1,
    flex: 1,
  },
  colors: ['#515163', '#cfcffc14'],
  start: {
    x: 0.7,
    y: 0,
  },
};

export default function CommentsList({ data }: Props) {
  return <CommentsDataList data={data} />;
}

const CommentsDataList = ({ data }: { data: Comment[] }) => {
  const renderCommentItem = useCallback(({ item }: { item: Comment }) => {
    return (
      <Box width="100%" marginBottom={8} borderRadius={16}>
        <LinearGradient {...gradientProps}>
          <Box padding={24} width="100%" height="100%" borderRadius={16} backgroundColor="#4e4e61">
            <Box width="100%" direction="row" alignItems="center">
              <UserNameCard
                username={item?.user?.username}
                profileUri={item?.user?.image_url}
                usernameStyles={{
                  color: '#A2A2B5',
                }}
              />
            </Box>
            <Box marginTop={16} width="100%">
              <Text color="#fff" fontSize={16} lineHeight={16} fontWeight={400}>
                {item.body}
              </Text>
            </Box>
          </Box>
        </LinearGradient>
      </Box>
    );
  }, []);
  const keyExtractor = (item: any) => item.id.toString();

  return (
    <Box width="100%" marginTop={40} paddingLeft={16} paddingRight={16} paddingBottom={16}>
      <FlatList data={data} renderItem={renderCommentItem} keyExtractor={keyExtractor} />
    </Box>
  );
};
