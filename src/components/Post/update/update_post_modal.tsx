import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostModalStyle } from '../../../../styles/post';
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
import { postModalVar } from '../read/post_grid_modal';
import { FileInput } from './img_input';
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
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({ mode: 'onBlur' });
  //

  const [src, setSrc] = useState('');
  const original = post?.post_image;
  const [preview, setPreview] = useState('');
  const [isHide, setIsHide] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [fileInput, setFileInput] = useState(false);
  const [selectModal, setSelectModal] = useState(false);
  const [chosen_board_id, setChosen_board_id] = useState(0);
  //
  const handleClick = (type: string) => {
    const onReset = () =>
      reset({
        post_image: undefined,
        title: watch('title'),
        hashtags: watch('hashtags'),
        pageLink: watch('pageLink'),
        description: watch('description'),
      });
    if (type !== 'add') {
      setFileInput(false);
      if (type !== 'add-new') {
        onReset();
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
  //preview
  useEffect(() => {
    const image = watch('post_image');
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [watch('post_image'), setPreview]);
  //
  useEffect(() => {
    if (preview) return setSrc(preview);
    if (original) return setSrc(avatarLink(post?.post_image));
  }, [setPreview, preview, original]);
  //
  interface ITest {
    test: any;
  }
  //POST
  const onValid = async (inputs: IPostForm) => {
    if (loading) return;
    useError({
      setError,
      title: inputs?.title,
      desc: inputs?.description!,
      max: { title: 50, desc: 1000 },
    });
    setLoading(true);
    const image = inputs?.post_image;
    const file_id = await useUploadImg(image, post?.host_id!);
    if (file_id) {
      return update({ ...inputs, post_image: file_id });
    } else if (original && !preview && isHide) {
      return update({ ...inputs, post_image: 'delete_og' });
    } else return update({ ...inputs });
  };
  //post api
  const [update, { data, loading }] = useMutation<ICreatePostRes>(
    `/api/post/${post?.id}/update`
  );
  useEffect(() => {
    if (post) {
      if (post?.hashtags) setValue('hashtags', post.hashtags);
      if (post?.pageLink) setValue('pageLink', post.pageLink);
      if (post?.title) setValue('title', useCapLetters(post.title));
      if (post?.description) setValue('description', post.description);
    }
  }, [post, setValue, useCapLetters]);
  //
  const [selectQuck, setSelectQuick] = useState(false);
  const closeSelectModal = () => {
    setChosen_board_id(0);
    setSelectQuick(false);
    setSelectModal(false);
  };
  return (
    <AnimatePresence>
      {/* {true && ( */}
      {modal && (
        <>
          {/* {!Loading && ( */}
          {true && (
            <>
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
                    closeSelectModal={() => setSelectModal(false)}
                  />
                  <FileInput
                    theme={theme}
                    open={fileInput}
                    data={{
                      preview,
                      input_id: 'post_image',
                      register: register('post_image'),
                      clearPreview: () => setPreview(''),
                    }}
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
                    openBoardList={() => setSelectModal(true)}
                    isBoolean={{ theme, isHide, fileInput, selectQuck }}
                  />
                </form>
              </Modal>
              <OverlayBg
                dark={0.5}
                zIndex={111}
                closeModal={() => handleClick('close')}
              />
              <SelectBoardModal
                theme={theme}
                modal={selectModal}
                host_id={post?.host?.id!}
                closeModal={closeSelectModal}
                setSelectModal={setSelectModal}
                setSelectQuick={setSelectQuick}
                setChosen_board_id={setChosen_board_id}
              />
            </>
          )}
          {Loading && <LoadingModal theme={theme} />}
        </>
      )}
    </AnimatePresence>
  );
};
const Modal = styled(PostModalStyle)`
  z-index: 112;
`;
