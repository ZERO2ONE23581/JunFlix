import useSWR from 'swr';
import styled from '@emotion/styled';
import useUser from '../../../libs/client/useUser';
import {
  SolidCommentIcon,
  SolidHeartIcon,
} from '../../Style/Svg/CommentsLikes';

interface IIsMyPostProps {
  user_id: number;
  board_id: number;
  post_id: number;
}

export const IsComment = ({ user_id, board_id, post_id }: IIsMyPostProps) => {
  const { data } = useSWR(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const isComment = data?.isComments;
  return <Cont>{isComment ? <SolidCommentIcon /> : null}</Cont>;
};
const Cont = styled.div`
  position: absolute;
  top: -15px;
  right: -10px;
`;
