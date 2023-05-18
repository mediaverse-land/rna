import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: 120,
        zIndex: 10,
        backgroundColor: '#0e0e12a0',
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 24,
        paddingRight: 24
    }
});

export const SearchBoxComponents = {
    Container: styled.View`
        width: 100%;
        height: ${(props: { height: string }) => props.height};
        background-color: ${theme.color.light.WHITE_BG};
    `,
    SearchBoxWrapper: styles.wrapper,
    SearchInput: styled.TextInput`
        width: 100%;
        height: 48;
        border-radius: 16px;
        border: 1px solid #353542;
        padding-left: 17px;
        line-height: 16.94px;
        margin-top: 24px;
        color: #83839c;
        background-color: #0e0e12a0;
        filter: blur(10px);
    `,
    SearchIcon: styled.Image`
        width: 16px;
        height: 16px;
        position: absolute;
        top: 40px;
        right: 24px;
        z-index: 12;
    `,
    AdvancedSearchIconButton: styled.TouchableOpacity`
        background-color: #0e0e12a0;
        border: 1px solid #353542;
        width: 48px;
        height: 48px;
        border-radius: 16px;
        align-items: center;
        justify-content: center;
        margin-left: 16px;
    `,
    TagSearchWrapper: styled.View`
        width: 100%;
        height: 48px;
        margin-top: 110px;
        padding: 0 24px;
        z-index: 10;
    `,
    SearchTagDropDown: styled.TouchableOpacity`
        width: 58px;
        margin-right: 35px;
        flex-direction: row;
        align-items: center;
    `,
    SearchTagDropDownTitle: styled.Text`
        color: #83839c;
        font-size: ${theme.fontSize.md};
        margin-left: 16px;
    `,
    DropDown: styled.View`
        height: 88px;
        position: absolute;
        z-index: 10;
        top: 45px;
        background-color: #181836;
        border-radius: 16px;
        padding: 16px 56px 16px 16px;
    `
};
