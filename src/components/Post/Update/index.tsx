import {
  useCapLetters,
  useTextLimit,
  useUploadImg,
} from '../../../libs/client/useTools';
import { Modal } from './Modal';
import styled from '@emotion/styled';
import { UploadFile } from './Upload';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { IRes } from '../../../types/global';
import { AnimatePresence } from 'framer-motion';
import { MsgModal } from '../../../Tools/msg_modal';
import useMutation from '../../../libs/client/useMutation';
import { IPostForm, IPostType } from '../../../types/post';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IUpdate {
  modal: string;
  theme: boolean;
  post: IPostType;
  setModal: Dispatch<SetStateAction<string>>;
}
export const UpdatePost = ({ theme, post, modal, setModal }: IUpdate) => {
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [hide, setHide] = useState(false);
  const layoutId = post?.id! + 'update' + '';
  const [preview, setPreview] = useState('');
  const [Loading, setLoading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [new_boardId, setNewBoardId] = useState(0);
  //
  const [update, { data, loading }] = useMutation<IRes>(
    `/api/post/${post?.id}/update`
  );
  const [_delete, { data: deleteData, loading: deleteLoading }] =
    useMutation<IRes>(`/api/post/${post?.id}/delete`);
  //
  const {
    reset,
    watch,
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onBlur' });

  const _useform = {
    reset,
    watch,
    errors,
    register,
    setValue,
    clearErrors,
  };
  useEffect(() => {
    if (post) {
      if (post?.hashtags) setValue('hashtags', post.hashtags);
      if (post?.pageLink) setValue('pageLink', post.pageLink);
      if (post?.onPrivate) setValue('onPrivate', post.onPrivate);
      if (post?.title) setValue('title', useCapLetters(post.title));
      if (post?.description) setValue('description', post.description);
    }
  }, [post, setValue, useCapLetters]);

  const resetPreview = () => {
    setPreview('');
    if (post) {
      reset({
        title: post.title,
        post_image: undefined,
        hashtags: post.hashtags!,
        pageLink: post.pageLink!,
        description: post.description!,
      });
    }
  };
  const __data = {
    modal,
    theme,
    preview,
    layoutId,
    setModal,
    resetPreview,
  };
  const onValid = async (inputs: IPostForm) => {
    if (loading!) return;
    if (isDelete) {
      if (deleteLoading!) return;
      setLoading!(true);
      return _delete!({ isDelete });
    } else {
      const { ok } = useTextLimit({
        _data: {
          setError,
          max: [50, 1000],
          types: ['title', 'description'],
          texts: [inputs.title, inputs.description],
        },
      });
      if (!ok) return;
      setLoading!(true);
      const board_id = new_boardId;
      const file_id = await useUploadImg(inputs?.post_image, post?.host_id!);
      if (hide) return update({ ...inputs, board_id, post_image: null });
      if (file_id) return update({ ...inputs, post_image: file_id, board_id });
      else return update({ ...inputs, board_id });
    }
  };
  useEffect(() => {
    if (data) {
      setModal('');
      setTimeout(() => {
        if (data) {
          if (data?.error) alert(data.error);
          if (data?.ok) {
            setLoading(false);

            setMsg('updated');
            setTimeout(() => {
              router.reload();
            }, 2000);
          }
        }
      }, 1000);
    }
  }, [data, router, setLoading, setMsg]);

  useEffect(() => {
    if (deleteData) {
      setModal('');
      setTimeout(() => {
        setLoading(false);
        if (deleteData) {
          if (deleteData?.error) alert(deleteData.error);
          if (deleteData?.ok) {
            setMsg('deleted');
            setTimeout(() => {
              router.reload();
            }, 2000);
          }
        }
      }, 1000);
    }
  }, [deleteData, router, setLoading, setMsg]);
  //
  return (
    <>
      <AnimatePresence>
        <Form onSubmit={handleSubmit(onValid)}>
          <Modal
            _useform={_useform}
            _data={{
              ...__data,
              hide,
              post,
              setHide,
              setIsDelete,
              new_boardId,
              setNewBoardId,
            }}
          />
          <UploadFile _useform={_useform} _data={{ ...__data, setPreview }} />
        </Form>
      </AnimatePresence>
      {Loading && <LoadingModal layoutId={layoutId + 'submit'} theme={theme} />}
      <MsgModal _data={{ msg, theme, layoutId: layoutId + 'submit' }} />
    </>
  );
};
const Form = styled.form`
  .update-modal {
    .wrapper {
      .image-setting {
        justify-content: flex-start;
      }
    }
  }
  .select-modal {
    z-index: 114;
    margin-top: 12rem;
    height: fit-content;
    .wrap {
      padding: 10px;
    }
  }
  .upload-modal {
    .file-input {
      width: 100%;
      height: 80vh;
      label {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
`;
