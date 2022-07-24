import { ListInfo } from './Info';
import styled from '@emotion/styled';
import { FixedBtn } from './FixedBtn';
import { FollowBoard } from './Follow';
import { useRouter } from 'next/router';
import { Genre } from '../Board/Info/Genre';
import { IBoardListProps } from '../../../../types/board';
import useUser from '../../../../libs/client/useUser';
import { AVATAR_BG, Grid, NoAvatar } from '../../../../../styles/global';
import { Svg } from '../../../Style/Svg/Svg';

export const BoardList = ({ boards }: IBoardListProps) => {
  const router = useRouter();
  const isBoard = Boolean(boards?.length > 0);
  const { isLoggedIn, loggedInUser } = useUser();
  const isMyBoard = (userId: number) => Boolean(loggedInUser?.id === userId);
  return (
    <>
      {isBoard && (
        <Cont size={4} className="board-list">
          <FixedBtn />
          {boards?.map((board) => (
            <Board key={board.id} avatar={board.avatar!}>
              <Follow>
                {isLoggedIn && !isMyBoard(board.UserID) && (
                  <FollowBoard USERID={board?.UserID!} BOARDID={board?.id!} />
                )}
              </Follow>
              <LinkBtn
                className="router"
                onClick={() =>
                  router.push(
                    `/user/${board.UserID}/board/${board.id}/${board.title}`
                  )
                }
              >
                {!board.avatar && (
                  <NoAvatar>
                    <Genre size="2rem" genre={board.genre} />
                  </NoAvatar>
                )}
              </LinkBtn>
              {isMyBoard(board.UserID) && (
                <Svg type="isOwner" size="1.6rem" fill="#2ecc71" />
              )}
              <ListInfo board={board!} />
            </Board>
          ))}
        </Cont>
      )}
      {!isBoard && <h1>NO BOARD FOUND.</h1>}
    </>
  );
};
const Cont = styled(Grid)`
  min-width: 1200px;
`;
const Board = styled(AVATAR_BG)`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  .isOwner {
    top: 4%;
    left: 5%;
    position: absolute;
  }
`;
const Follow = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: end;
  .follow-board {
    button {
      border: none;
      border-radius: 0;
      font-size: 1.2rem;
      padding: 5px 10px 10px 15px;
      border-bottom-left-radius: 20px;
      background-color: ${(p) => p.theme.color.bg};
      &:hover {
        background-color: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
const LinkBtn = styled.button`
  height: 280px;
  border: none;
  background: none;
  :hover {
    svg {
      fill: red;
    }
  }
`;
