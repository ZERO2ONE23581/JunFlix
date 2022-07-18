import { useState } from 'react';
import { Answer } from './Answer';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../../libs/client/useUser';
import { IconBtn } from '../../../Style/Button/IconBtn';

export const FixedBtn = () => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const { user_id, board_id } = router.query;
  const isBoardPage = Boolean(user_id && board_id);
  const [answer, setAnswer] = useState(false);
  const onClick = () => {
    alert('포스트를 생성할 보드를 선택해주세요.');
    router.push(`/user/my/boards`);
  };
  return (
    <>
      {!isBoardPage && (
        <Cont>
          <IconBtn
            size="3rem"
            type="button"
            svgType="question"
            onClick={() => setAnswer(true)}
          />
          {isLoggedIn && (
            <IconBtn
              size="3rem"
              type="button"
              svgType="add"
              onClick={onClick}
            />
          )}
          {answer && <Answer openModal={setAnswer} />}
        </Cont>
      )}
    </>
  );
};
const Cont = styled.article`
  top: 400px;
  right: -8%;
  position: absolute;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
