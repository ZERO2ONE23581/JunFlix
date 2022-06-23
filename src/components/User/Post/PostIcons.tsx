import useSWR from 'swr';
import styled from '@emotion/styled';
import { Svg } from '../../Style/Svg/Svg';
import { useRouter } from 'next/router';

interface IIsMyPostProps {
  user_id: number;
  board_id: number;
  post_id: number;
}
export const PostIcons = ({ user_id, board_id, post_id }: IIsMyPostProps) => {
  const { data } = useSWR(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const isLiked = data?.isLiked;
  const isComment = data?.isComments;
  return (
    <Cont>
      <ul>
        <li>{isLiked ? <Svg type="likes" /> : <Svg type="dislikes" />}</li>
        <li>
          {isComment ? <Svg type="comment" /> : <Svg type="un-comment" />}
        </li>
      </ul>
    </Cont>
  );
};
const Cont = styled.article`
  position: absolute;
  top: 5%;
  right: 5%;
  ul {
    gap: 0.8rem;
    display: flex;
    align-items: center;
  }
`;
