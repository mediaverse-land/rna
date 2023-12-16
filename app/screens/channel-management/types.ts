export type ChanelManagementView = 'CHANNEL' | 'CONDUCTOR';

export type ChannelItem = {
  id: number;
  status: 'pending' | 'finished';
  title: string;
};

export type AssetType = 'Subscribe' | 'Ownership';

export type ActiveNav = 'All' | 'Images' | 'Videos' | 'Sounds' | 'Texts';

export type TabbarItem = {
  id: number;
  title: string;
  path: ActiveNav;
  icon: JSX.Element;
  activeIcon: JSX.Element;
};

export type ShareItem = {
  account: {
    created_at: string;
    deleted_at: null;
    id: number;
    information: {
      access_token: string;
      refresh_token: null;
    };
    title: string;
    type: 1;
    updated_at: string;
    user_id: 14;
  };
  asset: {
    commenting_status: number;
    created_at: string;
    deleted_at: null;
    details: [];
    file_id: number;
    forkability_status: 2;
    id: number;
    lat: null;
    lng: null;
    parent_id: null;
    plan: number;
    price: number;
    sales_number: number;
    sales_volume: number;
    source: number;
    status: number;
    subscription_period: null;
    thumbnails: [];
    type: number;
    updated_at: string;
    user_id: number;
    views_count: number;
  };
  asset_id: number;
  created_at: string;
  deleted_at: null;
  details: [];
  external_account_id: number;
  file_id: number;
  id: number;
  status: number;
  time: string;
  type: string;
  updated_at: string;
  user_id: 14;
};
