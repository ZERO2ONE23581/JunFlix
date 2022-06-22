import useSWR from 'swr';
import styled from '@emotion/styled';
import useUser from '../../../libs/client/useUser';
import { CommentIcon, LikesIcon } from '../../Style/Svg';

interface IIsMyPostProps {
  user_id: number;
  board_id: number;
  post_id: number;
}
export const PostIconWrap = ({
  user_id,
  board_id,
  post_id,
}: IIsMyPostProps) => {
  const { data } = useSWR(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const isLiked = data?.isLiked;
  const isComment = data?.isComments;
  return (
    <Cont>
      <ul>
        <Icon>
          <ul>
            {/* <li>{isOwner && <IsMyIcon />}</li> */}
            <li>{isLiked ? <LikesIcon solid /> : <LikesIcon empty />}</li>
            <li>{isComment ? <CommentIcon solid /> : <CommentIcon empty />}</li>
          </ul>
        </Icon>
      </ul>
    </Cont>
  );
};
const Cont = styled.article`
  position: relative;
`;
const Icon = styled.div`
  position: absolute;
  right: 10px;
  bottom: 260px;
  border: none;
  ul {
    width: 100%;
    gap: 10px;
    display: flex;
    align-items: center;
  }
`;
