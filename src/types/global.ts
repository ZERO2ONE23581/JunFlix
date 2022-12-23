export interface IResponsive {
  _res: {
    theme: boolean;
    isDesk: boolean;
    isMobile: boolean;
  };
}

export interface IForm {
  userId: string;
  title: string;
  genre?: string;
  avatar?: FileList;
  hashtags?: string;
  pageLink?: string;
  onPrivate?: boolean;
  description?: string;
}
export interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  original_name: string;
  backdrop_path: string;
  original_title: string;
  original_language: string;
}
export interface IMovieRes extends IRes {
  movies: IMovie[];
}
export interface IRes {
  ok?: boolean;
  msg?: string;
  error?: string;
  noData?: boolean;
  [key: string]: any;
}
export interface ICmtForm {
  text: string;
}
export interface IGetFollowing extends IRes {
  length: number;
  isFollowing: boolean;
}
export interface IGetFollowingBoard extends IRes {
  length: number;
  isFollowing: boolean;
}
