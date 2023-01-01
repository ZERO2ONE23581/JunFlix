import { Comments } from '../../Comments';
import { Comment } from './Comment';
import { ReplyModal } from './Reply/ReplyModal';
import { UpdateModal } from './Update';
import { DeleteModal } from './Delete';
import { Dispatch, SetStateAction, useState } from 'react';
import { TheComment } from '../../../../libs/client/useComment';

export interface IClickSvg {
  type: string;
  comment: TheComment;
}
interface IReadCmt {
  _data: {
    theme: boolean;
    comment: TheComment;
    setModal: Dispatch<SetStateAction<string>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const ReadCmt = ({ _data }: IReadCmt) => {
  const [modal, setModal] = useState('');
  const [select, setSelect] = useState(0);
  const [option, setOption] = useState(false);
  const { theme, comment, setModal: setPost, setCmtModal } = _data;

  const closeModal = () => {
    setModal('');
    setSelect(0);
    setOption(false);
  };
  const { id: og_id, post_id } = comment;
  const isOption = option && select === comment.id;
  const isModal = (type: string) =>
    Boolean(!option && modal === type && select === comment.id);
  const __state = { setModal, setSelect, setOption };
  const __data = { theme, comment, setPost, closeModal, setCmtModal };
  return (
    <>
      <Comment
        _data={{ ...__data, isOption, ...__state, setPost, setCmtModal }}
      />
      <Comments
        _data={{ theme, post_id, og_id, setModal: setPost, setCmtModal }}
      />
      <>
        <ReplyModal _data={{ ...__data, modal: isModal('reply') }} />
        <UpdateModal _data={{ ...__data, modal: isModal('update') }} />
        <DeleteModal _data={{ ...__data, modal: isModal('delete') }} />
      </>
    </>
  );
};
