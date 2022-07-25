import { ErrorMsg } from '../../Style/ErrMsg';
import { IUseform } from '../../../types/global';
import styled from '@emotion/styled';

export const Errors = ({ errors }: IUseform) => {
  return (
    <Cont>
      {errors?.title && <ErrorMsg error={errors.title.message} />}
      {errors?.content && <ErrorMsg error={errors.content.message} />}
      {errors?.movieTitle && <ErrorMsg error={errors.movieTitle.message} />}
      {errors?.oneline && (
        <ErrorMsg type="oneline" error={errors.oneline?.message} />
      )}
    </Cont>
  );
};
const Cont = styled.article`
  .oneline {
    top: 75%;
  }
`;
