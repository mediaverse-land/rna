import styled from 'styled-components/native';
import { theme } from '../../../constaints/theme';

export const TagsComponents = {
    Container: styled.View`
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 8px;
    `,
    TextList: styled.View`
        flex-direction: row;
    `,
    TextListItem: styled.Text`
        fonti-size: ${theme.fontSize.md};
        color: ${theme.color.light.PRIMARY};
    `
};
