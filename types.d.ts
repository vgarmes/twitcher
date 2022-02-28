import { Session, User } from 'next-auth/core/types';
import { JWT } from 'next-auth/jwt';
export interface Token extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
  user: User;
}

type Pagination = {
  cursor: string;
};

export interface Follow {
  followed_at: string;
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_login: string;
  to_name: string;
}

export interface Follows {
  data: Follow[];
  pagination: {
    cursor: string;
  };
  total: number;
}

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  created_at: string;
}

export interface TwitchVideo {
  id: string;
  stream_id: string;
  user_id: string;
  user_login: string;
  user_name: string;
  title: string;
  description: string;
  duration: string;
  thumbnail_url: string;
  view_count: number;
  url: string;
  language: string;
  muted_segments: any;
  type: string;
  viewable: string;
  created_at: string;
  published_at: string;
}

export interface Videos {
  data: TwitchVideo[];
  pagination: Pagination;
}

export interface IUser {
  userId: string;
  favorites: string[];
  watchLater: string[];
}
