import useSWR from 'swr';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../../src/types/board';
import { Title } from '../../../../../src/components/Layout/Title';
import { ModalClose, PageWithBg } from '../../../../../styles/global';
import { AvatarURL } from '../../../../../src/components/User/Avatar/URL';
import { BoardDetail } from '../../../../../src/components/User/Board/Detail';
import { DeleteBoardModal } from '../../../../../src/components/User/Board/DeleteModal';
import { CreatePostModal } from '../../../../../src/components/User/Post/Create/PostModal';
import { ClosePostModal } from '../../../../../src/components/User/Post/CloseModal';
import { PostList } from '../../../../../src/components/User/Post/List';

const BoardInfo: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { data } = useSWR<IGetBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const avatar = AvatarURL(data?.board?.avatar);
  const [isDel, setIsDel] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const closeModal = () => {
    setIsDel(false);
  };
  const BoardHost = data?.board?.user?.username;
  const IsAnyPost = Boolean(data?.board?.posts.length! > 0);

  return (
    <>
      <Title title={`${BoardHost}님의 보드`} />
      <Cont bg={avatar} IsAnyPost={IsAnyPost}>
        <BoardDetail
          board={data?.board}
          setIsDel={setIsDel}
          isPost={isPost}
          setIsPost={setIsPost}
        />
        <PostList isBoardPosts hostName={BoardHost} />
        {isDel && <DeleteBoardModal closeModal={setIsDel} />}
        {isPost && <CreatePostModal openModal={setIsClose} />}
        {isClose && (
          <ClosePostModal closeModal={setIsPost} closeDelModal={setIsClose} />
        )}
        {isDel && <ModalClose onClick={closeModal} />}
      </Cont>
    </>
  );
};
export default BoardInfo;

const Cont = styled(PageWithBg)<{ IsAnyPost: boolean }>`
  padding: 3% 15%;
  height: ${(p) => p.IsAnyPost && '100%'};
`;
