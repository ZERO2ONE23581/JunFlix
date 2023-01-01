import { Layer } from './Layer';
import { Box } from '../Create/Box';
import styled from '@emotion/styled';
import { Comments } from '../Comments';
import { CreateModal } from '../Create/Modal/CreateModal';
import { postVar } from '../../../../styles/post';
import { OverlayBg } from '../../../Tools/OverlayBg';
import { MobModal } from '../../../../styles/mobile';
import { FlexCol, Modal } from '../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { useResponsive } from '../../../libs/client/useTools';

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
    setModal,
    setCmtModal,
  } = _data;
  const { isDesk } = useResponsive();
  const closeCreate = () => setCreate(false);
  const [create, setCreate] = useState(false);
  const closeModal = () => setCmtModal(false);
  return (
    <>
      {cmtModal && (
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            initial="initial"
            animate="animate"
            className="modal"
            variants={postVar}
            layoutId={layoutId}
            custom={{ theme, isDesk }}
          >
            <Layer _data={{ theme, closeModal }} />
            {!isBlocked && (
              <Wrap className="wrap">
                <Box _data={{ theme, host_id, setCreate, isDesk }} />
                <CreateModal
                  _data={{
                    theme,
                    create,
                    post_id,
                    closeCreate,
                    setCmtModal,
                    setPost: setModal,
                  }}
                />
                <Comments
                  _data={{
                    theme,
                    post_id,
                    og_id: 0,
                    setModal,
                    setCmtModal,
                  }}
                />
              </Wrap>
            )}
            {isBlocked && (
              <IsBlocked>
                <span className="kor">댓글 기능이 제한된 포스트 입니다.</span>
                <span>This post dose not allow comments.</span>
              </IsBlocked>
            )}
          </Modal>
          <OverlayBg closeModal={closeModal} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(MobModal)`
  .modal {
    top: 0;
    padding: 0;
    z-index: 101;
    width: ${(p) => (p.isDesk ? '33vw' : '100%')};
    height: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
    .wrap {
      width: 100%;
      max-height: ${(p) => (p.isDesk ? '77vh' : '100%')};
    }
  }
  .kor {
    font-size: ${(p) => (p.isDesk ? '1.5rem' : '3rem')};
  }
`;
const IsBlocked = styled(FlexCol)`
  gap: 0.5rem;
  min-height: 40vh;
  font-size: 1.6rem;
  justify-content: center;
`;

const Wrap = styled(FlexCol)`
  gap: 1rem;
  overflow-y: auto;
  padding: 1rem 2rem;
`;
