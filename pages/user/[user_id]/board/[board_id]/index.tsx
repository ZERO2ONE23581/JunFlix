import useSWR from 'swr';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PageWithBg } from '../../../../../styles/global';
import { IGetBoard } from '../../../../../src/types/board';
import { Title } from '../../../../../src/components/Layout/Title';
import { AvatarUrl } from '../../../../../src/components/User/Avatar/AvatarURL';
import { ReadBoard } from '../../../../../src/components/User/Board/Detail/ReadBoard';

const BoardPage: NextPage = () => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const { data } = useSWR<IGetBoard>(
    user_id && board_id && `/api/user/${user_id}/board/${board_id}`
  );
  const avatar = AvatarUrl(data?.board?.avatar!);
  const BoardHost = data?.board?.user?.username;
  const IsAnyPost = Boolean(data?.board?.posts.length! > 0);
  return (
    <>
      <Title title={`${BoardHost}님의 보드`} />
      <Page bg={avatar} IsAnyPost={IsAnyPost}>
        <ReadBoard board={data?.board} />
      </Page>
    </>
  );
};
export default BoardPage;

const Page = styled(PageWithBg)<{ IsAnyPost: boolean }>`
  padding: 3% 10%;
  position: relative;
  height: ${(p) => p.IsAnyPost && '100%'};
`;
