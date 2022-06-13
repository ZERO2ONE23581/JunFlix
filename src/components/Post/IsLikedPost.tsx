import useSWR from 'swr';
import styled from '@emotion/styled';
import useUser from '../../libs/client/useUser';
import { SolidHeartIcon } from '../../../styles/svg';

interface IIsMyPostProps {
  user_id: number;
  board_id: number;
  post_id: number;
}

export const IsLikedPost = ({ user_id, board_id, post_id }: IIsMyPostProps) => {
  const { data, mutate } = useSWR(
    `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const isLiked = data?.isLiked;
  return <Cont>{isLiked ? <SolidHeartIcon /> : null}</Cont>;
};
const Cont = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`;
