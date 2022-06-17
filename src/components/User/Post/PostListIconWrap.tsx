import useSWR from 'swr';
import styled from '@emotion/styled';
import useUser from '../../../libs/client/useUser';
import { EmptyLikeIcon, SolidLikeIcon } from '../../Style/Svg/\bLikes';
import { EmptyCommentIcon, SolidCommentIcon } from '../../Style/Svg/Comments';

interface IIsMyPostProps {
  user_id: number;
  board_id: number;
  post_id: number;
}

export const PostListIconWrap = ({
  user_id,
  board_id,
  post_id,
}: IIsMyPostProps) => {
  const { loggedInUser } = useUser();
  const isOwner = Boolean(loggedInUser?.id === user_id);
  const { data } = useSWR(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const isLiked = data?.isLiked;
  const isComment = data?.isComments;
  return (
    <Cont>
      <ul>
        <li>{isOwner ? <IsOwnerTrue className="owner-icon" /> : null}</li>
        <li>{isLiked ? <SolidLikeIcon /> : <EmptyLikeIcon />}</li>
        <li>{isComment ? <SolidCommentIcon /> : <EmptyCommentIcon />}</li>
      </ul>
    </Cont>
  );
};
const Cont = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  ul {
    gap: 3px;
    display: flex;
    align-items: center;
  }
`;
const IsOwnerTrue = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #2ecc71;
`;
