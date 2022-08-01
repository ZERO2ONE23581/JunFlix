import { Follow } from '../../../Follow';
import styled from '@emotion/styled';
import useUser from '../../../../../libs/client/useUser';

interface IOnAir {
  userId: number;
  boardId: number;
}
export const OnAir = ({ userId, boardId }: IOnAir) => {
  const { isLoggedIn, loggedInUser } = useUser();
  return (
    <Cont>
      {isLoggedIn && loggedInUser?.id !== userId && (
        <Follow userId={userId} boardId={boardId} />
      )}
    </Cont>
  );
};
const Cont = styled.article`
  display: flex;
  align-items: center;
  justify-content: end;
  .follow-board {
    button {
      border: none;
      border-radius: 0;
      padding: 7px 15px;
      border-bottom-left-radius: 20px;
      background-color: ${(p) => p.theme.color.bg};
      &:hover {
        background-color: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
