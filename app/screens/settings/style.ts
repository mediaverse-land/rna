import styled from 'styled-components/native';

export const SettingsScreenComponents = {
    EditButton: styled.TouchableOpacity`
        position: absolute;
        bottom: 30px;
        left: 24px;
        background-color: rgba(78, 78, 97, 0.5);
        height: 48px;
        border-radius: 32px;
        align-items: center;
        justify-content: center;
    `,
    SaveButton: styled.TouchableOpacity`
        position: absolute;
        bottom: 30px;
        left: 24px;
        background-color: #597aff;
        height: 48px;
        border-radius: 32px;
        align-items: center;
        justify-content: center;
    `,
    AddAccountButton: styled.TouchableOpacity`
        width: 100%;
        height: 48px;
        border: 1px dashed #83839c;
        border-radius: 16px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    `,
    AddAccountSubmitButton: styled.TouchableOpacity`
        width: 100%:
        height: 48px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 16px; 
    `
};
