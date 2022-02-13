import { Session, User } from 'next-auth/core/types';
import { JWT } from 'next-auth/jwt';
export interface Token extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
  user: User;
}
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
