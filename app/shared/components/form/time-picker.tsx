import { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { InputComponent } from './style';
import { theme } from '../../../constaints/theme';

const { InputBox, FormGroup, PickerPlaceholder } = InputComponent;

export function TimePicker() {
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));

    function showTimePicker() {
        setTimePicker(true);
    }

    function onTimeSelected(event: any, value: any) {
        setTime(value);
        setTimePicker(false);
    }

    return (
        <FormGroup>
            <TouchableOpacity activeOpacity={1} onPress={showTimePicker}>
                <InputBox
                    editable={false}
                    selectTextOnFocus={false}
                    placeholder="insert time..."
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
                    Time
                </PickerPlaceholder>
            </TouchableOpacity>
            {timePicker && (
                <DateTimePicker
                    value={time}
                    mode={'time'}
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    is24Hour={false}
                    onChange={onTimeSelected}
                />
            )}
        </FormGroup>
    );
}
