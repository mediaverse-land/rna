import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData } from 'react-native';
import { Box } from '../../../components/box';
import { styles } from './styles';
import { theme } from '../../../constaints/theme';

type Props = {
  setCaptionText: (text: string) => void;
};

const WRITE_CAPTION_CONST = 'Write a caption';

const NoteBook = forwardRef((props: Props, ref: any) => {
  const [height, setHeight] = useState<number>(null);

  const textInputRef = useRef<TextInput>();

  useImperativeHandle(ref, () => ({
    clear() {
      textInputRef?.current?.clear();
    },
  }));

  // Gets the current text size of input
  const changeContentSizeHandler = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      if (e.nativeEvent.contentSize.height === height) {
        return;
      }
      setHeight(e.nativeEvent.contentSize.height);
    },
    [height],
  );

  const wrapperHeight = height + 400;

  return (
    <Box height={wrapperHeight} marginTop={24} flex={1} width="100%">
      <TextInput
        placeholderTextColor={theme.color.light.DARK_INPUT_PLACEHOLDER}
        style={[styles.textArea, { height: wrapperHeight }]}
        onChangeText={(text) => props.setCaptionText(text)}
        placeholder={WRITE_CAPTION_CONST}
        onContentSizeChange={changeContentSizeHandler}
        multiline
        ref={(input) => {
          textInputRef.current = input;
        }}
      />
    </Box>
  );
});

NoteBook.displayName = 'NoteBook';

export { NoteBook };
