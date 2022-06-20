import styled from '@emotion/styled';
import { BoardBtnWrap } from '../Btn/Wrap';
import { Dispatch, SetStateAction } from 'react';
import { ProfileAvatar } from '../../Avatar/Profile';
import useUser from '../../../../libs/client/useUser';
import { FormCont } from '../../../../../styles/global';
import { BoardPostList } from '../../Post/BoardPostList';
import { IBoardWithAttrs } from '../../../../types/board';
import { FollowCounts } from './FollowCounts';

interface IBoardDetailProps {
  board?: IBoardWithAttrs;
  setOpenDelModal: Dispatch<SetStateAction<boolean>>;
}
export const BoardDetail = ({ board, setOpenDelModal }: IBoardDetailProps) => {
  const { loggedInUser } = useUser();
  const isMyBoard = Boolean(loggedInUser?.id === board?.UserID);
  return (
    <>
      <Cont>
        <Container>
          <Creator>
            <ProfileAvatar url={board?.user.avatar} size={140} />
            <div className="host">
              <span className="dim">Host:</span>
              <span className="name">{board?.user.username}</span>
            </div>
          </Creator>
          <Board>
            <article className="title">
              <h1>{board?.title}</h1>
              <BoardBtnWrap
                isMyBoard={isMyBoard}
                setOpenDelModal={setOpenDelModal}
              />
            </article>
            <Info>
              <ul>
                <li>
                  <FollowCounts counts={board?._count} />
                </li>
                <li>
                  <span className="item">보드장르</span>
                  <span className="dim">"{board?.genre}"</span>
                </li>
                <li>
                  <span className="item">소개글:</span>
                  {board?.intro && (
                    <p className="dim intro">"{board?.intro}"</p>
                  )}
                </li>
              </ul>
            </Info>
          </Board>
        </Container>
        <BoardPostList />
      </Cont>
    </>
  );
};
const Cont = styled(FormCont)`
  border: none;
`;
const Container = styled(FormCont)`
  border: none;
  gap: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  .dim {
    opacity: 0.6;
    font-weight: 600;
  }
`;
const Creator = styled.article`
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .host {
    span {
      margin-right: 10px;
    }
    .name {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }
`;
const Board = styled.article`
  min-width: 620px;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    h1 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0;
    }
  }
`;
const Info = styled.ul`
  font-size: 1.1rem;
  li {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dotted ${(p) => p.theme.color.font};
    span {
      margin-right: 10px;
    }
    .dim {
      font-size: 1.3rem;
    }
    .intro {
      margin-top: 10px;
      font-style: italic;
      font-weight: 500;
    }
  }
`;
