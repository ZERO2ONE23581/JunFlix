import {
  isOverMax,
  useLength,
  useMaxLength,
} from '../../../libs/client/useTools';
import styled from '@emotion/styled';
import { Layer } from './post_layer';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ICreatePostRes, IPostForm } from '../../../types/post';
import { opacityVar, variants } from '../../../../styles/variants';
import { PostModalStyle } from '../../../../styles/post';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { PostImage } from './post_img_input';
import { PostContents } from './post_contents';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OverlayBg } from '../../../Tools/overlay';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { MessageModal } from '../../../Tools/msg_modal';
import { SelectBoard } from './select_board';

interface ICreatePost {
  modal: boolean;
  theme: boolean;
  closeModal: () => void;
}
export const CreatePost = ({ modal, theme, closeModal }: ICreatePost) => {
  const lightTheme = !theme;
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const [step, setStep] = useState(1);
  const { max } = useMaxLength(50, 1000);
  const [message, setMessage] = useState('');
  const [Loading, setLoading] = useState(false);
  const host_id = loggedInUser?.id;
  useEffect(() => {
    if (user_id && host_id) {
      const isMeHost = Boolean(Number(user_id) === host_id);
      if (!isMeHost) return setMessage('You are not the host!');
    }
  }, [user_id, host_id, setMessage]);
  //
  const {
    watch,
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({
    mode: 'onSubmit',
  });
  //preview
  const postImage = watch('post_image');
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (postImage && postImage.length > 0) {
      const file = postImage[0];
      setPreview(URL.createObjectURL(file));
    } else setPreview('');
  }, [postImage, setPreview]);

  //post api
  const [post, { data, loading }] =
    useMutation<ICreatePostRes>(`/api/post/create`);
  const onValid = async (inputs: IPostForm) => {
    //ERROR
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
    if (loading) return;

    //POST
    const Image = inputs.post_image;
    const hashtags = inputs.hashtags;
    const pageLink = inputs.pageLink;
    const Post = (types: any) => {
      const tags = { hashtags: '#junflix #movie' };
      const links = { pageLink: 'www.junflix.com' };
      const both = { ...tags, ...links };
      if (!hashtags && !pageLink) return post({ ...types, ...both });
      if (!hashtags) return post({ ...types, ...tags });
      if (!pageLink) return post({ ...types, ...links });
      else return post({ ...types });
    };
    const must = { ...inputs, host_id }; // required data
    if (Image && Image.length > 0 && host_id) {
      const { uploadURL } = await (await fetch(`/api/file`)).json();
      const form = new FormData();
      form.append('file', Image[0], host_id.toString());
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();
      return Post({ ...must, post_image: id });
    } else {
      return Post({ ...must, post_image: null });
    }
  };

  //api result
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setMessage(data.error);
        if (data.ok) return closeModal();
      }, 1000);
    }
  }, [data, setLoading, setMessage, closeModal]);
  const create_result = { isPost: data?.ok!, post_id: data?.post_id! };
  //
  return (
    <AnimatePresence>
      {!Loading && (
        <>
          {modal && (
            <>
              <Modal
                exit="exit"
                animate="animate"
                initial="initial"
                variants={opacityVar}
              >
                <form onSubmit={handleSubmit(onValid)}>
                  <Layer
                    step={step}
                    theme={theme}
                    setStep={setStep}
                    closeModal={closeModal}
                  />
                  <Main
                    animate="animate"
                    className="main"
                    custom={lightTheme}
                    variants={variants}
                  >
                    <PostImage
                      step={step}
                      theme={theme}
                      preview={preview}
                      img_id="post_image"
                      register={register('post_image')}
                      deletePreview={() => setPreview('')}
                    />
                    <PostContents
                      watch={watch}
                      theme={theme}
                      errors={errors}
                      register={register}
                      isNext={Boolean(step === 2)}
                    />
                  </Main>
                </form>
              </Modal>
              <MessageModal
                message={message}
                setMessage={setMessage}
                theme={theme}
              />
              <OverlayBg closeModal={closeModal} />
            </>
          )}
          <SelectBoard theme={theme} create_result={{ ...create_result }} />
        </>
      )}
      {Loading && <LoadingModal theme={theme} />}
    </AnimatePresence>
  );
};
const Modal = styled(PostModalStyle)`
  min-width: 500px;
  min-height: 700px;
  .layer {
    height: 7%;
    width: 100%;
  }
  .main {
    width: 100%;
    height: 93%;
  }
`;
const Main = styled(motion.div)`
  overflow: auto;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
`;
