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

interface IDeleteModal {
  _data: {
    theme: boolean;
    modal: boolean;
    comment: TheComment;
    closeModal: () => void;
    setPost: Dispatch<SetStateAction<boolean>>;
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
  return (
    <AnimatePresence>
      {Loading && <LoadingModal theme={theme} />}
      {modal && !Loading && (
        <>
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            className="modal"
            layoutId="option"
            custom={theme}
            variants={cmtModalVar}
          >
            <h1>
              <span className="kor">댓글은 삭제 후 복구 할 수 없습니다.</span>
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
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  top: 40%;
  z-index: 100;

  padding-top: 2rem;
  height: fit-content;
  .btn_wrap {
    width: fit-content;

    margin-top: 1rem;
    button {
      padding: 0.6rem 1rem;
    }
  }
  h1 {
    font-size: 1.5rem;
    text-align: center;
    .kor {
      font-size: 1.4rem;
    }
    span {
      display: block;
    }
  }
`;
