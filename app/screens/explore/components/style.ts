import styled from 'styled-components/native';

export const NavigationHeaderComponents = {
    Container: styled.View`
        height: 48px;
        width: 100%;
        z-index: 4;
        margin-top: 104px;
        align-items: center;
        justify-content: center;
    `,
    Wrapper: styled.View`
        height: 48px;
        background-color: rgba(14, 14, 18, 0.5);
        backdrop-filter: blur(5px);
        border-radius: 16px;
        flex-direction: row;
        justify-content: space-between;
    `,
    Tab: styled.TouchableOpacity`
        width: 100%;
        height: 48px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    `
};
