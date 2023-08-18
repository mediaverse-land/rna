export interface Live {
    id: number;
    title: string;
    type: number;
    link: string;
    image: string;
    language: 'en' | 'fr';
    country: 'us' | 'fr' | 'ar' | 'far';
    be_recorded: number;
    details: null;
    created_at: string;
    updated_at: string;
    thumbnail: string;
}
