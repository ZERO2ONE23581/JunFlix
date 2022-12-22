import { UpdatePost } from '../Update';
import { DeletePost } from '../Delete';
import { PostModal } from './Read/Modal';
import { IPostType } from '../../../types/post';
import { Dispatch, SetStateAction } from 'react';
import { CommentModal } from '../../Comment/Modal';

interface IPostModals {
  _data: {
    read: boolean;
    cmtModal: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
  _edit: {
    modal: string;
    theme: boolean;
    post: IPostType;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const Modals = ({ _data, _edit }: IPostModals) => {
  const { theme, post, setModal } = _edit;
  const { read, cmtModal, setFixed, setCmtModal } = _data;
  const post_id = post?.id!;
  const host_id = post?.host_id!;
  const layoutId = post?.id! + '';
  const isBlocked = post?.onPrivate!;
  const __must = { theme, setModal, layoutId, setCmtModal };
  const __post = { ...__must, post, setFixed, modal: read };
  const __cmt = { ...__must, post_id, host_id, cmtModal, isBlocked };
  return (
    <>
      <PostModal _data={__post} />
      <UpdatePost _data={_edit} />
      <DeletePost _data={_edit} />
      <CommentModal _data={__cmt} />
    </>
  );
};
