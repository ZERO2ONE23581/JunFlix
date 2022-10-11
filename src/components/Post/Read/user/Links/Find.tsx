import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ITheme } from '../../../../../../styles/theme';
import { AnimatePresence, motion } from 'framer-motion';
import {
  color,
  duration,
  hoverTextVar,
} from '../../../../../../styles/variants';

export const FindUserWrap = ({ theme }: ITheme) => {
  const router = useRouter();

  return (
    <Cont
      className="find-user-wrap"
      exit="exit"
      initial="initial"
      animate="animate"
      custom={theme}
      variants={variants}
    >
      <motion.div
        exit="exit"
        initial="initial"
        animate="animate"
        whileHover={'hover'}
        custom={theme}
        variants={hoverVar}
        onClick={() => router.push(`/user/find/userId`)}
      >
        <span className="kor">아이디 찾기</span>
        <span className="eng">(Find ID)</span>
      </motion.div>
      <span className="slash">|</span>
      <motion.div
        exit="exit"
        initial="initial"
        animate="animate"
        whileHover={'hover'}
        custom={theme}
        variants={hoverVar}
        onClick={() => router.push(`/user/find/password`)}
      >
        <span className="kor">비밀번호 찾기</span>
        <span className="eng">(Find Password)</span>
      </motion.div>
      <span className="slash">|</span>
      <motion.div
        exit="exit"
        initial="initial"
        animate="animate"
        whileHover={'hover'}
        custom={theme}
        variants={hoverVar}
        onClick={() => router.push(`/user/create`)}
      >
        <span className="kor">회원가입</span>
        <span className="eng">(Join)</span>
      </motion.div>
    </Cont>
  );
};
const Cont = styled(motion.div)`
  gap: 5px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-around;
  font-size: 1rem;
  > div {
    gap: 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
  }
  .slash {
    font-weight: 500;
  }
  .eng {
    font-size: 0.9em;
  }
`;
const variants = {
  initial: (theme: boolean) => ({
    opacity: 0,
    color: color(theme),
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: duration(0.3),
  }),
  exit: { opacity: 0 },
};
const hoverVar = {
  initial: (theme: boolean) => ({
    opacity: 0,
    color: color(theme),
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: duration(0.3),
  }),
  exit: { opacity: 0 },
  hover: {
    color: '#E50914',
    transition: duration(0.3),
  },
};
