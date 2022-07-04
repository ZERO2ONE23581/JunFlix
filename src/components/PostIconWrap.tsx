import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { LikesBtn } from './Style/Icon/Likes/LikesBtn';
import { CommentIcon } from './Style/Icon/Comment/CommentIcon';

interface IIconWrap {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  REVIEWID: number;
  createCmt?: boolean;
  setCreateCmt: Dispatch<SetStateAction<boolean>>;
}
export const PostIconWrap = ({
  USERID,
  BOARDID,
  POSTID,
  REVIEWID,
  createCmt,
  setCreateCmt,
}: IIconWrap) => {
  return (
    <Cont>
      <LikesBtn
        USERID={USERID}
        BOARDID={BOARDID}
        POSTID={POSTID}
        REVIEWID={REVIEWID}
      />
      <CommentIcon
        USERID={USERID}
        BOARDID={BOARDID}
        POSTID={POSTID}
        REVIEWID={REVIEWID}
        createCmt={createCmt}
        setCreateCmt={setCreateCmt}
      />
    </Cont>
  );
};
const Cont = styled.article`
  gap: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  button {
    padding: 0;
    .counts {
      top: -8px;
      right: -10px;
      position: absolute;
      font-size: 15px;
      font-weight: 550;
      color: ${(p) => p.theme.color.logo};
    }
  }
  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;
