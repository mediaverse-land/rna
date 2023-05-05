import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const SearchBoxComponents = {
    Container: styled.View`
        width: 100%;
        height: ${(props: { height: string }) => props.height};
        background-color: ${theme.color.light.WHITE_BG};
    `,
    Wrapper: styled.View`
        width: 100%;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
    `,
    MainSearchInputWrapper: styled.View`
        height: 56px;
    `,
    SearchInput: styled.TextInput`
        width: 100%;
        background-color: ${theme.color.light.LIGHT_GRAY_BG};
        border-radius: 8px;
        padding-top: 19px;
        padding-right: 19px;
        padding-left: 17px;
        padding-bottom: 17px;
        color: ${theme.color.light.GRAY};
        font-size: ${theme.fontSize.md};
        height: 56px;
    `,
    SearchIconWrapper: styled.View`
        width: 56px;
        height: 56px;
        background-color: ${theme.color.light.LIGHT_GRAY_BG};
        border-radius: 8px;
        align-items: center;
        justify-content: center;
    `,
    AdvancedSearchWrapper: styled.View`
        width: 100%;
    `,
    AdvancedSearchHeader: styled.View`
        width: 100%;
        height: 48px;
        padding: 0 15px;
    `,
    AdvancedSearchHeaderText: styled.Text`
        color: ${theme.color.light.GRAY};
        font-size: ${theme.fontSize.md};
    `,
    BorderIndicator: styled.View`
        width: 100%;
        height: 1px;
        border: 0.5px solid ${theme.color.light.GRAY};
    `,
    DetailSearchBox: styled.View`
        width: 100%;
        padding: 11px 0;
    `,
    SearchGroupItem: styled.View`
        width: 100%;
    `,
    Label: styled.Text`
        font-size: ${theme.fontSize.md};
        color: ${theme.color.light.GRAY};
    `
};
