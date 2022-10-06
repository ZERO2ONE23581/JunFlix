import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Overlay } from '../../../styles/global';
import useUser from '../../libs/client/useUser';
import { Btn } from '../Button';

interface IUnLoggedIn {}
export const NeedLogin = () => {
  const { isLoggedIn } = useUser();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (!isLoggedIn) setModal(true);
    else setModal(false);
  }, [isLoggedIn, setModal]);
  return { modal };
};
export const NeedLoginModal = ({}: IUnLoggedIn) => {
  const router = useRouter();
  return (
    <>
      <Cont>
        <h1>
          <span>로그인이 필요한 페이지 입니다.</span>
          <span>You need to log in to access this page.</span>
        </h1>
        <Btn
          type="button"
          name="LOGIN"
          onClick={() => router.replace(`/login`)}
        />
      </Cont>
      <Overlay
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => router.replace(`/login`)}
      />
    </>
  );
};
const Cont = styled(motion.div)`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  //
  min-width: 300px;
  min-height: 300px;
  padding: 30px;
  overflow: hidden;
  font-size: 1.2rem;
  border-radius: 5px;
  color: ${(p) => p.theme.color.font};
  border: 3px solid ${(p) => p.theme.color.font};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background-color: ${(p) => p.theme.color.bg};
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  h1 {
    gap: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    span {
      text-align: center;
      font-size: 1.4em;
    }
  }
  button {
    width: 200px;
    padding: 12px;
    margin: 0 auto;
    font-size: 1.1em;
  }
`;
