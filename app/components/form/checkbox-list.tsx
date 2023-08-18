import { useState } from 'react';
import { View, Image, StyleProp, ImageStyle } from 'react-native';
import { theme } from '../../constaints/theme';
import { RowAlignCenter } from '../../styles/grid';
import { InputComponent } from './style';

export type SelectOption = {
    id: number;
    title: string;
    iconPath: string;
    activeIconPath: string;
    iconStyle: StyleProp<ImageStyle>;
};

type Props = {
    labelText: string;
    optionsList: SelectOption[];
};

const { OptionText, FormGroup, Option, Select, Label } = InputComponent;

export function CheckboxList({ labelText, optionsList }: Props) {
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);

    function toggleSelectOptionHandler(option: SelectOption) {
        const existsInSelectedOptions = selectedOptions.find(
            (d) => d.title === option.title
        );

        if (existsInSelectedOptions) {
            const filter = selectedOptions.filter(
                (f) => f.title !== option.title
            );
            setSelectedOptions(filter);
            return;
        }

        setSelectedOptions([...selectedOptions, option]);
    }

    const renderOptions = optionsList
        ? optionsList.map((f: SelectOption) => {
              let active__color = theme.color.light.GRAY;
              let icon__path = f.iconPath;

              if (selectedOptions.find((opt) => opt.title === f.title)) {
                  active__color = theme.color.light.HEADING;
                  icon__path = f.activeIconPath;
              }

              return (
                  <Option
                      onPress={() => toggleSelectOptionHandler(f)}
                      key={f.id}
                      color={active__color}
                  >
                      <RowAlignCenter>
                          <Image
                              source={{ uri: icon__path }}
                              style={f.iconStyle}
                          />
                          <OptionText color={active__color}>
                              {f.title}
                          </OptionText>
                      </RowAlignCenter>
                      <View></View>
                  </Option>
              );
          })
        : null;

    return (
        <FormGroup>
            <Label>{labelText}</Label>
            <Select>{renderOptions}</Select>
        </FormGroup>
    );
}
