import { useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../libs/client/useUser';
import { Answer } from '../../../Tools/Modal/answer_modal';
import { Svg } from '../../../Tools/Svg';
import { ITheme } from '../../../../styles/theme';

export const Fixed = ({ theme }: ITheme) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [answer, setAnswer] = useState(false);
  const clickIcon = () =>
    router.push(`/user/${loggedInUser?.id}/review/create`);
  return (
    <>
      <Cont>
        <Svg theme={theme} size="2.8rem" type="add" onClick={clickIcon} />
        <Svg
          theme={theme}
          size="2.8rem"
          type="question"
          onClick={() => setAnswer(true)}
        />
      </Cont>
      <Answer
        theme={theme}
        answer={answer}
        type="read-review"
        closeModal={setAnswer}
      />
    </>
  );
};
const Cont = styled.div`
  bottom: 150px;
  right: 50px;
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;