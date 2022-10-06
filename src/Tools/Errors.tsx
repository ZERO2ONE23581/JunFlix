import styled from '@emotion/styled';
import { IUseform } from '../types/global';
import { Svg } from './Svg';

interface IErrorMsgProps {
  type?: string;
  error?: string;
}
export const ErrorMsg = ({ type, error }: IErrorMsgProps) => {
  return (
    <Cont className={type}>
      <span>
        <Svg type="warn" size="2rem" />
      </span>
      <span>{error}</span>
    </Cont>
  );
};
const Cont = styled.div`
  top: 50%;
  left: 50%;
  z-index: 100;
  position: fixed;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #d63031;
  span {
    font-size: 1.4em;
    margin-right: 20px;
    svg {
      fill: white;
      margin-top: 4px;
      pointer-events: none;
    }
  }
`;
export const Errors = ({ errors }: IUseform) => {
  return (
    <Container>
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
    </Container>
  );
};
const Container = styled.article`
  .oneline {
    top: 75%;
  }
`;
