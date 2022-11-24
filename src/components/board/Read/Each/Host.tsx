import styled from '@emotion/styled';
import { Avatar } from '../../../../Tools/Avatar/indexxx';

interface IHost {
  _data: {
    theme: boolean;
    userId: string;
    host_id: number;
  };
}
export const Host = ({ _data }: IHost) => {
  const { theme, userId, host_id } = _data;
  return (
    <Cont className="board-host">
      <Avatar _data={{ theme, size: '4rem', host_id }} />
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
