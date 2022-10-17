import useSWR from 'swr';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IGetBoard } from '../../../../types/board';
import { Avatar } from '../../../../Tools/Avatar';

interface IFollowingBoard {
  item: { board_id: number; theme: boolean };
}
export const Subscriptions = ({ item }: IFollowingBoard) => {
  const router = useRouter();
  const theme = item.theme;
  const { user_id } = router.query;
  const { data } = useSWR<IGetBoard>(`/api/board/${item.board_id}`);
  const avatar = data?.board?.host?.avatar!;
  const onClick = () =>
    router.push(`/board/${data?.board?.id}/${data?.board?.title}`);
  const Item = { theme, avatar, onClick, size: '4rem', preview: null };
  return (
    <>
      <Cont>
        <Avatar item={{ ...Item }} />
      </Cont>
    </>
  );
};
const Cont = styled.article`
  border: 2px solid blueviolet;
  display: flex;
  width: fit-content;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;
