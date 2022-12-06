import {
  UseFormWatch,
  UseFormRegister,
  UseFormClearErrors,
} from 'react-hook-form';
import styled from '@emotion/styled';
import { PostInputs } from './Inputs';
import { IPostForm } from '../../../../../types/post';
import { FlexCol } from '../../../../../../styles/global';

interface IPostInfo {
  _data: {
    isNext: boolean;
    theme: boolean;
  };
  _useform: {
    errors: any;
    watch: UseFormWatch<IPostForm>;
    register: UseFormRegister<IPostForm>;
    clearErrors: UseFormClearErrors<IPostForm>;
  };
}
export const PostInfo = ({ _data, _useform }: IPostInfo) => {
  return (
    <>
      {_data?.isNext! && (
        <Cont
          exit="exit"
          animate="animate"
          initial="initial"
          className="post-info"
          variants={ContentVar}
          custom={_data?.theme!}
        >
          <h2>
            <span className="eng">Tell me about this post.</span>
            <span className="kor">(이 포스트에 대해 알려주세요.)</span>
          </h2>
          <PostInputs theme={_data?.theme!} _useform={_useform} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(FlexCol)`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 1rem 2.5rem 2rem;
  //border: 1px solid yellow;
  h2 {
    width: 100%;
    font-weight: 400;
    font-size: 1.2rem;
    font-style: italic;
    .kor {
      font-size: 1.1rem;
      margin-left: 5px;
    }
  }
  .title {
    margin-bottom: 30px;
  }
`;
const ContentVar = {
  initial: () => ({
    y: 900,
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
    y: 900,
    opacity: 0,
    scale: 0.2,
    transition: { duration: 0.5 },
  }),
};
