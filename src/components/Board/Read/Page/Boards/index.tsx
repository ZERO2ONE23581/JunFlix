import { ListInfo } from './Info';
import styled from '@emotion/styled';
import { FollowBoard } from './Follow';
import { useRouter } from 'next/router';
import { AVATAR_BG } from '../../../../Avatar';
import { Svg } from '../../../../Style/Svg/Svg';
import { Grid } from '../../../../../../styles/global';
import useUser from '../../../../../libs/client/useUser';
import { IBoardListProps } from '../../../../../types/board';

export const BoardList = ({ boards }: IBoardListProps) => {
  const router = useRouter();
  const { isLoggedIn, loggedInUser } = useUser();
  const isBoard = Boolean(boards?.length > 0);
  const isMyBoard = (userId: number) => Boolean(loggedInUser?.id === userId);
  return (
    <>
      {isBoard && (
        <Grid size={4}>
          {boards?.map((board) => (
            <Map key={board.id}>
              <Board avatar={board.avatar!}>
                {isLoggedIn && !isMyBoard(board.UserID) && (
                  <FollowBoard USERID={board?.UserID!} BOARDID={board?.id!} />
                )}
                <button
                  className="router"
                  onClick={() =>
                    router.push(
                      `/user/${board.UserID}/board/${board.id}/${board.title}`
                    )
                  }
                />
                {isMyBoard(board.UserID) && <Svg type="isOwner" />}
                <ListInfo board={board!} />
              </Board>
            </Map>
          ))}
        </Grid>
      )}
      {!isBoard && <h1>NO BOARD FOUND.</h1>}
    </>
  );
};
const Map = styled.article`
  .follow-board {
    display: flex;
    justify-content: end;
    button {
      border: none;
      border-radius: 0;
      font-size: 1.2rem;
      padding: 10px 15px;
      border-bottom-left-radius: 20px;
      background-color: ${(p) => p.theme.color.bg};
      &:hover {
        color: white;
        background-color: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
const Board = styled(AVATAR_BG)`
  min-width: 200px;
  min-height: 380px;
  display: flex;
  justify-content: end;
  flex-direction: column;
  border-radius: 5px;
  border-right: ${(p) => !p.avatar && p.theme.border.thin};
  border-bottom: ${(p) => !p.avatar && p.theme.border.thin};
  .router {
    width: 100%;
    min-height: 300px;
    border: none;
    background: none;
  }
  .isOwner {
    svg {
      width: 20px;
      height: 20px;
      top: 5%;
      left: 5%;
      position: absolute;
      fill: ${(p) => p.theme.color.green};
    }
  }
`;
