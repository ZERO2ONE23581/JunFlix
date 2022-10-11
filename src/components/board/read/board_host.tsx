import styled from '@emotion/styled';
import { UserAvatar } from '../../../Tools/Avatar';
import { ITheme } from '../../../../styles/theme';

interface IBoardHost extends ITheme {
  data: {
    avatar: string;
    userId: string;
  };
  onClick: (type: string) => void;
}
export const BoardHost = ({ theme, data, onClick }: IBoardHost) => {
  return (
    <Container className="board-host">
      <UserAvatar
        theme={theme}
        onClick={() => onClick('dash')}
        info={{ avatar: data.avatar, size: '4rem' }}
      />
      <span>@{data.userId}</span>
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
