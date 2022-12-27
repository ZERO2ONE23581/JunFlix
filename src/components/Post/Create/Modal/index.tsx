import { Layer } from './Layer';
import { PostInfo } from './Info';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { ImageInput } from './Image_Input';
import { AnimatePresence } from 'framer-motion';
import { IPostForm } from '../../../../types/post';
import { OverlayBg } from '../../../../Tools/OverlayBg';
import { PostSt } from '../../../../../styles/post';
import { useUser } from '../../../../libs/client/useUser';
import { Dispatch, SetStateAction, useState } from 'react';
import { color, TransBorder } from '../../../../../styles/variants';
import {
  useLength,
  useUploadImg,
  useResponsive,
} from '../../../../libs/client/useTools';
import { MobModal } from '../../../../../styles/mobile';

interface ICreatePostSt {
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
export const Modal = ({ _data }: ICreatePostSt) => {
  const {
    post,
    theme,
    modal,
    loading,
    layoutId,
    setLoading,
    closeModal: close,
  } = _data;
  const {
    reset,
    watch,
    setError,
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>({
    mode: 'onSubmit',
  });
  const router = useRouter();
  const { board_id } = router.query;
  const { loggedInUser, isLoggedIn } = useUser();
  const onValid = async (inputs: IPostForm) => {
    if (loading) return;
    if (!isLoggedIn) return;
    const title_len = useLength(inputs.title);
    const desc_len = useLength(inputs.description!);
    if (title_len >= 50)
      return setError('title', { message: 'max_post_title' });
    if (desc_len >= 1000)
      return setError('description', { message: 'max_post_desc' });
    //
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
    const img_id = await useUploadImg(inputs.post_image);
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
  const { isDesk } = useResponsive();
  const layer_data = { ...__data, setStep, closeModal };
  const _useform = { watch, errors, register, clearErrors };
  return (
    <AnimatePresence>
      {modal && (
        <Cont isDesk={isDesk}>
          <PostSt
            exit="exit"
            animate="animate"
            initial="initial"
            className="modal"
            variants={vars}
            layoutId={layoutId}
            custom={{ theme, isDesk }}
          >
            <form onSubmit={handleSubmit(onValid)}>
              <Layer _data={{ ...layer_data, isDesk }} />
              <ImageInput
                _data={{ theme, isNext, _watch: watch, _register: register }}
              />
              <PostInfo _data={{ ...__data }} _useform={_useform} />
            </form>
          </PostSt>
          <OverlayBg closeModal={closeModal} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MobModal)`
  .modal {
    color: inherit;
    align-items: flex-start;
    background-color: inherit;
    .layer {
      padding: 0;
    }
  }
`;
const transition = { duration: 0.5 };
const vars = {
  animate: ({ theme, isDesk }: any) => ({
    scale: 1,
    opacity: 1,
    transition,
    backgroundColor: color(!theme),
    border: !isDesk ? '1px solid transparent' : TransBorder(!theme),
  }),
  exit: () => ({ opacity: 0, scale: 0.1, transition }),
  initial: () => ({ opacity: 0, scale: 0.1, transition }),
};
