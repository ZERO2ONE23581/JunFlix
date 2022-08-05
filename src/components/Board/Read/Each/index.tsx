import { Info } from './Info';
import { useState } from 'react';
import { Setting } from './Setting';
import styled from '@emotion/styled';
import { EditInfo } from '../../Update/Info';
import { Profile } from './Profile';
import { IBoard } from '../../../../types/board';
import { Container, DimBackground } from '../../../../../styles/global';
import useUser from '../../../../libs/client/useUser';

export const Board = ({ board, setPreview }: IBoard) => {
  const [edit, setEdit] = useState(false);
  const { loggedInUser } = useUser();
  const isMyBoard = Boolean(loggedInUser?.id === board.UserID);
  return (
    <>
      <Cont>
        <Profile
          isMyBoard={isMyBoard}
          userAvatar={board?.user?.avatar!}
          username={board?.user?.username!}
        />
        {!edit && (
          <Info
            edit={edit}
            setEdit={setEdit}
            title={board.title}
            genre={board.genre}
            intro={board.intro}
            counts={board._count}
            isMyBoard={isMyBoard}
            setPreview={setPreview}
            query={{ userId: board.UserID, boardId: board.id }}
          />
        )}
        {edit && (
          <EditInfo
            setEdit={setEdit}
            title={board.title}
            genre={board.genre}
            intro={board.intro}
            query={{ userId: board.UserID, boardId: board.id }}
          />
        )}
      </Cont>
      {edit && <DimBackground zIndex={1} />}
    </>
  );
};

const Cont = styled(Container)`
  gap: 40px;
  z-index: 2;
  border: none;
  display: flex;
  box-shadow: none;
  position: relative;
  padding: 30px 100px;
  margin-bottom: 40px;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;
