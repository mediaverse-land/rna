import { useEffect, useState } from "react";
import { InputComponent } from "./style";
import { Box } from "../box";
import { Text } from "../text";
import { theme } from "../../constaints/theme";

const {
  HorizontalRadioWrapper,
  HorizontalRadioItem,
  HorizontalRadioItemText,
} = InputComponent;

type Props = {
  labelText: string;
  dataList: string[];
  defaultOption?:string;
  getSelectedOption: (option: string | boolean) => void
};

export function RadioButton({ labelText, dataList, defaultOption, getSelectedOption }: Props) {
  
  const [selectedItem, setSelectedItem] = useState<string|boolean>("");

  function selectItemHandler(item: string | boolean) {
    setSelectedItem(item);
  }

  useEffect(() => {
    if(defaultOption){
      setSelectedItem(defaultOption)
    }
  }, [defaultOption])

  useEffect(() => {
    getSelectedOption(selectedItem)
  }, [selectedItem]);

  const renderDataList = dataList
    ? Array.isArray(dataList)
      ? dataList.length
        ? dataList.map((f: string| boolean, index: number) => {
          let defaultText= f;
          if(defaultText === true) defaultText = 'yes'
          
          if(f === false) defaultText = 'no'

          return (
            <Box key={index}>
              <HorizontalRadioItem
                style={[selectedItem === f && { backgroundColor: "rgba(14, 14, 18, 0.5)" }]}
                activeOpacity={1}
                onPress={() => selectItemHandler(f)}
              >
                <HorizontalRadioItemText
                  style={[selectedItem === f && { color: theme.color.light.WHITE }]}
                >
                  {`${defaultText}`}
                </HorizontalRadioItemText>
              </HorizontalRadioItem>
            </Box>
          )
        })
        : null
      : null
    : null;

  return (
    <Box width="100%">
      <Box height={45} width="100%">
        <Text color={theme.color.light.WHITE}>{labelText}</Text>
      </Box>
      <HorizontalRadioWrapper>{renderDataList}</HorizontalRadioWrapper>
    </Box>
  );
}
