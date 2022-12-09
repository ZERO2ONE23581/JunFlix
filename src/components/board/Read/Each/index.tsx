import { Host } from './Host';
import { Title } from './Title';
import { Detail } from './Detail';
import { BtnWrap } from './BtnWrap';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { IBoardType } from '../../../../types/board';
import { TrimText } from '../../../../Tools/trimText';
import { useUser } from '../../../../libs/client/useUser';
import { hoverBgVars } from '../../../../../styles/variants';

interface IBoardBox {
  _data: {
    theme: boolean;
    board: IBoardType;
    setType: Dispatch<SetStateAction<string>>;
    setFixed: Dispatch<SetStateAction<boolean>>;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}
export const Board = ({ _data }: IBoardBox) => {
  const { theme, board, setType, setCreatePost, setFixed } = _data;
  const host = board?.host;
  const host_id = host?.id;
  const board_id = board?.id;
  const genre = board?.genre!;
  const title = board?.title!;
  const userId = host?.userId!;
  const { loggedInUser } = useUser();
  const onPrivate = board?.onPrivate!;
  const isMyBoard = Boolean(loggedInUser?.id === host?.id);
  const __btn = { theme, genre, board_id, isMyBoard, setFixed, setCreatePost };
  //
  return (
    <>
      {board && (
        <Box className="board-box">
          <Title _data={{ title, theme, isMyBoard, setType, setFixed }} />
          <Host _data={{ theme, userId, host_id }} />
          <Detail _data={{ onPrivate }} />
          <BtnWrap _data={__btn} />
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
