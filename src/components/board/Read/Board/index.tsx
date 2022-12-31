import { Host } from './Host';
import { Btns } from './Btns';
import { Title } from './Title';
import { Detail } from './Detail';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { TrimText } from '../../../../Tools/Trim';
import { IBoardType } from '../../../../types/board';
import { FlexCol_ } from '../../../../../styles/global';
import { useUser } from '../../../../libs/client/useUser';
import { OnPrivateBtn } from '../../../../Tools/Button/Private';
import { useResponsive } from '../../../../libs/client/useTools';
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
  const genre = board?.genre!;
  const board_id = board?.id!;
  const { isDesk } = useResponsive();
  const { loggedInUser } = useUser();
  const isMyBoard = Boolean(loggedInUser?.id === host_id);
  const { onPrivate, handleBoard } = useBoardPrivate({ host_id, board_id });
  const { name, Saved, onClick, isFollowing } = useFollowingBoard(board_id);
  const __btn = { genre, theme, isDesk, board_id, isMyBoard, setCreatePost };
  const onMode = () => {
    if (!isMyBoard) alert('no_right');
    else handleBoard();
  };
  return (
    <Cont isDesk={isDesk}>
      <Title
        _data={{ theme, isMyBoard, isDesk, setType, title: board?.title! }}
      />
      <Host _data={{ theme, isDesk, userId: host?.userId!, host_id }} />
      {isMyBoard && (
        <OnPrivateBtn _data={{ theme, onMode, onPrivate, isDesk }} />
      )}
      <Detail _data={{ onPrivate, Posts: board?.posts?.length!, Saved }} />
      <Btns _data={__btn} _follow={{ name, onClick, isFollowing }} />
      <TrimText text={board?.description} max={200} />
    </Cont>
  );
};
const Cont = styled(FlexCol_)`
  gap: 1.1rem;
  margin: 0 auto;
  padding-top: 1rem;
  width: fit-content;
  justify-content: center;
  .detail {
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '3rem')};
  }
  .private_btn {
    width: ${(p) => (p.isDesk ? '4rem' : '8rem')};
    border-radius: ${(p) => (p.isDesk ? '20px' : '40px')};
    padding: ${(p) => (p.isDesk ? '0.4rem 0.6rem' : '0.8rem 1rem')};
    > .circle {
      width: ${(p) => (p.isDesk ? '0.7rem' : '1.2rem')};
      height: ${(p) => (p.isDesk ? '0.7rem' : '1.2rem')};
      padding: ${(p) => (p.isDesk ? '0.7rem' : '1.2rem')};
    }
  }
  .content-text {
    max-width: 500px;
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.2rem')};
  }
`;
