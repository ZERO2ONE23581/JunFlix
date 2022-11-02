import { Host } from './Host';
import { Title } from './Title';
import { Detail } from './Detail';
import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { CreatePost } from '../../../Post/Create';
import { IBoardType } from '../../../../types/board';
import { TrimText } from '../../../../Tools/trimText';
import { useUser } from '../../../../libs/client/useUser';
import { hoverBgVars } from '../../../../../styles/variants';
import { Dispatch, SetStateAction, useState } from 'react';

interface IBoardBox {
  theme: boolean;
  board: IBoardType;
  setType: Dispatch<SetStateAction<string>>;
  setCreate: Dispatch<SetStateAction<boolean>>;
}
export const Board = ({ theme, board, setType, setCreate }: IBoardBox) => {
  const host = board?.host;
  const host_id = host?.id;
  const genre = board?.genre!;
  const title = board?.title!;
  const avatar = host?.avatar!;
  const userId = host?.userId!;
  const { loggedInUser } = useUser();
  const onPrivate = board?.onPrivate!;
  const isMyBoard = Boolean(loggedInUser?.id === host?.id);
  //
  return (
    <>
      {board && (
        <Box className="board-box">
          <Title _data={{ title, theme, isMyBoard, setType }} />
          <Host _data={{ theme, userId, host_id, avatar }} />
          <Detail _data={{ onPrivate }} />
          <BtnWrap
            _data={{
              theme,
              genre,
              isMyBoard,
              board_id: board?.id,
              setCreatePost: setCreate,
            }}
          />
          <TrimText text={board?.description} max={200} />
        </Box>
      )}
    </>
  );
};
const Box = styled(motion.article)`
  gap: 1.1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding-top: 1rem;

  .box-btns {
    gap: 1rem;
    width: fit-content;
    //border: 2px solid yellow;
    .box-btn {
      gap: 0.5rem;
      width: fit-content;
      //border: 2px solid blue;
      .name {
        width: fit-content;
        font-size: 1rem;
        text-align: center;
        height: fit-content;
        //border: 2px solid blue;
      }
      > div {
        cursor: pointer;
        width: 4.4rem;
        height: 4.4rem;
        border-radius: 10px;
        svg {
          pointer-events: none;
        }
      }
    }
  }
`;
const boxBtnVar = {
  ...hoverBgVars,
};
