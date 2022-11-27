import { ISetPost } from '..';
import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { useEffect, useState } from 'react';
import { IRes } from '../../../types/global';
import { AnimatePresence } from 'framer-motion';
import { OverlayBg } from '../../../Tools/overlay';
import { color } from '../../../../styles/variants';
import useMutation from '../../../libs/client/useMutation';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { BtnWrap, Flex, Modal } from '../../../../styles/global';

interface IDeleteModal extends ISetPost {
  _data: {
    modal: boolean;
    cmt_id: number;
    post_id: number;
    closeModal: () => void;
  };
}
export const DeleteModal = ({ theme, _data, setPost }: IDeleteModal) => {
  const { cmt_id, modal, closeModal, post_id } = _data;
  const [post, { loading, data }] = useMutation<IRes>(`/api/comment/delete`);
  const [Loading, setLoading] = useState(false);
  const clickDelete = () => {
    if (loading) return;
    setLoading(true);
    return post({ post_id, cmt_id });
  };
  useEffect(() => {
    if (data) {
      setLoading(false);
      if (data.ok) {
        closeModal();
        setPost('');
        setTimeout(() => {
          setPost('read');
        }, 500);
      }
    }
  }, [data, closeModal, setPost]);
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
    min-width: 300px;
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

export const cmtModalVar = {
  initial: (theme: boolean) => ({
    y: 999,
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
  }),
  animate: (theme: boolean) => ({
    y: 0,
    opacity: 1,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
  exit: (theme: boolean) => ({
    y: 999,
    opacity: 0,
    color: color(theme),
    backgroundColor: color(!theme),
    transition: { duration: 0.5 },
  }),
};
