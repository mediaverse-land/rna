import styled from 'styled-components/native';

export const SearchBarComponents = {
    SearchInput: styled.TextInput<{ textAlign: string }>`
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
        text-align: ${(props) => props.textAlign};
    `,
    SearchIcon: styled.Image`
        width: 16px;
        height: 16px;
        position: absolute;
        top: 70px;
        right: 43px;
        z-index: 12;
    `
};

// #0e0e12a0
