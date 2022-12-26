import { Host } from './Host';
import { Btns } from './Btns';
import { Title } from './Title';
import { Detail } from './Detail';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { TrimText } from '../../../../Tools/Trim';
import { IBoardType } from '../../../../types/board';
import { FlexCol } from '../../../../../styles/global';
import { useUser } from '../../../../libs/client/useUser';
import { OnPrivateBtn } from '../../../../Tools/Button/Private';
import { useBoardPrivate } from '../../../../libs/client/useBoards';
import useFollowingBoard from '../../../../libs/client/useFollow/board';

interface IBoardBox {
  _data: {
    theme: boolean;
    board: IBoardType;
    setType: Dispatch<SetStateAction<string>>;
    setCreatePost: Dispatch<SetStateAction<boolean>>;
  };
}
export const Board = ({ _data }: IBoardBox) => {
  const { board, theme, setType, setCreatePost } = _data;
  const host = board?.host!;
  const host_id = host?.id!;
  const board_id = board?.id;
  const { loggedInUser } = useUser();
  const isMyBoard = Boolean(loggedInUser?.id === host_id);
  const { onPrivate, handleBoard } = useBoardPrivate({ host_id, board_id });
  const { name, Saved, onClick, isFollowing } = useFollowingBoard(board_id);
  const __data = { theme, isMyBoard };
  const _follow = { name, onClick, isFollowing };
  const __btn = { ...__data, board_id, setCreatePost, genre: board?.genre! };
  const onMode = () => {
    if (!isMyBoard) alert('no_right');
    else handleBoard();
  };
  return (
    <Cont>
      <Title _data={{ ...__data, setType, title: board?.title! }} />
      <Host _data={{ theme, userId: host?.userId!, host_id }} />
      {isMyBoard && <OnPrivateBtn _data={{ theme, onMode, onPrivate }} />}
      <Detail _data={{ onPrivate, Posts: board?.posts?.length!, Saved }} />
      <Btns _data={__btn} _follow={_follow} />
      <TrimText text={board?.description} max={200} />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  gap: 1.1rem;
  padding-top: 1rem;
  width: fit-content;
  justify-content: center;
`;
