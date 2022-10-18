import { Dispatch, SetStateAction, useState } from 'react';
import { Svg } from '../../../Tools/Svg';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Btn } from '../../../Tools/Button';
import { BoardDetail } from './board_detail';
import { ITheme } from '../../../../styles/theme';
import { IBoardType } from '../../../types/board';
import { TrimText } from '../../../Tools/trimText';
import useUser from '../../../libs/client/useUser';
import { Avatar } from '../../../Tools/Avatar';
import { SettingModal } from './board_setting_btn_modal';
import { useCapLetters } from '../../../libs/client/useTools';
import useFollow from '../../../libs/client/useFollow';

interface IBoardBox {
  theme: boolean;
  board: IBoardType;
  setType: Dispatch<SetStateAction<string>>;
}
export const Board = ({ theme, board, setType }: IBoardBox) => {
  const host = board?.host;
  const router = useRouter();
  const avatar = host?.avatar;
  const { loggedInUser } = useUser();
  const title = useCapLetters(board.title);
  const [modal, setModal] = useState(false);
  const isMyBoard = Boolean(loggedInUser?.id === host?.id);
  const detail_item = { genre: board?.genre!, isPrivate: board?.onPrivate! };
  const clickAvatar = () =>
    router.push(`/user/${host?.id}/${host.username}/dash`);
  const { isFollowing, onClick, name } = useFollow(Number(board?.id), 'board');
  //
  return (
    <>
      {board && (
        <Box className="board-box">
          <Title className="board-title">
            <h1>{title}</h1>
            <Svg
              type="more"
              theme={theme}
              onClick={() => setModal((p) => !p)}
              item={{ size: '2rem', isClicked: modal }}
            />
            <SettingModal
              item={{ modal, theme, isMyBoard, setType, setModal }}
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
              onClick={onClick}
              item={{ name, theme, isFollowing, className: 'save-btn' }}
            />
          )}
          <TrimText text={board?.description} max={200} />
        </Box>
      )}
    </>
  );
};
const Box = styled(motion.article)`
  width: fit-content;
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .save-btn {
    width: fit-content;
    padding: 5px 20px;
    font-size: 1.1rem;
  }
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
