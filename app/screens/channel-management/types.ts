export type ChanelManagementView = 'CHANNEL' | 'CONDUCTOR'


export type ChannelItem = {
    id: number,
    status:'pending'| 'finished',
    title: string
}