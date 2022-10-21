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
      {errors?.userId && <ErrorMsg error={errors.userId.msg} />}
      {errors?.password && <ErrorMsg error={errors.password.msg} />}
      {errors?.newPassword && <ErrorMsg error={errors.newPassword.msg} />}
      {errors?.confirmPassword && (
        <ErrorMsg error={errors.confirmPassword.msg} />
      )}
      {errors?.email && <ErrorMsg error={errors.email.msg} />}
      {errors?.username && <ErrorMsg error={errors.username.msg} />}
      {errors?.name && <ErrorMsg error={errors.name.msg} />}
      {errors?.birth && <ErrorMsg error={errors.birth.msg} />}
      {errors?.gender && <ErrorMsg error={errors.gender.msg} />}
      {errors?.location && <ErrorMsg error={errors.location.msg} />}

      {errors?.content && <ErrorMsg error={errors.content.msg} />}
      {errors?.movieTitle && <ErrorMsg error={errors.movieTitle.msg} />}
      {errors?.oneline && (
        <ErrorMsg type="oneline" error={errors.oneline?.msg} />
      )}
      {errors?.title && <ErrorMsg error={errors.title.msg} />}
      {errors?.genre && <ErrorMsg error={errors.genre.msg} />}
      {errors?.intro && <ErrorMsg error={errors.intro.msg} />}
      {errors?.avatar && <ErrorMsg error={errors.avatar.msg} />}
    </Container>
  );
};
const Container = styled.article`
  .oneline {
    top: 75%;
  }
`;
