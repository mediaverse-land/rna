import { Image, View } from 'react-native';
import { CommentCardComponents } from './style';
import { PaddingContainer, RowAlignCenter } from '../../../styles/grid';

export function CommentCard() {
    return (
        <PaddingContainer>
            <CommentCardComponents.Wrapper>
                <RowAlignCenter>
                    <CommentCardComponents.Title>
                        Comments
                    </CommentCardComponents.Title>
                    <CommentCardComponents.CommentsCound>
                        56
                    </CommentCardComponents.CommentsCound>
                </RowAlignCenter>
                <CommentCardComponents.TextBoxWrapper>
                    <RowAlignCenter>
                        <View style={{ paddingTop: 18 }}>
                            <Image
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 100,
                                    marginRight: 16
                                }}
                                source={{
                                    uri: 'https://www.figma.com/file/PjruT7z5jL7KsoUn0tQadE/image/8b3801231b3bc56d8d3d28d35c9776e478125bae?fuid=843972259226061773'
                                }}
                            />
                        </View>
                        <CommentCardComponents.TextBoxWrapper
                            style={{ flex: 1, width: '100%' }}
                        >
                            <CommentCardComponents.TextBox
                                placeholder="Add a comment"
                                keyboardType="default"
                                style={{ flex: 1, width: '100%' }}
                            />
                        </CommentCardComponents.TextBoxWrapper>
                    </RowAlignCenter>
                </CommentCardComponents.TextBoxWrapper>
                <View style={{ height: 16, width: '100%' }}></View>
            </CommentCardComponents.Wrapper>
        </PaddingContainer>
    );
}
