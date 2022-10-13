import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { BoardTitle } from './box_title';
import { BoardHost } from './board_host';
import { Btn } from '../../../Tools/Button';
import { BoardDetail } from './board_detail';
import { ITheme } from '../../../../styles/theme';
import { IBoardType } from '../../../types/board';
import { TrimText } from '../../../Tools/trimText';
import useUser from '../../../libs/client/useUser';
import { Avatar } from '../../../Tools/Avatar';
import { SettingModal } from '../../../Tools/Modal/setting_modal';
import { useCapLetters } from '../../../libs/client/useTools';
import { useState } from 'react';
import { Svg } from '../../../Tools/Svg';
import { useRouter } from 'next/router';
import useFollow from '../../../libs/client/useFollowingBoards';

interface IBoardBox extends ITheme {
  board: IBoardType;
  clickModal: (type: string) => void;
}
export const BoardBox = ({ theme, board, clickModal }: IBoardBox) => {
  const host = board?.host;
  const router = useRouter();
  const avatar = host?.avatar;
  const { loggedInUser } = useUser();
  const title = useCapLetters(board.title);
  const [modal, setModal] = useState(false);
  const isMyBoard = Boolean(loggedInUser?.id === host?.id);
  const { isFollowing, follow, name } = useFollow(board?.id!);
  const setting_item = { modal, theme, onClick: clickModal, setModal };
  const detail_item = { genre: board?.genre!, isPrivate: board?.isPrivate! };
  const clickAvatar = () =>
    router.push(`/user/${host?.id}/${host.username}/dash`);
  //
  return (
    <>
      {board && (
        <Box className="board-box">
          <Title className="board-title">
            <h1>{title}</h1>
            <Svg
              type="more"
              size="1.5rem"
              theme={theme}
              isClicked={modal}
              onClick={() => setModal((p) => !p)}
            />
            <SettingModal
              setModal={setModal}
              onClick={clickModal}
              item={{ modal, theme, isMyBoard }}
            />
          </Title>
          <Host className="board-host">
            <Avatar
              onClick={clickAvatar}
              item={{ theme, size: '4rem', avatar, preview: null }}
            />
            <span>@{host.userId}</span>
          </Host>
          <BoardDetail theme={theme} item={{ ...detail_item }} />
          {!isMyBoard && (
            <Btn
              type="button"
              onClick={follow}
              item={{ name, theme, isFollowing }}
            />
          )}
          <TrimText text={board?.description} max={200} />
        </Box>
      )}
    </>
  );
};
const Box = styled(motion.article)`
  .follow-btn {
    width: fit-content;
    padding: 5px 20px;
    font-size: 1.1rem;
  }
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: fit-content;
  border: 2px solid yellow;
`;
const Title = styled.div`
  position: relative;
  gap: 10px;
  display: flex;
  align-items: flex-end;
  h1 {
    font-size: 2.7rem;
  }
  .more {
    z-index: 2;
  }
`;
const Host = styled.div`
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
