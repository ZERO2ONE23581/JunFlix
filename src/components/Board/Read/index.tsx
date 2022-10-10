import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Svg } from '../../../Tools/Svg';
import { useRouter } from 'next/router';
import { UserAvatar } from '../../Avatar';
import { IBoardType } from '../../../types/board';
import { ITheme } from '../../../../styles/theme';
import { TrimText } from '../../../Tools/trimText';
import { ClickModal } from '../../../Tools/Modal/clickModal';
import { useCapLetters } from '../../../libs/client/useTools';

interface IBoard extends ITheme {
  board: IBoardType;
}

export const BoardBox = ({ board, theme }: IBoard) => {
  const router = useRouter();
  const [edit, setEdit] = useState({ update: false, delete: false });
  const [modal, setModal] = useState(false);
  const onClick = (type: string) => {
    if (type === 'all') router.push(`/board/all`);
    if (type === 'update') setEdit({ update: true, delete: false });
    if (type === 'delete') setEdit({ update: false, delete: true });
    if (type === 'dash')
      router.push(`/user/${board.UserID}/${board.user.username}/dash`);
  };

  //
  return (
    <>
      {board && (
        <Cont className="board-box">
          <Title className="board-title">
            <h1>{useCapLetters(board.title)}</h1>
            <Svg
              type="more"
              size="1.5rem"
              theme={theme}
              isClicked={modal}
              onClick={() => setModal((p) => !p)}
            />
            <ClickModal
              type="board"
              theme={theme}
              onClick={onClick}
              show={{ modal, setModal }}
            />
          </Title>

          <Host className="board-host">
            <UserAvatar
              theme={theme}
              onClick={() => onClick('dash')}
              info={{ avatar: board.user.avatar, size: '4rem' }}
            />
            <span>@{board.user.userId}</span>
          </Host>

          <Detail className="detail">
            <ul>
              {board.genre && (
                <li>
                  <span>{board.genre}</span>
                </li>
              )}
              <li>
                <span>0</span>
                <span>saved</span>
              </li>
              <li>
                <span>0</span>
                <span>posts</span>
              </li>
            </ul>
          </Detail>

          {board.description && (
            <Desc>
              <TrimText text={board.description} max={100} />
            </Desc>
          )}
          {/* {edit && (
            <EditInfo
              setEdit={setEdit}
              title={board.title}
              genre={board.genre}
              intro={board.intro}
            />
          )} */}
        </Cont>
      )}
    </>
  );
};

const Cont = styled(motion.article)`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  position: relative;
  gap: 10px;
  display: flex;
  align-items: flex-end;
  //border: 3px solid blue;
  h1 {
    font-size: 2.7rem;
  }
  .more {
    z-index: 2;
  }
`;
const Host = styled.div`
  //border: 3px solid blue;
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
const Detail = styled.div`
  opacity: 0.9;
  ul {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    li {
      gap: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
      }
    }
  }
`;
const Desc = styled.div``;
