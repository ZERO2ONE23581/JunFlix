import { useError, useUploadImg } from '../../../libs/client/useTools';
import styled from '@emotion/styled';
import { Layer } from './post_layer';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ICreatePostRes, IPostForm } from '../../../types/post';
import { TransBorderVar } from '../../../../styles/variants';
import useMutation from '../../../libs/client/useMutation';
import useUser from '../../../libs/client/useUser';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { OverlayBg } from '../../../Tools/overlay';
import { LoadingModal } from '../../../Tools/Modal/loading_modal';
import { MsgModal } from '../../../Tools/msg_modal';
import { Main } from './create_post_modal_main';
import { Modal } from '../../../../styles/global';

interface ICreatePost {
  modal: boolean;
  theme: boolean;
  setModal: {
    close: () => void;
    open_select: () => void;
    save_post_id: (id: number) => void;
  };
}
export const CreatePost = ({ modal, theme, setModal }: ICreatePost) => {
  const router = useRouter();
  const { user_id } = router.query;
  const closeModal = setModal.close;
  const openSelect = setModal.open_select;
  const save_post_id = setModal.save_post_id;
  const [msg, setMsg] = useState('');
  const { loggedInUser } = useUser();
  const [step, setStep] = useState(1);
  const host_id = loggedInUser?.id;
  const [Loading, setLoading] = useState(false);
  const isMeHost = Boolean(Number(user_id) === host_id);
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

  //
  const onValid = async (inputs: IPostForm) => {
    const { hashtags, pageLink } = inputs;
    const isNone = Boolean(!hashtags && !pageLink);
    const default_tags = { hashtags: '#junflix #movie' };
    const default_links = { pageLink: 'www.junflix.com' };
    const default_all = { ...default_tags, ...default_links };
    //
    if (loading || !isMeHost) return;
    useError({
      setError,
      title: inputs.title,
      desc: inputs.description,
      max: { title: 50, desc: 1000 },
    });
    //
    setLoading(true);
    const option = (inputs: any) => {
      if (isNone) return post({ ...inputs, ...default_tags, ...default_all });
      if (!hashtags) return post({ ...inputs, ...default_tags });
      if (!pageLink) return post({ ...inputs, ...default_links });
      if (hashtags && pageLink) return post({ ...inputs });
    };
    const img_id = await useUploadImg(inputs.post_image, host_id!);
    if (!img_id) return option({ ...inputs, host_id, post_image: null });
    if (img_id) return option({ ...inputs, host_id, post_image: img_id });
  };
  const [post, { data, loading }] =
    useMutation<ICreatePostRes>(`/api/post/create`);
  //
  useEffect(() => {
    if (data) {
      setTimeout(() => {
        setLoading(false);
        if (data.error) return setMsg(data.error);
        if (data.ok && data?.post_id) {
          save_post_id(data.post_id);
          closeModal();
          openSelect();
        }
      }, 1000);
    }
  }, [data, setLoading, setMsg, closeModal, openSelect, save_post_id]);
  const [hideInput, setHideInput] = useState(false);
  const deletePreview = () => setPreview('');
  //
  return (
    <AnimatePresence>
      {modal && (
        <>
          {!Loading && (
            <CreateModal
              exit="exit"
              animate="animate"
              initial="initial"
              custom={theme}
              variants={TransBorderVar}
            >
              <form onSubmit={handleSubmit(onValid)}>
                <Layer
                  preview={Boolean(preview)}
                  setHideInput={setHideInput}
                  step={step}
                  theme={theme}
                  setStep={setStep}
                  closeModal={closeModal}
                />
                <Main
                  theme={theme}
                  preview={preview}
                  hideInput={hideInput}
                  isNext={Boolean(step === 2)}
                  deletePreview={deletePreview}
                  useForm={{ errors, watch, register }}
                />
              </form>
            </CreateModal>
          )}
          {Loading && <LoadingModal theme={theme} />}
          <MsgModal msg={msg} theme={theme} closeModal={() => setMsg('')} />
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
export const CreateModal = styled(Modal)`
  z-index: 100;
  padding: 0;
  width: 40vw;
  height: 88vh;
  min-width: 520px;
  font-size: 1.1rem;
  justify-content: flex-start;
  .layer {
  }
  .main {
    //border: 2px solid blue;
    .post-image {
      //border: 10px solid red;
      label {
        //border: 5px solid blueviolet;
        img {
          //border: 3px solid blue;
        }
      }
    }
  }
  form {
    width: 100%;
    height: 100%;
  }
`;
