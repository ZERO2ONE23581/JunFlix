import styled from '@emotion/styled';
import { InputWrap } from '../../../Tools/Input';
import { PostInfo } from '../../../../styles/post';
import { ICreatePostForm } from '../../../types/post';
import { TextAreaWrap } from '../../../Tools/Input/TextArea';
import { useMaxLength } from '../../../libs/client/useTools';
import { AnimatePresence } from 'framer-motion';

export const PostContents = ({
  watch,
  theme,
  errors,
  register,
  isNext,
}: ICreatePostForm) => {
  const lightTheme = !theme;
  const { max } = useMaxLength(50, 1000);
  return (
    <AnimatePresence>
      {isNext && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          className="post-inputs-wrap"
          custom={lightTheme}
          variants={ContentVar}
        >
          <h2>Fill the Blanks below.</h2>
          <InputWrap
            id="title"
            type="text"
            theme={lightTheme}
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
            theme={lightTheme}
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
            theme={lightTheme}
            label="Movie Tags"
            watch={watch('hashtags')}
            register={register('hashtags')}
            placeholder="영화 태그 추가"
          />
          <InputWrap
            type="text"
            id="pageLink"
            label="Website"
            theme={lightTheme}
            watch={watch('pageLink')}
            register={register('pageLink')}
            placeholder="웹사이트 링크 추가"
          />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(PostInfo)``;
const ContentVar = {
  initial: () => ({
    y: -900,
    opacity: 0,
    scale: 0.2,
  }),
  animate: () => ({
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { delay: 0.5, duration: 0.3 },
  }),
  exit: () => ({
    y: -900,
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5 },
  }),
};
