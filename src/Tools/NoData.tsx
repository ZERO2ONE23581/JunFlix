import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ITheme } from '../../styles/theme';
import { hoverTextVar, modalVar } from '../../styles/variants';
import { useCapLetters } from '../libs/client/useTools';
import useUser from '../libs/client/useUser';
import { Btn } from './Button';
import { Svg } from './Svg';

interface INoData extends ITheme {
  type: string;
}
export const NoData = ({ type, theme }: INoData) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [text, setText] = useState('');
  //
  useEffect(() => {
    if (type === 'post') setText('Post');
    if (type === 'board') setText('Board');
    if (type === 'review') setText('Review');
    if (type === 'movie') setText('Movie');
  }, [type, setText]);
  //
  const onClick = () => {
    if (type) {
      if (type === 'movie') return;
      if (type === 'post') {
        alert(`포스트를 생성할 보드를 선택해 주세요.`);
        router.push(`/boards/my`);
      } else router.push(`/${type}/create`);
    }
  };
  //
  return (
    <Cont variants={modalVar} exit="exit" initial="initial" animate="animate">
      <span className="emoji">🤔</span>
      <div className="wrap">
        <span className="eng">
          <span>No</span>
          <motion.span
            className="data"
            whileHover={'hover'}
            variants={hoverTextVar}
            onClick={() => router.push(`/${type}/all`)}
          >{`"${useCapLetters(type)}"`}</motion.span>
          <span>found.</span>
        </span>

        <span className="kor">
          <motion.span
            className="data"
            whileHover={'hover'}
            variants={hoverTextVar}
            onClick={() => router.push(`/${type}/all`)}
          >{`"${useCapLetters(type)}"`}</motion.span>
          <span>를 찾을 수 없습니다.</span>
        </span>
      </div>

      <motion.span
        className="create"
        whileHover="hover"
        variants={hoverTextVar}
        onClick={onClick}
      >
        <span>Go to create {`"${useCapLetters(type)}"`}</span>
        <span className="kor">
          ({`"${useCapLetters(type)}"`} 생성하러 가기)
        </span>
        <span>&rarr;</span>
      </motion.span>
    </Cont>
  );
};
const Cont = styled(motion.div)`
  border: 2px solid yellow;
  font-size: 1.5rem;
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .emoji {
    font-size: 2em;
  }
  .wrap {
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .kor {
      opacity: 0.9;
      font-size: 20px;
    }
    span {
      gap: 10px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      //border: 1px solid pink;
      .data {
        cursor: pointer;
        border-bottom: 2px dashed ${(p) => p.theme.color.font};
      }
    }
  }
  button {
    font-weight: 500;
  }
  .create {
    cursor: pointer;
    font-style: italic;
    .kor {
      font-size: 0.9em;
    }
  }
`;
