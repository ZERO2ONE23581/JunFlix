import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ShowImage } from './show_image';
import { BtnWrap } from './update_postImg_btns';
import { variants } from '../../../../styles/variants';
import { PostContents } from './post_contents';
import { IPostForm, IPostFormErr } from '../../../types/post';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

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
    selectQuck: boolean;
  };
  useform: {
    errors: IPostFormErr;
    watch: UseFormWatch<IPostForm>;
    register: UseFormRegister<IPostForm>;
  };
  onClick: (type: string) => void;
  openBoardList: () => void;
  id: {
    host_id: number;
    board_id: number;
    chosen_board_id: number;
  };
}

export const Main = ({
  id,
  onClick,
  useform,
  isString,
  isBoolean,
  openBoardList,
}: IMain) => {
  const host_id = id?.host_id!;
  const board_id = id?.board_id!;
  const chosen_board_id = id?.chosen_board_id!;
  const watch = useform?.watch;
  const errors = useform?.errors;
  const register = useform?.register;
  const theme = isBoolean?.theme;
  const isHide = isBoolean?.isHide;
  const fileInput = isBoolean?.fileInput;
  const selectQuck = isBoolean?.selectQuck;
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
          <motion.div
            custom={theme}
            animate="animate"
            variants={variants}
            className="content-wrap"
          >
            <PostContents
              id={{
                host_id,
                board_id,
                chosen_board_id,
              }}
              watch={watch}
              theme={theme}
              errors={errors}
              register={register}
              selectQuck={selectQuck}
              openBoardList={openBoardList}
              isShrink={(original || preview) && !isHide}
            />
          </motion.div>
        </Container>
      )}
    </>
  );
};
const Container = styled(motion.article)`
  height: 100%;
  position: relative;
  .content-wrap {
    height: 100%;
    .contents {
    }
  }
`;
