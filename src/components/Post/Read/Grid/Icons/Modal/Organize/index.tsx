import { useEffect, useState } from 'react';
import { OptionModal } from './Modal';
import { useForm } from 'react-hook-form';
import { BoardsModal } from '../../../../../Organize/BoardList';
import { PostsModal } from '../../../../../Organize/PostList';
import { IPostForm } from '../../../../../../../types/post';
import { CreateNewModal } from '../../../../../Organize/CreateNewBoard';

interface IOrgPosts {
  _data: {
    theme: boolean;
    modal: boolean;
    closeModal: () => void;
  };
}
export const OrganizePosts = ({ _data }: IOrgPosts) => {
  const { theme, modal: open, closeModal } = _data;
  const [modal, setModal] = useState('');
  const [array, setArray] = useState<any>();
  const layoutId = 'organize_posts';
  const {
    watch,
    setError,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onSubmit' });

  useEffect(() => {
    if (watch!('chosenId'))
      setArray([...watch!('chosenId').map((id) => Number(id))]);
  }, [setArray, watch!('chosenId')]);
  //
  return (
    <>
      <OptionModal _data={{ open, theme, setModal, closeModal }} />
      <PostsModal
        _useform={{ register, clearErrors, setError, errors }}
        _data={{ array, modal, theme, layoutId, setModal }}
      />
      <BoardsModal
        _data={{ theme, modal, layoutId, posts: array, handleSubmit, setModal }}
      />
      <CreateNewModal
        _data={{ modal, theme, layoutId, posts: array, setModal }}
      />
    </>
  );
};
