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

interface ISetting {
  _data: {
    theme: boolean;
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
export const Setting = ({ _data, _setState, _modal }: ISetting) => {
  const { modal, select, option } = _modal;
  const { comment, clickSvg, theme } = _data;
  const isSelected = Boolean(select === comment.id);

  const isOption = option && isSelected;
  const isReply = !option && isSelected && Boolean(modal === 'reply');
  const isDelete = !option && isSelected && Boolean(modal === 'delete');
  const isUpdate = !option && isSelected && Boolean(modal === 'update');

  const { setPost, setModal, setSelect, setOption } = _setState;
  const closeModal = () => {
    setSelect(0);
    setModal('');
    setOption(false);
  };
  return (
    <AnimatePresence>
      <ReplyModal
        key={comment.id * 22}
        theme={theme}
        setPost={setPost}
        _data={{ closeModal, modal: isReply, targetCmt: comment }}
      />

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

      <UpdateModal
        key={comment.id * 33}
        _data={{ theme, setPost, closeModal, modal: isUpdate, comment }}
      />
      <DeleteModal
        key={comment.id * 44}
        _data={{ theme, setPost, closeModal, modal: isDelete, comment }}
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
