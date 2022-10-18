import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { variants } from '../../../../styles/variants';
import { IPostForm, IPostFormErr } from '../../../types/post';
import { PostContents } from './post_contents';
import { ShowImage } from './show_image';
import { BtnWrap } from './update_postImg_btns';

interface IMain {
  isString: {
    src: string;
    preview: string;
    original: string | null;
  };
  isBoolean: {
    theme: boolean;
    isHide: boolean;
    fileInput: boolean;
  };
  useform: {
    errors: IPostFormErr;
    watch: UseFormWatch<IPostForm>;
    register: UseFormRegister<IPostForm>;
  };
  onClick: (type: string) => void;
}

export const Main = ({ isString, onClick, useform, isBoolean }: IMain) => {
  const watch = useform?.watch;
  const errors = useform?.errors;
  const register = useform?.register;
  const theme = isBoolean?.theme;
  const isHide = isBoolean?.isHide;
  const fileInput = isBoolean?.fileInput;
  const src = isString?.src;
  const preview = Boolean(isString?.preview);
  const original = Boolean(isString?.original);
  //
  return (
    <>
      {!fileInput && (
        <Container animate="animate" variants={variants} custom={theme}>
          <BtnWrap
            theme={theme}
            onClick={onClick}
            isBoolean={{ original, preview, isHide }}
          />
          <ShowImage
            src={src}
            theme={theme}
            isBoolean={{ original, preview, isHide }}
          />
          <PostContents
            watch={watch}
            theme={theme}
            errors={errors}
            register={register}
            isShrink={(original || preview) && !isHide}
          />
        </Container>
      )}
    </>
  );
};
const Container = styled(motion.article)`
  height: 100%;
  position: relative;
`;
