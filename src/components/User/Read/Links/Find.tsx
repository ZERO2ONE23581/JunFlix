import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export const FindUserWrap = () => {
  const router = useRouter();
  const hoverVar = {
    hover: {
      scale: 1.05,
      color: '#E50914',
      transition: { duration: 0.3 },
    },
  };
  return (
    <Cont className="find-user-wrap">
      <motion.div
        initial="initial"
        animate="animate"
        variants={hoverVar}
        whileHover={'hover'}
        onClick={() => router.push(`/user/find/userId`)}
      >
        <span className="kor">아이디 찾기</span>
        <span className="eng">(Find ID)</span>
      </motion.div>

      <span className="slash">|</span>

      <motion.div
        initial="initial"
        animate="animate"
        variants={hoverVar}
        whileHover={'hover'}
        onClick={() => router.push(`/user/find/password`)}
      >
        <span className="kor">비밀번호 찾기</span>
        <span className="eng">(Find Pw)</span>
      </motion.div>

      <span className="slash">|</span>

      <motion.div
        initial="initial"
        animate="animate"
        variants={hoverVar}
        whileHover={'hover'}
        onClick={() => router.push(`/join`)}
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
  justify-content: space-between;
  font-size: 0.5em;
  > div {
    cursor: pointer;
    gap: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .slash {
    font-weight: 500;
    //font-size: 1em;
  }
  .eng {
    font-size: 0.9em;
  }
`;
