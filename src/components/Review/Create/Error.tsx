import styled from '@emotion/styled';
import { ErrorMsg } from '../../Style/ErrMsg';
import { IUseform } from '../../../types/global';

export const Errors = ({ errors }: IUseform) => {
  return (
    <Cont>
      {errors?.userId && <ErrorMsg error={errors.userId.message} />}
      {errors?.password && <ErrorMsg error={errors.password.message} />}
      {errors?.newPassword && <ErrorMsg error={errors.newPassword.message} />}
      {errors?.confirmPassword && (
        <ErrorMsg error={errors.confirmPassword.message} />
      )}
      {errors?.email && <ErrorMsg error={errors.email.message} />}
      {errors?.username && <ErrorMsg error={errors.username.message} />}
      {errors?.name && <ErrorMsg error={errors.name.message} />}
      {errors?.birth && <ErrorMsg error={errors.birth.message} />}
      {errors?.gender && <ErrorMsg error={errors.gender.message} />}
      {errors?.location && <ErrorMsg error={errors.location.message} />}

      {errors?.content && <ErrorMsg error={errors.content.message} />}
      {errors?.movieTitle && <ErrorMsg error={errors.movieTitle.message} />}
      {errors?.oneline && (
        <ErrorMsg type="oneline" error={errors.oneline?.message} />
      )}
      {errors?.title && <ErrorMsg error={errors.title.message} />}
      {errors?.genre && <ErrorMsg error={errors.genre.message} />}
      {errors?.intro && <ErrorMsg error={errors.intro.message} />}
      {errors?.avatar && <ErrorMsg error={errors.avatar.message} />}
    </Cont>
  );
};
const Cont = styled.article`
  .oneline {
    top: 75%;
  }
`;
