import { OptionModal } from './Modal';
import { useForm } from 'react-hook-form';
import { IPostForm } from '../../../../../../../types/post';
import { PostsModal } from '../../../../../Organize/PostList';
import { SelectBoard } from '../../../../../Organize/BoardList';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { CreateNewModal } from '../../../../../Organize/NewBoard';

interface IOrgPosts {
  _data: {
    theme: boolean;
    modal: string;
    closeModal: () => void;
  };
}
export const OrganizePosts = ({ _data }: IOrgPosts) => {
  const { theme, modal: mdoal_, closeModal } = _data;
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
      setArray([...watch!('chosenId')?.map((id) => Number(id))])!;
  }, [setArray, watch!('chosenId')]);
  //
  const open = Boolean(mdoal_ === 'posts');
  return (
    <>
      <OptionModal _data={{ open, theme, setModal, closeModal }} />
      <PostsModal
        _useform={{ register, clearErrors, setError, errors }}
        _data={{ array, modal, theme, layoutId, setModal }}
      />
      <SelectBoard
        _data={{ theme, modal, layoutId, posts: array, handleSubmit, setModal }}
      />
      <CreateNewModal
        _data={{ modal, theme, layoutId, posts: array, setModal }}
      />
    </>
  );
};
