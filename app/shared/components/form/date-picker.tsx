import { useState } from 'react';
import { Platform, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { InputComponent } from './style';
import { theme } from '../../../constaints/theme';
// import ICON_CALENDAR_PNG from './../../../../assets/icons/icon__calendar.png';
// import { imageUriResolver } from '../../../utils/image-uri-resolver';

// const ICON_CALENDAR = imageUriResolver(ICON_CALENDAR_PNG);

const { InputBox, FormGroup, datePiclerIconStyles, PickerPlaceholder } =
    InputComponent;

export function DatePicker() {
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    function showDatePicker() {
        setDatePicker(true);
    }

    function onDateSelected(event: any, value: any) {
        setDate(value);
        setDatePicker(false);
    }

    return (
        <FormGroup>
            <TouchableOpacity onPress={showDatePicker}>
                {/* <Image
                    source={{ uri: ICON_CALENDAR }}
                    style={datePiclerIconStyles}
                /> */}
                <InputBox
                    editable={false}
                    selectTextOnFocus={false}
                    placeholder="choose date..."
                    placeholderTextColor={theme.color.light.GRAY}
                    style={{
                        paddingLeft: 89
                    }}
                />
                <PickerPlaceholder
                    style={{
                        borderRightColor: theme.color.light.GRAY,
                        borderRightWidth: 1
                    }}
                >
                    Date
                </PickerPlaceholder>
            </TouchableOpacity>
            {datePicker && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={true}
                    onChange={onDateSelected}
                />
            )}
        </FormGroup>
    );
}
