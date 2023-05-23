import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { CreateContentNavigationBar } from '../../components/navigation-bar';
import { PaddingContainer } from '../../../../styles/grid';
import { CreateTextComponents } from './style';
import { theme } from '../../../../constaints/theme';

const { Input, BorderSpacer, TagListItemStyles } = CreateTextComponents;
const { color } = theme;

export function CreateTextContent() {
    const [hashTags, setHashtags] = useState<string[]>([]);
    const [cuurrentTag, setCurrentTag] = useState('');
    const [textInputHeight, setTextInputHeight] = useState(50);

    useEffect(() => {
        return () => {
            setHashtags([]);
            setCurrentTag('');
        };
    }, []);

    function getInputContentHeight(height: number) {
        setTextInputHeight(height);
    }

    function createTagHandler(event: any) {
        const key = event.nativeEvent.key;

        // Space button triggerd
        if (key === '' || key === ' ') {
            if (cuurrentTag.charAt(0) === '#') {
                const newTag = cuurrentTag.slice(1).trim();

                const exists = hashTags.find((f) => newTag.includes(f));
                if (exists) {
                    setCurrentTag('');
                    return;
                }

                setHashtags([...hashTags, newTag]);
                setCurrentTag('');
                return;
            } else {
                const newTag = cuurrentTag.trim();

                const trimmedTag = cuurrentTag.charAt(newTag.length - 1);

                if (trimmedTag === '.') {
                    setHashtags([
                        ...hashTags,
                        cuurrentTag.slice(0, cuurrentTag.length - 2)
                    ]);
                    setCurrentTag('');
                    return;
                }

                setHashtags([...hashTags, cuurrentTag]);
                setCurrentTag('');
            }
        }
    }

    const renderTagList = Array.isArray(hashTags) ? (
        hashTags.length ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {hashTags.map((s: string, index: number) => {
                    if (!s) return;
                    if (s === '#') return;
                    return (
                        <TagListItemStyles key={index}>#{s}</TagListItemStyles>
                    );
                })}
            </View>
        ) : null
    ) : null;

    const hasError = hashTags.length === 0 ? true : false;

    return (
        <PaddingContainer>
            <CreateContentNavigationBar hasError={hasError} />
            <View style={{ marginTop: 31.91 }}>
                <View>
                    <Input
                        placeholder="Title"
                        style={{ fontWeight: '700' }}
                        placeholderTextColor={color.light.GRAY}
                    />
                </View>
                <BorderSpacer />
                <View>
                    <Input
                        placeholder="#hashtag"
                        placeholderTextColor={color.light.GRAY}
                        onChangeText={(newText) => {
                            if (newText === '') {
                                setCurrentTag('');
                            }
                            setCurrentTag(newText);
                        }}
                        value={cuurrentTag}
                        onKeyPress={createTagHandler}
                    />
                </View>
                {renderTagList}
                <BorderSpacer />
                <View>
                    <Input
                        placeholder="Insert your text here"
                        multiline={true}
                        placeholderTextColor={color.light.GRAY}
                        style={{
                            height: textInputHeight,
                            textAlignVertical: 'top'
                        }}
                        onContentSizeChange={(event) => {
                            getInputContentHeight(
                                event.nativeEvent.contentSize.height
                            );
                        }}
                    />
                </View>
            </View>
        </PaddingContainer>
    );
}
