import styled from '@emotion/styled';
import { Btn } from '../../../../Tools/Button';
import { IRes } from '../../../../types/global';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { cmtModalVar } from '../../../../../styles/variants';
import { BtnWrap, Modal } from '../../../../../styles/global';
import useMutation from '../../../../libs/client/useMutation';
import { LoadingModal } from '../../../../Tools/Modal/Loading';
import { TheComment, useCmtRes } from '../../../../libs/client/useComment';
import { MobModal } from '../../../../../styles/mobile';
import { useResponsive } from '../../../../libs/client/useTools';

interface IDeleteModal {
  _data: {
    theme: boolean;
    modal: boolean;
    comment: TheComment;
    closeModal: () => void;
    setPost: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const DeleteModal = ({ _data }: IDeleteModal) => {
  const { theme, setPost, modal, closeModal, comment, setCmtModal } = _data;
  const { id: cmt_id, post_id } = comment;
  const [post, { loading, data }] = useMutation<IRes>(`/api/comment/delete`);
  const clickDelete = () => {
    if (loading) return;
    setLoading(true);
    return post({ post_id, cmt_id });
  };
  const { Loading, setLoading } = useCmtRes({
    _data: { closeModal, setPost, setCmtModal, data },
  });
  const { isDesk } = useResponsive();
  return (
    <AnimatePresence>
      {Loading && <LoadingModal theme={theme} />}
      {modal && !Loading && (
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            initial="initial"
            animate="animate"
            className="modal"
            layoutId="option"
            custom={theme}
            variants={cmtModalVar}
          >
            <h1>
              <span>댓글은 삭제 후 복구 할 수 없습니다.</span>
              <span>Comment can't be recovered once it is deleted.</span>
            </h1>
            <BtnWrap className="btn_wrap">
              <Btn
                type="button"
                onClick={closeModal}
                item={{ name: 'Cancel', theme }}
              />
              <Btn
                type="button"
                onClick={clickDelete}
                item={{ name: 'Delete', theme }}
              />
            </BtnWrap>
          </Modal>
          <OverlayBg closeModal={closeModal} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MobModal)`
  .modal {
    top: 40%;
    z-index: 100;
    padding-top: 2rem;
    color: ${(p) => p.theme.color.logo};
    padding: ${(p) => (p.isDesk ? '2rem' : '4rem 2rem')};
    height: ${(p) => (p.isDesk ? 'fit-content' : '100%')};
    h1 {
      span {
        display: block;
        font-size: ${(p) => (p.isDesk ? '1.1rem' : '3rem')};
      }
    }
    .btn_wrap {
      gap: 1.2rem;
      margin-top: ${(p) => !p.isDesk && '2rem'};
      button {
        padding: ${(p) => (p.isDesk ? '1.1rem' : '2rem')};
        font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.8rem')};
      }
    }
  }
`;
