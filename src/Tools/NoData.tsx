import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ITheme } from '../../styles/theme';
import { hoverTextVar, modalVar, variants } from '../../styles/variants';
import { useCapLetters } from '../libs/client/useTools';
import useUser from '../libs/client/useUser';
import { Svg } from './Svg';

interface INoData extends ITheme {
  type: string;
}
export const NoData = ({ type, theme }: INoData) => {
  const router = useRouter();
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
    <Cont
      className="no-data"
      exit="exit"
      initial="initial"
      animate="animate"
      custom={theme}
      variants={variants}
    >
      <ul>
        <li>
          <span className="emoji">🤔</span>
        </li>
        <li className="kor">데이터가 존재하지 않습니다.</li>
        <li className="eng">(No data found.)</li>
        <motion.li
          onClick={onClick}
          exit="exit"
          className="click"
          custom={!theme}
          initial="initial"
          animate="animate"
          whileHover={'hover'}
          variants={hoverTextVar}
        >
          <span className="kor">{text} 생성하러 가기</span>
          <span>Create {text}</span>
          <span>
            <Svg
              size="2rem"
              theme={theme}
              type="right-arrow"
              fill={'#E50914'}
            />
          </span>
        </motion.li>
      </ul>
    </Cont>
  );
};
const Cont = styled(motion.div)`
  margin: 10% auto;
  font-size: 1.3rem;
  width: fit-content;
  text-align: center;
  ul {
    li {
      margin-bottom: 10px;
    }
    .click {
      cursor: pointer;
      font-style: italic;
      gap: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
