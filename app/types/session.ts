export type SessionDetail = {
    id: string;
    agent: string;
};

export interface Session {
    id: number;
    user_id: number;
    token: string;
    app: '_web' | string;
    scopes: any;
    details: SessionDetail;
    created_at: string;
    updated_at: string;
}
