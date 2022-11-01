import { Layer } from './Layer';
import styled from '@emotion/styled';
import { PostInfo } from './Info';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ImageInput } from './Image_Input';
import { AnimatePresence } from 'framer-motion';
import { IPostForm } from '../../../../types/post';
import { OverlayBg } from '../../../../Tools/overlay';
import { PostModal } from '../../../../../styles/post';
import { useUser } from '../../../../libs/client/useUser';
import { Dispatch, SetStateAction, useState } from 'react';
import { TransBorderVar } from '../../../../../styles/variants';
import { useTextLimit, useUploadImg } from '../../../../libs/client/useTools';

interface ICreatePostModal {
  _data: {
    modal: boolean;
    theme: boolean;
    loading: boolean;
    layoutId: string;
    post: ({}) => void;
    closeModal: () => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
  };
}
export const Modal = ({ _data }: ICreatePostModal) => {
  const router = useRouter();
  const { board_id } = router.query;
  const post = _data?.post!;
  const theme = _data?.theme!;
  const modal = _data?.modal!;
  const loading = _data?.loading!;
  const close = _data?.closeModal!;
  const layoutId = _data?.layoutId!;
  const setLoading = _data?.setLoading!;
  //
  const { loggedInUser, isLoggedIn } = useUser();
  const {
    reset,
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({
    mode: 'onSubmit',
  });
  const onValid = async (inputs: IPostForm) => {
    if (loading) return;
    if (!isLoggedIn) return;
    const { ok } = useTextLimit({
      _data: {
        setError,
        max: [50, 1000],
        types: ['title', 'description'],
        texts: [inputs.title, inputs.description],
      },
    });
    if (!ok) return;
    setLoading(true);
    const option = (inputs: any) => {
      const { hashtags, pageLink } = inputs;
      const isNone = Boolean(!hashtags && !pageLink);
      const tags = { hashtags: '#junflix #movie' };
      const links = { pageLink: 'www.junflix.com' };
      const both = { ...tags, ...links };
      if (isNone) return post({ ...inputs, ...tags, ...both });
      if (!hashtags) return post({ ...inputs, ...tags });
      if (!pageLink) return post({ ...inputs, ...links });
      if (hashtags && pageLink) return post({ ...inputs });
    };
    const host_id = loggedInUser?.id!;
    const img_id = await useUploadImg(inputs.post_image, host_id);
    if (!img_id)
      return option({ ...inputs, host_id, post_image: null, board_id });
    if (img_id)
      return option({ ...inputs, host_id, post_image: img_id, board_id });
  };
  const [step, setStep] = useState(1);
  const isNext = Boolean(step === 2);
  const closeModal = () => {
    close();
    reset();
    setStep(1);
  };
  const __data = { theme, isNext };
  const layer_data = { ...__data, setStep, closeModal };
  const _useform = { watch, errors, register, clearErrors };
  const ImageInput_data = { ...__data, _useform, isCreate: true };
  return (
    <AnimatePresence>
      {modal && (
        <>
          <Cont
            exit="exit"
            animate="animate"
            initial="initial"
            custom={theme}
            layoutId={layoutId}
            variants={TransBorderVar}
          >
            <form onSubmit={handleSubmit(onValid)}>
              <Layer _data={{ ...layer_data }} />
              <ImageInput data={{ ...ImageInput_data }} />
              <PostInfo _data={{ ...__data }} _useform={_useform} />
            </form>
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(PostModal)`
  form {
    width: 100%;
    height: 100%;
    .image-input {
      margin-bottom: 10px;
      .circle-svg {
        top: 4.5rem;
        left: 1.5rem;
      }
    }
    .post-info {
      height: fit-content;
    }
  }
`;
