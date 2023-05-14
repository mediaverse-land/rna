import styled from 'styled-components/native';

export const SearchBarComponents: any = {
    Container: {
        width: '100%',
        height: 96,
        backgroundColor: '#4e4e61',
        zIndex: 3,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingLeft: 24,
        paddingRight: 24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    SearchInput: styled.TextInput`
        width: 100%;
        height: 48;
        border-radius: 16px;
        border: 1px solid #353542;
        padding-left: 17px;
        line-height: 16.94px;
        color: #83839c;
        background-color: #0e0e12;
        filter: blur(10px);
    `
};
