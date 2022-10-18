import styled from '@emotion/styled';
import { InputWrap } from '../../../Tools/Input';
import { PostInfo } from '../../../../styles/post';
import { ICreatePostForm } from '../../../types/post';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';
import { useMaxLength } from '../../../libs/client/useTools';
import { color } from '../../../../styles/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { Flex, FlexCol } from '../../../../styles/global';

interface IPostContents extends ICreatePostForm {
  isShrink: boolean;
}
export const PostContents = ({
  watch,
  theme,
  errors,
  register,
  isShrink,
}: IPostContents) => {
  const { max } = useMaxLength(50, 1000);
  return (
    <AnimatePresence>
      <Cont
        exit="exit"
        initial="initial"
        animate="animate"
        className="contents"
        custom={{ theme, isShrink }}
        variants={contentsVar}
      >
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
            error={errors.description?.message}
            watch={watch!('description')}
            id="description"
            startHeight={140}
            theme={theme}
            register={register('description')}
            placeholder="이 포스트에 대한 설명을 적어주세요."
            length={{
              max: max.desc,
              typed: watch('description'),
            }}
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
  width: 90%;
  margin-top: 20px;
  overflow-y: auto;
  padding: 15px 30px;
  border-radius: 10px;
  box-shadow: ${(p) => p.theme.boxShadow.input};
  top: 0;
  left: 0;
  position: absolute;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Wrap = styled(FlexCol)`
  width: 100%;
  padding-bottom: 40px;
  height: fit-content;
  justify-content: flex-start;
  border-bottom: dotted ${(p) => p.theme.color.font};
`;
const contentsVar = {
  initial: ({ theme, isShrink }: any) => ({
    y: 50,
    opacity: 0,
    scale: 0.2,
    height: '60vh',
  }),
  animate: ({ theme, isShrink }: any) => ({
    scale: 1,
    opacity: 1,
    y: isShrink ? 330 : 0,
    transition: { duration: 0.8 },
    height: isShrink ? '40vh' : '80vh',
  }),
  exit: ({ theme, isShrink }: any) => ({
    y: 50,
    scale: 0.2,
    opacity: 0,
    height: '60vh',
    transition: { duration: 0.8 },
  }),
};
