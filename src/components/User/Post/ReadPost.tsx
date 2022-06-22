import useSWR from 'swr';
import styled from '@emotion/styled';
import { Post } from '@prisma/client';
import { useRouter } from 'next/router';
import { HostIcon } from '../Avatar/Profile';
import { PostAvatar } from './PostAvatar';
import { IGetPost } from '../../../types/post';
import { ModalSchema } from '../../../../styles/global';
import { Dispatch, SetStateAction } from 'react';

interface ICreatePostModalProps {
  post_id: number;
  openModal: Dispatch<SetStateAction<boolean>>;
}
export const ReadPost = ({ openModal, post_id }: ICreatePostModalProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const QueryId = user_id && board_id;
  //get
  const { data: PostData } = useSWR<IGetPost>(
    QueryId && `/api/user/${user_id}/board/${board_id}/post/${post_id}`
  );
  const Post = PostData?.post;
  return (
    <>
      <Cont>
        <article className="wrapper">
          <PostAvatar disabled={true} avatarUrl={Post?.avatar} />
          <article className="wrap">
            <HostIcon size={40} />
            {/* <PostInputs disabled={true} /> */}
          </article>
        </article>
      </Cont>
    </>
  );
};
const Cont = styled(ModalSchema)`
  width: 75%;
  height: 80%;
  .wrapper {
    /* padding: 20px 40px; */
    padding-bottom: 0;
    gap: 20px;
    display: flex;
    align-items: center;
    border: 1px solid pink;
    .wrap {
      border: 1px solid pink;
      gap: 20px;
      width: 330px;
      display: flex;
      flex-direction: column;
    }
  }
`;
