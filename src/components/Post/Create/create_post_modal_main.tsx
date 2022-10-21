import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FileInput } from '../file_input';
import { PostContents } from './post_contents';
import { IPostForm, IPostFormErr } from '../../../types/post';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface IMain {
  theme: boolean;
  hideInput: boolean;
  preview: string;
  isNext: boolean;
  deletePreview: () => void;
  useForm: {
    errors: IPostFormErr;
    watch: UseFormWatch<IPostForm>;
    register: UseFormRegister<IPostForm>;
  };
}
export const Main = ({
  theme,
  isNext,
  useForm,
  preview,
  deletePreview,
  hideInput,
}: IMain) => {
  const watch = useForm?.watch;
  const errors = useForm?.errors;
  const register = useForm?.register;
  const fileInput_data = {
    isNext,
    preview,
    usedAs: 'create',
    deletePreview,
    id: 'post_image',
    register: register('post_image'),
  };
  //
  return (
    <>
      <Cont className="main">
        <FileInput
          theme={theme}
          open={!hideInput}
          data={{ ...fileInput_data }}
        />
        <PostContents
          theme={theme}
          watch={watch}
          isNext={isNext}
          errors={errors}
          register={register}
        />
      </Cont>
    </>
  );
};
const Cont = styled(motion.div)`
  .circle-svg {
    top: 1.5rem;
    left: 2rem;
  }
  width: 100%;
  height: 80vh;
  height: 92%;
  overflow: auto;
  position: relative;
  ::-webkit-scrollbar {
    display: none;
  }
`;
