import styled from '@emotion/styled';
import { Avatar } from '../../../../Tools/Avatar';

interface IHost {
  _data: {
    theme: boolean;
    userId: string;
    host_id: number;
    avatar: string | null;
  };
}
export const Host = ({ _data }: IHost) => {
  const theme = _data?.theme!;
  const userId = _data?.userId!;
  const avatar = _data?.avatar!;
  const host_id = _data?.host_id!;
  return (
    <Cont className="board-host">
      <Avatar _data={{ theme, avatar, host_id, size: '4rem', preview: null }} />
      <span>@{userId}</span>
    </Cont>
  );
};
const Cont = styled.div`
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
