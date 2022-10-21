import styled from '@emotion/styled';
import { EditBtns } from './update_postImg_btns';
import { variants } from '../../../../styles/variants';
import { PostInputsWrap } from './update_post_main_inputs';
import { IPostForm, IPostFormErr } from '../../../types/post';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';
import { PostImage } from './main_postImage';
import { FlexCol } from '../../../../styles/global';

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
  onClick: (type: string) => void;
  clickDelete: () => void;
  openBoardList: () => void;
  id: {
    host_id: number;
    board_id: number;
    chosen_board_id: number;
  };
  useform: {
    errors: IPostFormErr;
    watch: UseFormWatch<IPostForm>;
    register: UseFormRegister<IPostForm>;
  };
}

export const Main = ({
  id,
  onClick,
  useform,
  isString,
  isBoolean,
  clickDelete,
  openBoardList,
}: IMain) => {
  const theme = isBoolean?.theme;
  const isHide = isBoolean?.isHide;
  const fileInput = isBoolean?.fileInput;
  const selectQuck = isBoolean?.selectQuck;
  const src = isString?.src;
  const preview = isString?.preview;
  const original = isString?.original;
  const isImg = Boolean(original || preview);
  const openImg = isImg && !isHide;
  //
  return (
    <>
      {!fileInput && (
        <Cont
          custom={theme}
          className="main"
          animate="animate"
          variants={variants}
        >
          <PostInputsWrap
            id={id}
            theme={theme}
            useform={useform}
            clickDelete={clickDelete}
            selectQuck={selectQuck}
            openBoardList={openBoardList}
            isShrink={Boolean(original || preview) && !isHide}
          />
          <PostImage
            src={src}
            open={openImg}
            preview={preview}
            original={original}
          />
          <EditBtns
            theme={theme}
            onClick={onClick}
            data={{ isHide, original, preview }}
          />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(FlexCol)`
  position: relative;
  align-items: flex-start;
  min-height: 100%;
  .post_image {
    border: 5px solid hotpink;
  }
  .main_inputs {
    left: 0;
    top: 2rem;
    position: absolute;
    border: 5px solid blueviolet;
  }
`;
