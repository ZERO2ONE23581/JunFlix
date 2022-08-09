import { Info } from './Info';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Profile } from './Profile';
import { EditInfo } from '../Update/Info';
import { IBoard } from '../../../types/board';
import { Box, DimBackground } from '../../../../styles/global';
import { Setting } from './Setting';

export const Board = ({ board, setPreview }: IBoard) => {
  const [edit, setEdit] = useState(false);
  return (
    <>
      {board && (
        <Cont>
          <Profile
            userAvatar={board.user?.avatar!}
            username={board.user?.username!}
          />
          <Setting edit={edit} setEdit={setEdit} setPreview={setPreview!} />
          {!edit && (
            <Info
              title={board.title}
              genre={board.genre}
              intro={board.intro}
              counts={board._count}
            />
          )}
          {edit && (
            <EditInfo
              setEdit={setEdit}
              title={board.title}
              genre={board.genre}
              intro={board.intro}
            />
          )}
        </Cont>
      )}
      {edit && <DimBackground zIndex={1} />}
    </>
  );
};

const Cont = styled(Box)`
  margin: 0;
  gap: 40px;
  z-index: 2;
  border: none;
  display: flex;
  box-shadow: none;
  max-width: 1200px;
  position: relative;
  padding: 30px 100px;
  margin-bottom: 40px;
  flex-direction: row;
  margin: 50px auto 0;
`;
