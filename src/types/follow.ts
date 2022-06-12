import { Board, Following, Post, User } from '@prisma/client';

export interface IGetFollowingBoard {
  ok: boolean;
  error?: string;
  isFollowing?: boolean;
  board: BoardWithRecords;
}
export interface BoardWithRecords extends Board {
  user: User;
  followers?: Following[];
  post?: Post[];
  _count: {
    followers: number;
    posts: number;
  };
}
export interface IFollowBoardProps {
  isOwner?: boolean;
  user_id?: number | null;
  board_id?: number | null;
}
