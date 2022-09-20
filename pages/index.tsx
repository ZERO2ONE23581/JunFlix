import { useEffect } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../src/libs/client/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import { HeadTitle } from '../src/components/Layout/Head';

const Entrance: NextPage = () => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  useEffect(() => {
    if (isLoggedIn) router.replace(`/home/0`);
    setTimeout(() => {
      router.replace(`/home/0`);
    }, 3000);
  }, [router, isLoggedIn]);
  return (
    <>
      <HeadTitle title="Welcome Page" />
      <AnimatePresence>
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          variants={welcomeVar}
        >
          <h1>Welcome</h1>
        </Cont>
      </AnimatePresence>
    </>
  );
};
export default Entrance;

const welcomeVar = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const Cont = styled(motion.section)`
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  padding-bottom: 10%;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
  h1 {
    font-size: 5rem;
  }
`;
