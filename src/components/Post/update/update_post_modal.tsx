import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostModalStyle } from '../../../../styles/post';
import useMutation from '../../../libs/client/useMutation';
import {
  isOverMax,
  useCapLetters,
  useLength,
  useMaxLength,
} from '../../../libs/client/useTools';
import { avatarLink } from '../../../Tools/Avatar';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { OverlayBg } from '../../../Tools/overlay';
import { ICreatePostRes, IPostForm, IPostType } from '../../../types/post';
import { postModalVar } from '../read/post_grid_modal';
import { FileInput } from './img_input';
import { Layer } from './layer';
import { Main } from './main';

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
  const { max } = useMaxLength(50, 1000);
  const [preview, setPreview] = useState('');
  const [isHide, setIsHide] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [fileInput, setFileInput] = useState(false);
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
          if (type === 'close') return closeModal();
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

  //POST
  const onValid = async (inputs: IPostForm) => {
    if (loading) return;

    const typed_title = useLength(inputs.title);
    const typed_desc = useLength(inputs.description!);
    if (isOverMax(typed_title, max.title))
      return setError('title', {
        message: `제목은 ${max.title}을 초과할 수 없습니다.`,
      });
    if (isOverMax(typed_desc, max.desc))
      return setError('description', {
        message: `포스트의 글자수는 ${max.desc}를 초과할 수 없습니다.`,
      });
    setLoading(true);
    //
    const image = inputs?.post_image;
    if (image && image.length > 0 && post.host_id) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', image[0], post.host_id.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      return update({ ...inputs, post_image: id });
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

  return (
    <AnimatePresence>
      {modal && (
        <>
          {!Loading && (
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
                    onClick={handleClick}
                    useform={{ errors, watch, register }}
                    isString={{ src, preview, original }}
                    isBoolean={{ theme, isHide, fileInput }}
                  />
                </form>
              </Modal>

              <OverlayBg
                dark={0.5}
                zIndex={111}
                closeModal={() => handleClick('close')}
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
