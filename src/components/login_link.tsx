import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ITheme } from '../../styles/theme';
import { color, duration } from '../../styles/variants';

export const LoginLink = ({ theme }: ITheme) => {
  const router = useRouter();
  return (
    <Cont
      className="login-link"
      exit="exit"
      initial="initial"
      animate="animate"
      whileHover={'hover'}
      custom={theme}
      variants={hoverVar}
      onClick={() => router.push(`/login`)}
    >
      <span>* 이미 회원입니까?</span>
      <span>Already a member?</span>
      <span>&rarr;</span>
    </Cont>
  );
};
const Cont = styled(motion.div)`
  gap: 10px;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  span {
    margin-right: 5px;
    font-style: italic;
  }
`;
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
