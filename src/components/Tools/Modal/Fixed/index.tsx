import { useState } from 'react';
import { Answer } from './Modal/Answer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';
import { IconBtn } from '../../Button/IconBtn';

interface IFixed {
  type: {
    isPost: boolean;
    isBoard: boolean;
  };
}
export const Fixed = ({ type }: IFixed) => {
  const router = useRouter();
  const [answer, setAnswer] = useState(false);
  const { isLoggedIn, loggedInUser } = useUser();
  const onClick = () => {
    if (type.isBoard)
      return router.push(`/user/${loggedInUser?.id}/board/create`);
    if (type.isPost) {
      alert('포스트를 생성할 보드를 선택해주세요.');
      router.push(`/all/my/boards`);
    }
  };
  return (
    <Cont>
      <IconBtn
        size="2.5rem"
        type="button"
        svgType="question"
        onClick={() => setAnswer(true)}
      />
      {isLoggedIn && (
        <IconBtn size="2.5rem" type="button" svgType="add" onClick={onClick} />
      )}
      {answer && <Answer type={type} openModal={setAnswer} />}
    </Cont>
  );
};
const Cont = styled.article`
  right: 1%;
  bottom: 20%;
  position: fixed;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
