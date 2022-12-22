import { Layer } from './Layer';
import { Box } from '../Create/Box';
import styled from '@emotion/styled';
import { Comments } from '../Comments';
import { CreateModal } from '../Create/Modal';
import { postVar } from '../../../../styles/post';
import { OverlayBg } from '../../../Tools/OverlayBg';
import { Dispatch, SetStateAction, useState } from 'react';
import { FlexCol, Modal } from '../../../../styles/global';

interface ICommentModal {
  _data: {
    theme: boolean;
    post_id: number;
    host_id: number;
    layoutId: string;
    isBlocked: boolean;
    cmtModal: boolean;
    setModal: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const CommentModal = ({ _data }: ICommentModal) => {
  const {
    theme,
    post_id,
    host_id,
    cmtModal,
    layoutId,
    isBlocked,
    setModal: setPost,
    setCmtModal,
  } = _data;
  const [create, setCreate] = useState(false);
  const closeCreate = () => setCreate(false);
  const closeModal = () => setCmtModal(false);
  return (
    <>
      {cmtModal && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            custom={theme}
            variants={postVar}
            layoutId={layoutId}
          >
            <Layer _data={{ theme, closeModal }} />
            {!isBlocked && (
              <Wrap>
                <Box _data={{ theme, host_id, setCreate }} />
                <CreateModal
                  _data={{
                    theme,
                    create,
                    post_id,
                    setPost,
                    closeCreate,
                    setCmtModal,
                  }}
                />
                <Comments
                  _data={{ theme, setPost, post_id, og_id: 0, setCmtModal }}
                />
              </Wrap>
            )}
            {isBlocked && (
              <IsBlocked>
                <span className="kor">댓글 기능이 제한된 포스트 입니다.</span>
                <span>This post dose not allow comments.</span>
              </IsBlocked>
            )}
          </Cont>

          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </>
  );
};
const IsBlocked = styled(FlexCol)`
  gap: 0.5rem;
  min-height: 40vh;
  font-size: 1.6rem;
  justify-content: center;
  .kor {
    font-size: 1.5rem;
  }
`;
const Cont = styled(Modal)`
  top: 3rem;
  z-index: 101;
  width: 33vw;
  padding: 0;
  min-width: 500px;
  height: fit-content;
`;

const Wrap = styled(FlexCol)`
  gap: 1rem;
  overflow-y: auto;
  max-height: 77vh;
  padding: 1rem 2rem;
`;
