import styled from '@emotion/styled';
import { Board } from '@prisma/client';
import { useRouter } from 'next/router';
import { Svg } from '../../Style/Svg/Svg';
import { Setting } from '../Create/Setting';
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

interface ITitleProps {
  Board: Board;
  isPostHost: boolean;
  setReadPost: Dispatch<SetStateAction<boolean>>;
  setEditPost: Dispatch<SetStateAction<boolean>>;
  setDeletePost: Dispatch<SetStateAction<boolean>>;
}
export const TopLayer = ({
  Board,
  isPostHost,
  setReadPost,
  setEditPost,
  setDeletePost,
}: ITitleProps) => {
  const router = useRouter();
  const { user_id, board_id } = router.query;
  const isCurrentBoard = Boolean(
    user_id === String(Board?.UserID) && board_id === String(Board?.id)
  );
  const BOARD_URL = `/user/${Board?.UserID}/board/${Board?.id}/${Board?.title}`;
  const clickBtn = () => {
    if (isCurrentBoard) setReadPost(false);
    router.replace(BOARD_URL);
  };
  return (
    <Cont>
      {isPostHost && (
        <Setting setEditPost={setEditPost} setDeletePost={setDeletePost} />
      )}
      <Button onClick={clickBtn}>
        <Svg type="clapper" />
        <span>{Board?.title.toUpperCase()}</span>
      </Button>
    </Cont>
  );
};
const Cont = styled.article`
  position: relative;
  //
  display: flex;
  align-items: center;
  justify-content: space-between;
  //
  padding: 11px 20px;
  border-bottom: ${(p) => p.theme.border.thin};
`;
const Button = styled.button`
  gap: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  //
  border: none;
  outline: none;
  color: inherit;
  font-size: 1rem;
  background-color: inherit;
  border-bottom: 2px solid transparent;
  :hover {
    border-bottom: 2px solid ${(p) => p.theme.color.logo};
    color: ${(p) => p.theme.color.logo};
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;
