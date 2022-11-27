import styled from '@emotion/styled';
import { Svg } from '../../../Tools/Svg';
import { cmtModalVar, UpdateModal } from './Update';
import { Modal } from '../../../../styles/global';
import { OverlayBg } from '../../../Tools/overlay';
import { AnimatePresence, motion } from 'framer-motion';
import { hoverBgColor } from '../../../../styles/variants';
import { DeleteModal } from './Delete';
import { Dispatch, SetStateAction } from 'react';
import { TheComment } from '../../../libs/client/useComment';
import { ReplyModal } from './Reply';
import { IClickSvg } from '../Comments';

interface IOPtion {
  _data: {
    og_id: number;
    theme: boolean;
    post_id: number;
    reply_id?: number;
    comment: TheComment;
    clickSvg: ({ type, comment }: IClickSvg) => void;
  };
  _modal: {
    modal: string;
    select: number;
    option: boolean;
  };
  _setState: {
    setPost: Dispatch<SetStateAction<string>>;
    setModal: Dispatch<SetStateAction<string>>;
    setSelect: Dispatch<SetStateAction<number>>;
    setOption: Dispatch<SetStateAction<boolean>>;
  };
}
export const Option = ({ _data, _setState, _modal }: IOPtion) => {
  const { modal, select, option } = _modal;
  const { setPost, setModal, setSelect, setOption } = _setState;
  const { post_id, comment, clickSvg, theme, og_id, reply_id } = _data;
  const isSelected = Boolean(select === comment.id);
  const isOption = option && isSelected;
  const isReply = !option && isSelected && Boolean(modal === 'reply');
  const isDelete = !option && isSelected && Boolean(modal === 'delete');
  const isUpdate = !option && isSelected && Boolean(modal === 'update');
  const closeModal = () => {
    setSelect(0);
    setModal('');
    setOption(false);
  };
  return (
    <AnimatePresence>
      {isOption && (
        <>
          <Cont
            exit="exit"
            layoutId="option"
            initial="initial"
            animate="animate"
            className="modal"
            custom={theme}
            variants={cmtModalVar}
          >
            <Svg type="close" theme={theme} onClick={closeModal} />
            <Btn
              whileHover="hover"
              variants={hoverBgColor}
              onClick={() => clickSvg({ type: 'edit', comment })}
            >
              Edit
            </Btn>
            <Btn
              whileHover="hover"
              variants={hoverBgColor}
              onClick={() => clickSvg({ type: 'delete', comment })}
            >
              Delete
            </Btn>
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
      <ReplyModal
        theme={theme}
        setPost={setPost}
        key={comment.id * 22}
        _data={{ post_id, closeModal, modal: isReply }}
        _reply={{ og_id, rep_userId: comment.host.userId, reply_id }}
      />
      <UpdateModal
        theme={theme}
        setPost={setPost}
        key={comment.id * 33}
        _data={{ post_id, closeModal, modal: isUpdate, og_cmt: comment }}
      />
      <DeleteModal
        theme={theme}
        setPost={setPost}
        key={comment.id * 44}
        _data={{ post_id, closeModal, modal: isDelete, cmt_id: comment.id }}
      />
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  top: 50%;
  z-index: 100;
  width: 40vw;
  height: fit-content;
`;
const Btn = styled(motion.div)`
  width: 100%;
  padding: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 10px;
  padding: 0.5rem 1rem;
`;
