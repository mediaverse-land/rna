import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

export const SinglePageFooterComponents = {
    FooterWrapper: styled.View`
        width: 100%;
        height: 104px;
        background-color: ${theme.color.light.WHITE_BG};
        padding-top: 26px;
        padding-bottom: 26px;
        padding-right: 24px;
        padding-left: 24px;
    `,
    BuyText: styled.Text`
        color: ${theme.color.light.HEADING};
        font-size: ${theme.fontSize.md};
        height: 20px;
    `,
    CtaButton: styled.TouchableOpacity`
        width: 158px;
        height: 56px;
        background-color: #5a7afa;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
    `,
    CtaButtonText: styled.Text`
        color: ${theme.color.light.WHITE_BG};
        font-size: ${theme.fontSize.sm};
    `,
    firstImageStyles: {
        width: 19,
        height: 12,
        marginTop: 18
    },
    restImagesStyles: {
        width: 14,
        height: 15,
        marginLeft: 25,
        marginTop: 18
    }
};
