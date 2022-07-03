import styled from '@emotion/styled';
import { Comment } from '../../Style/Icon/Likes/Comment';
import { LikesBtn } from '../../Style/Icon/Likes/LikesBtn';

interface IIconWrap {
  USERID: number;
  BOARDID: number;
  POSTID: number;
  REVIEWID: number;
}
export const IconWrap = ({ USERID, BOARDID, POSTID, REVIEWID }: IIconWrap) => {
  return (
    <Cont>
      <LikesBtn
        USERID={USERID}
        BOARDID={BOARDID}
        POSTID={POSTID}
        REVIEWID={REVIEWID}
      />
      {/* <Comment
        USERID={USERID}
        BOARDID={BOARDID}
        POSTID={POSTID}
        REVIEWID={REVIEWID}
      /> */}
    </Cont>
  );
};
const Cont = styled.article`
  border: 2px solid red;
  padding: 0 20px;
  gap: 1em;
  display: flex;
  align-items: center;
`;
