import styled from 'styled-components/native';

export const MasonryGridComponents = {
    Container: styled.View`
        flex: 1;
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
    `,
    MasonryItem: styled.View`
        border: 1px solid #fff;
    `
};
