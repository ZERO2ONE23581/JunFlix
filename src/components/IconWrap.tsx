import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { CommentIcon } from './Style/Icon/Comment/CommentIcon';
import { LikesBtn } from './Style/Icon/Likes/LikesBtn';

interface IIconWrap {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  REVIEWID: number;
  createCmt?: boolean;
  setCreateCmt: Dispatch<SetStateAction<boolean>>;
}
export const IconWrap = ({
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
  margin-top: 40px;
  padding-left: 30px;
  gap: 50px;
  display: flex;
  align-items: center;
  .counts {
    top: -8px;
    right: -10px;
    position: absolute;
    font-size: 15px;
    font-weight: 550;
    color: ${(p) => p.theme.color.logo};
  }
  svg {
    width: 33px;
    height: 33px;
  }
`;
