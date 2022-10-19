import styled from '@emotion/styled';
import { OpenSelectBoard } from './open_select_board';
import { AnimatePresence } from 'framer-motion';
import { InputWrap } from '../../../Tools/Input';
import { PostInfo } from '../../../../styles/post';
import { FlexCol } from '../../../../styles/global';
import { ICreatePostForm } from '../../../types/post';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';

interface IPostContents extends ICreatePostForm {
  isShrink: boolean;
  selectQuck: boolean;
  openBoardList: () => void;
  id: {
    host_id: number;
    board_id: number;
    chosen_board_id: number;
  };
}
export const PostContents = ({
  id,
  watch,
  theme,
  errors,
  register,
  isShrink,
  selectQuck,
  openBoardList,
}: IPostContents) => {
  const host_id = id?.host_id!;
  const board_id = id?.board_id!;
  const chosen_board_id = id?.chosen_board_id!;

  return (
    <AnimatePresence>
      <Cont
        animate="animate"
        className="contents"
        variants={contentsVar}
        custom={{ theme, isShrink }}
      >
        <OpenSelectBoard
          id={{
            host_id,
            board_id,
            chosen_board_id,
          }}
          theme={theme}
          open={openBoardList}
          selectQuck={selectQuck}
        />
        <Wrap className="wrap">
          <InputWrap
            id="title"
            type="text"
            theme={theme}
            label="Title"
            error={errors.title?.message}
            register={register('title', {
              required: '제목을 입력하세요.',
            })}
            watch={watch('title')}
            placeholder="포스트 제목을 입력해 주세요."
          />
          <TextAreaWrap
            theme={theme}
            id="description"
            startHeight={140}
            watch={watch!('description')}
            register={register('description')}
            error={errors.description?.message}
            placeholder="이 포스트에 대한 설명을 적어주세요."
            length={{ max: 1000, typed: watch('description') }}
          />
          <InputWrap
            type="text"
            id="hashtags"
            theme={theme}
            label="Movie Tags"
            watch={watch('hashtags')}
            register={register('hashtags')}
            placeholder="영화 태그 추가"
          />
          <InputWrap
            type="text"
            id="pageLink"
            label="Website"
            theme={theme}
            watch={watch('pageLink')}
            register={register('pageLink')}
            placeholder="웹사이트 링크 추가"
          />
        </Wrap>
      </Cont>
    </AnimatePresence>
  );
};

const Cont = styled(PostInfo)`
  left: 0;
  top: 50px;
  height: 100%;
  overflow-y: auto;
  position: absolute;
`;
const Wrap = styled(FlexCol)`
  //border: 2px solid yellow;
  height: 100%;
  gap: 30px;
  padding: 20px 10px 0;
  padding-bottom: 40px;
`;
const contentsVar = {
  animate: ({ theme, isShrink }: any) => ({
    scale: 1,
    opacity: 1,
    y: isShrink ? 220 : 0,
    transition: { duration: 0.8 },
  }),
};
