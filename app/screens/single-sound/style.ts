import styled from 'styled-components/native';
import { theme } from '../../constaints/theme';

export const SingleSoundComponents = {
    Container: styled.View`
        padding-bottom: 24px;
    `,
    PlayerBar: styled.View`
        width: 100%;
        justify-content: center;
        align-items: center;
        margin-top: 37px;
    `,
    PlayerBarImage: {
        width: 282,
        height: 167.36
    },
    UserDataWrapper: styled.View`
        flex-direction: row;
        justify-content: space-between;
    `,
    PlayerCard: styled.View`
        width: 100%;
        height: 80px;
        margin-top: 56.64px;
        border-radius: 8px;
        background-color: ${theme.color.light.WHITE_BG};
        padding-left: 17px;
        padding-right: 49px;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
    `,
    PlayMusicIconWrapper: styled.View`
        width: 73px;
        height: 24px;
    `,
    PlayMusicIcon: {
        width: 25,
        height: 25
    },
    MusicTimes: {
        marginTop: 11,
        paddingLeft: 10,
        paddingRight: 17
    },
    TimeText: styled.Text`
        font-size: ${theme.fontSize.md};
        color: ${theme.color.light.GRAY};
    `,
    ContentText: styled.Text`
        color: ${theme.color.light.CONTENT_TEXT};
        line-height: ${theme.lineHeight.conten};
        font-size: ${theme.fontSize.md};
    `
};
