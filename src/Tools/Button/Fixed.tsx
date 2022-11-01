import { Svg } from '../Svg';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Answer } from '../Modal/answer_modal';
import { useUser } from '../../libs/client/useUser';
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
          type="question"
          item={{ size: '3rem' }}
          onClick={() => setAnswer(true)}
        />
        {isLoggedIn && (
          <Svg
            type="add"
            theme={theme}
            onClick={clickAdd}
            item={{ size: '3rem' }}
          />
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
