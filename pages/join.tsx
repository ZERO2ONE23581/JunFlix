import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import useMutation from '../src/libs/client/useMutation';
import { useLength } from '../src/libs/client/useTools';
import { Btn } from '../src/Tools/Button';
import { InputWrap } from '../src/Tools/Input';
import { IRes } from '../src/types/global';
import { IUserForm } from '../src/types/user';
import { FlexPage, Page } from '../styles/global';

const JoinPage: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [post, { loading, data }] = useMutation<IRes>('/user/create');
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({ mode: 'onSubmit' });
  const onValid = ({ email, password, confirm_pw }: IUserForm) => {
    if (useLength(email) < 1) return setError('email', { message: '!!' });
  };
  const useform = { register, clearErrors, watch };
  return (
    <Container>
      <form onSubmit={handleSubmit(onValid)}>
        <Box>
          <h1>Join</h1>
          <InputWrap
            theme={theme}
            useform={useform}
            _data={{ id: 'email', error: errors.email?.message! }}
          />
          <InputWrap
            theme={theme}
            useform={useform}
            _data={{
              id: 'confirm_pw',
              type: 'password',
              error: errors.confirm_pw?.message!,
            }}
          />
          <InputWrap
            theme={theme}
            useform={useform}
            _data={{
              id: 'password',
              type: 'password',
              error: errors.password?.message!,
            }}
          />
          <Btn type="submit" item={{ name: 'Submit', theme }} />
        </Box>
      </form>
    </Container>
  );
};
export default JoinPage;

const Container = styled(FlexPage)`
  justify-content: center;
`;

const Box = styled(motion.article)`
  border: 2px solid red;
  padding: 2rem;
  h1 {
    font-size: 2rem;
  }
`;
