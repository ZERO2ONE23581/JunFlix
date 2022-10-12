import { Svg } from '../Svg';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Answer } from '../Modal/answer';
import useUser from '../../libs/client/useUser';
import { ITheme } from '../../../styles/theme';

interface IFixedBtns extends ITheme {
  type: string;
}
export const FixedBtns = ({ theme, type }: IFixedBtns) => {
  const { isLoggedIn } = useUser();
  const [answer, setAnswer] = useState(false);
  const router = useRouter();
  const clickAdd = () => {
    setAnswer(false);
    if (type) router.push(`/${type}/create`);
  };
  return (
    <>
      <Cont>
        <Svg
          theme={theme}
          size="2.5rem"
          type="question"
          onClick={() => setAnswer(true)}
        />
        {isLoggedIn && (
          <Svg type="add" theme={theme} size="2.5rem" onClick={clickAdd} />
        )}
      </Cont>
      <Answer
        type={type}
        theme={theme}
        answer={answer}
        closeModal={setAnswer}
      />
    </>
  );
};
const Cont = styled.article`
  right: 3rem;
  bottom: 4rem;
  position: fixed;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
