import { IRes } from './global';

export interface IGetFollowing extends IRes {
  length: number;
  isFollowing: boolean;
}
export interface IGetFollowingBoard extends IRes {
  length: number;
  isFollowing: boolean;
}
