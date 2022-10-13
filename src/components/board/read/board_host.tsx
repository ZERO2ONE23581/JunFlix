import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Avatar, IAvatar } from '../../../Tools/Avatar';

interface IBoardHost {
  item: {
    theme: boolean;
    userId: string;
    username: string;
    avatar: string | null;
    preview: string | null;
  };
}
export const BoardHost = ({ item }: IBoardHost) => {
  const theme = item.theme;
  const router = useRouter();
  const userId = item.userId;
  const avatar = item.avatar;
  const preview = item.preview;
  const username = item.username;
  const { user_id } = router.query;
  const onClick = () => router.push(`/user/${user_id}/${username}/dash`);
  //
  return (
    <Container className="board-host">
      <Avatar
        item={{ theme, size: '4rem', avatar, preview: null }}
        onClick={onClick}
      />
      <span>@{userId}</span>
    </Container>
  );
};
const Container = styled.div`
  gap: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  > span {
    opacity: 0.8;
    font-size: 0.9rem;
  }
`;
