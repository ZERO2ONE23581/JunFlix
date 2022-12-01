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
import { IClickSvg } from '../Comments/Comment';
import { Option } from './Option';

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
    setCmtModal: Dispatch<SetStateAction<boolean>>;
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

  const { setPost, setModal, setSelect, setOption, setCmtModal } = _setState;
  const closeModal = () => {
    setSelect(0);
    setModal('');
    setOption(false);
  };
  return (
    <>
      <ReplyModal
        theme={theme}
        setPost={setPost}
        _data={{ setCmtModal, closeModal, modal: isReply, targetCmt: comment }}
      />
      <Option _data={{ theme, clickSvg, comment, isOption, closeModal }} />
      <UpdateModal
        _data={{
          theme,
          setPost,
          comment,
          closeModal,
          modal: isUpdate,
          setCmtModal,
        }}
      />
      <DeleteModal
        _data={{
          theme,
          setPost,
          closeModal,
          modal: isDelete,
          comment,
          setCmtModal,
        }}
      />
    </>
  );
};
