import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostModalStyle, postModalVar } from '../../../../styles/post';
import useMutation from '../../../libs/client/useMutation';
import {
  useCapLetters,
  useError,
  useUploadImg,
} from '../../../libs/client/useTools';
import { avatarLink } from '../../../Tools/Avatar';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { OverlayBg } from '../../../Tools/overlay';
import { ICreatePostRes, IPostForm, IPostType } from '../../../types/post';
import { FileInput } from '../file_input';
import { Layer } from './layer';
import { Main } from './main';
import { SelectBoardModal } from './select_board_modal';

interface IUpdatePostModal {
  post: IPostType;
  modal: boolean;
  theme: boolean;
  closeModal: () => void;
}

export const UpdatePostModal = ({
  post,
  modal,
  theme,
  closeModal,
}: IUpdatePostModal) => {
  const {
    reset,
    watch,
    register,
    setValue,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onBlur' });
  const original = post?.post_image;
  const [src, setSrc] = useState('');
  const [preview, setPreview] = useState('');
  const [isHide, setIsHide] = useState(false);
  const [delPost, setDelPost] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [fileInput, setFileInput] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const [selectQuck, setSelectQuick] = useState(false);
  const [chosen_board_id, setChosen_board_id] = useState(0);

  useEffect(() => {
    if (post) {
      if (post?.hashtags) setValue('hashtags', post.hashtags);
      if (post?.pageLink) setValue('pageLink', post.pageLink);
      if (post?.title) setValue('title', useCapLetters(post.title));
      if (post?.description) setValue('description', post.description);
    }
  }, [post, setValue, useCapLetters]);

  const closeSelectModal = () => {
    setChosen_board_id(0);
    setSelectQuick(false);
    setSelectModal(false);
  };
  //
  //console.log(watch());
  const handleClick = (type: string) => {
    const onReset = () => {
      reset({
        post_image: undefined,
        title: watch('title'),
        hashtags: watch('hashtags'),
        pageLink: watch('pageLink'),
        onPrivate: watch('onPrivate'),
        description: watch('description'),
      });
    };
    if (type !== 'add') {
      onReset();
      setFileInput(false);
      if (type !== 'add-new') {
        setPreview('');
        if (type === 'close' || type === 'restore') {
          setIsHide(false);
          if (type === 'close') {
            closeSelectModal();
            closeModal();
          }
        }
        if (type === 'delete' && !preview) return setIsHide(true);
      }
    }
    if (type === 'add') {
      setIsHide(false);
      return setFileInput(true);
    }
  };

  useEffect(() => {
    const image = watch('post_image');
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [watch('post_image'), setPreview]);

  useEffect(() => {
    if (preview) return setSrc(preview);
    if (original) return setSrc(avatarLink(post?.post_image));
  }, [preview, original, setSrc, avatarLink, post?.post_image]);

  const onValid = async (inputs: IPostForm) => {
    console.log(inputs);
    return;
    //delete post
    if (del_loading) return;
    setLoading(true);
    if (delPost && post?.id) return delete_post({ isDelete: delPost });

    //update post
    if (loading) return;
    useError({
      setError,
      title: inputs?.title,
      desc: inputs?.description!,
      max: { title: 50, desc: 1000 },
    });
    setLoading(true);
    const image = inputs?.post_image;
    const board_id = chosen_board_id;
    const file_id = await useUploadImg(image, post?.host_id!);
    const isDelImage = Boolean(original && !preview && isHide && !file_id);
    //

    if (file_id) return update({ ...inputs, post_image: file_id, board_id });
    if (isDelImage)
      return update({ ...inputs, isDelImage, board_id, post_image: null });
    if (!isDelImage) return update({ ...inputs, board_id });
  };
  //post api
  const [update, { data, loading }] = useMutation<ICreatePostRes>(
    `/api/post/${post?.id}/update`
  );
  const [delete_post, { data: del_data, loading: del_loading }] = useMutation(
    `/api/post/${post?.id}/delete`
  );
  const router = useRouter();
  useEffect(() => {
    if (data || del_data) {
      setTimeout(() => {
        setLoading(false);
        if (data) {
          if (data?.error) alert(data.error);
          if (data?.ok) router.reload();
        }
        if (del_data) {
          if (del_data?.error) alert(del_data.error);
          if (del_data?.ok) alert(`the post is deleted.`);
        }
      }, 1000);
    }
  }, [data, del_data, router, setLoading]);
  //
  const deletePreview = () => setPreview('');
  const fileInput_data = {
    preview,
    deletePreview,
    usedAs: 'update',
    id: 'post_image',
    register: register('post_image'),
  };
  //
  return (
    <AnimatePresence>
      {modal && (
        <>
          {!Loading && (
            <Modal
              exit="exit"
              initial="initial"
              animate="animate"
              custom={theme}
              variants={postModalVar}
            >
              <form onSubmit={handleSubmit(onValid)}>
                <Layer
                  theme={theme}
                  fileInput={fileInput}
                  onClick={handleClick}
                  preview={Boolean(preview)}
                  clickClose={() => handleClick('close')}
                />
                <FileInput
                  theme={theme}
                  open={fileInput}
                  data={{ ...fileInput_data }}
                />
                <Main
                  id={{
                    chosen_board_id,
                    host_id: post.host_id,
                    board_id: post?.board_id!,
                  }}
                  onClick={handleClick}
                  useform={{ errors, watch, register }}
                  isString={{ src, preview, original }}
                  clickDelete={() => setDelPost(true)}
                  openBoardList={() => setSelectModal(true)}
                  isBoolean={{ theme, isHide, fileInput, selectQuck }}
                />
              </form>
            </Modal>
          )}
          {Loading && <LoadingModal theme={theme} />}
          <OverlayBg
            dark={0.5}
            zIndex={111}
            closeModal={() => handleClick('close')}
          />
          <SelectBoardModal
            theme={theme}
            host_id={post?.host?.id!}
            closeModal={closeSelectModal}
            setSelectModal={setSelectModal}
            setSelectQuick={setSelectQuick}
            modal={selectModal && modal && !Loading}
            setChosen_board_id={setChosen_board_id}
          />
        </>
      )}
    </AnimatePresence>
  );
};
const Modal = styled(PostModalStyle)`
  z-index: 112;
  .circle-svg {
    top: 4rem;
    left: 2rem;
  }
  .main {
    height: fit-content;
    border: 10px solid yellow;
  }
`;
