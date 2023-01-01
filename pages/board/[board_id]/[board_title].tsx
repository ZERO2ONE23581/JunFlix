import {
  UseCapLetters,
  useResponsive,
} from '../../../src/libs/client/useTools';
import {
  useBoardApi,
  useGetBoard,
  useBoardResult,
  useBoardPrivate,
} from '../../../src/libs/client/useBoards';
import { useState } from 'react';
import { IPage } from '../../_app';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { IRes } from '../../../src/types/global';
import { TrimText } from '../../../src/Tools/Trim';
import { Head_ } from '../../../src/Tools/Title/Head';
import { useUser } from '../../../src/libs/client/useUser';
import { useLogin } from '../../../src/libs/client/useLogin';
import { Svg } from '../../../src/Tools/Svg';
import { Avatar } from '../../../src/Tools/Avatar';
import { mobVars } from '../../../styles/variants';
import { OverlayBg } from '../../../src/Tools/OverlayBg';
import { MsgModal } from '../../../src/Tools/Modal/Message';
import useMutation from '../../../src/libs/client/useMutation';
import { LoadingModal } from '../../../src/Tools/Modal/Loading';
import { OnPrivateBtn } from '../../../src/Tools/Button/Private';
import { BG, FlexCol_, Mob, Modal } from '../../../styles/global';
import { BoardBtns } from '../../../src/components/BoardBtns';
import useFollowingBoard from '../../../src/libs/client/useFollow/board';
import { UpdateBoard } from '../../../src/components/UpdateBoard';
import { BoardPosts } from '../../../src/components/BoardPosts';
import { BoardWrap } from '../../../src/components/BoardWrap';
import { BoardTxts } from '../../../src/components/BoardTxts';
import { BoardTitle } from '../../../src/components/BoardTitle';
import { BoardDetail } from '../../../src/components/BoardDetail';

const BoardPage: NextPage<IPage> = ({ theme }) => {
  useLogin();
  const router = useRouter();
  const { board_id } = router.query;
  const { isDesk } = useResponsive();
  const [type, setType] = useState('');
  const { board } = useGetBoard(board_id);
  const [createPost, setCreatePost] = useState(false);
  const __must = { theme, board };
  const { loggedInUser } = useUser();
  const host = board?.host!;
  const host_id = host?.id!;
  const isMyBoard = Boolean(loggedInUser?.id === board?.host.id!);
  const { onPrivate, handleBoard } = useBoardPrivate({
    host_id,
    board_id: board?.id!,
  });
  const { name, Saved, onClick, isFollowing } = useFollowingBoard(board?.id!);
  const onMode = () => {
    if (!isMyBoard) alert('no_right');
    else handleBoard();
  };
  //
  const [api, setApi] = useState('');
  const [msg, setMsg] = useState('');
  const [layoutId, setLayoutId] = useState('');
  const [Loading, setLoading] = useState(false);
  const closeModal = () => setType('');
  const [POST, { data, loading }] = useMutation<IRes>(api && api);
  const __data = { theme, layoutId, POST, board };
  const __modal = { type, Loading, loading, setLoading, closeModal };
  useBoardApi({ _data: { type, original: board, setLayoutId, setApi } });
  useBoardResult({ _data: { data, type, closeModal, setMsg, setLoading } });
  const NAME = host?.username! ? host?.username! : host?.userId!;
  const title = 'delete board';
  const size = isDesk ? '2rem' : '4rem';
  const [isDel, setIsDel] = useState(false);
  const clickClose = () => {
    closeModal();
    setIsDel(false);
  };
  return (
    <>
      <Head_ title={board?.title!} />
      <AnimatePresence>
        {!board && <LoadingModal theme={theme} />}
        {board && (
          <Main isDesk={isDesk}>
            <Cont isDesk={isDesk}>
              <BoardTitle
                _data={{
                  theme,
                  isMyBoard,
                  isDesk,
                  setType,
                  title: board?.title!,
                }}
              />
              <Cont isDesk={isDesk}>
                <Avatar
                  _data={{ theme, size: isDesk ? '7rem' : '10rem', host_id }}
                />
                <span>@{NAME.toUpperCase()}</span>
              </Cont>
              {isMyBoard && (
                <OnPrivateBtn _data={{ theme, onMode, onPrivate, isDesk }} />
              )}
              <BoardDetail
                _data={{ onPrivate, Posts: board?.posts?.length!, Saved }}
              />
              <BoardBtns
                _data={{
                  theme,
                  isDesk,
                  isMyBoard,
                  setCreatePost,
                  genre: board?.genre!,
                }}
                _follow={{ name, onClick, isFollowing }}
              />
              <TrimText text={board?.description} max={200} />
            </Cont>
            <BoardPosts _data={{ ...__must, createPost, setCreatePost }} />
            <>
              <MsgModal _data={{ msg, theme, layoutId }} />
              <UpdateBoard _modal={{ ...__modal }} _data={__data} />
              <AnimatePresence>
                {!Loading && Boolean(type === 'delete-board') && (
                  <>
                    <RemoveBoard isDesk={isDesk}>
                      <Modal
                        exit="exit"
                        className="modal"
                        initial="initial"
                        animate="animate"
                        variants={mobVars}
                        layoutId={layoutId}
                        custom={{ theme, isDesk, isRed: true }}
                      >
                        <Svg
                          type="close"
                          theme={theme}
                          item={{ size }}
                          onClick={clickClose}
                        />
                        <h1>{UseCapLetters(title)}</h1>
                        <BoardTxts _data={{ theme, isDel, setIsDel }} />
                        <BoardWrap
                          _data={{
                            POST,
                            theme,
                            isDel,
                            board,
                            loading,
                            setLoading,
                          }}
                        />
                      </Modal>
                    </RemoveBoard>
                    <OverlayBg closeModal={clickClose} />
                  </>
                )}
              </AnimatePresence>
              {Loading && <LoadingModal theme={theme} layoutId={layoutId} />}
            </>
          </Main>
        )}
      </AnimatePresence>
    </>
  );
};
export default BoardPage;

const Cont = styled(BG)``;
const Main = styled(FlexCol_)`
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
const Host = styled(FlexCol_)`
  gap: 1rem;
  > span {
    opacity: 0.8;
    font-size: ${(p) => (p.isDesk ? '1rem' : '3rem')};
  }
`;
const RemoveBoard = styled(Mob)`
  .modal {
    padding: 1.5rem 1rem 2rem;
    color: ${(p) => p.theme.color.logo};
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.8rem')};
    .kor {
      font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.5rem')};
    }
    h1 {
      margin-bottom: 1rem;
      font-size: ${(p) => (p.isDesk ? '2rem' : '3.5rem')};
    }
    button {
      margin: 2rem auto;
      width: ${(p) => (p.isDesk ? '1.2rem' : '80%')};
      font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.8rem')};
    }
  }
`;
