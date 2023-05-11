import { useState } from 'react';
import {
    Dimensions,
    TouchableOpacity,
    LayoutChangeEvent
} from 'react-native';
import { InputComponent } from './style';

const {
    FormGroup,
    Label,
    HorizontalRadioWrapper,
    HorizontalRadioItem,
    HorizontalRadioItemText,
} = InputComponent;

type Props = {
    labelText: string;
    dataList: string[]
};

const windowWidth = Dimensions.get('window').width;

export function HorizontalRadio({ labelText, dataList }: Props) {
    const [labelWidth, setLabelWidth] = useState<number>(0);
    const [selectedItem, setSelectedItem] = useState('')

    // 63 = (24 +24 => padding of <PaddingContainer></PaddingContainer> + 15 =>(marginRight of label))
    const inputWidth = Math.floor(windowWidth) - (63 + labelWidth);

    function ditectLabelWidthHandler(width: number) {
        setLabelWidth(width);
    }

    function selectItemHandler(item: string) {
        setSelectedItem(item)
    }

    const renderDataList = dataList ?
        Array.isArray(dataList) ?
            dataList.length ?
                dataList.map((f: string, index: number) => (
                    <HorizontalRadioItem
                        key={index}
                        onPress={() => selectItemHandler(f)}
                    >
                        <HorizontalRadioItemText>{f}</HorizontalRadioItemText>
                    </HorizontalRadioItem>
                ))
                : null
            : null
        : null

    return (
        <FormGroup
            style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Label
                style={{
                    marginRight: 15
                }}
                onLayout={(event: LayoutChangeEvent) => {
                    const { width } = event.nativeEvent.layout;
                    ditectLabelWidthHandler(width);
                }}
            >
                {labelText}
            </Label>
            <HorizontalRadioWrapper style={{ width: inputWidth }}>
                {renderDataList}
            </HorizontalRadioWrapper>
        </FormGroup>
    );
}