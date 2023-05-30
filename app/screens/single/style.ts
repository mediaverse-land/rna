import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const SingleVideoPageComponents = {
    BackButton: styled.TouchableOpacity`
        width: 77px;
        height: 40px;
        border-radius: 20px;
        background-color: rgba(14, 14, 18, 0.5);
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 16px;
        z-index: 11;
        left: 24px;
    `,
    VideoDataBox: styled.View`
        width: 49%;
        height: 32px;
        border-radius: 8px;
        border: 1px solid #666680;
        flex-direction: row;
        align-items: center;
        margin-bottom: 8px;
        padding: 0 16px;
        flex-direction: row;
    `,
    VideoDataBoxLabel: styled.Text`
        color: #666680;
        font-size: ${theme.numericFontSize.sm};
        line-height: ${theme.numericLineHeight.sm};
        padding-right: 16px;
    `
};
