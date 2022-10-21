import { Svg } from './Svg';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ITheme } from '../../styles/theme';
import { hoverColor, variants } from '../../styles/variants';

interface INoData extends ITheme {
  type: string;
}
export const NoData = ({ type, theme }: INoData) => {
  const router = useRouter();
  const [text, setText] = useState('');
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
      exit="exit"
      custom={theme}
      initial="initial"
      animate="animate"
      variants={variants}
      className="no-data"
    >
      <li className="emoji">🤔</li>
      <li>
        <span className="eng">No data. </span>
        <span className="kor">데이터를 찾을수 없습니다.</span>
      </li>
    </Cont>
  );
};
const Cont = styled(motion.ul)`
  margin: 0 auto;
  width: fit-content;
  text-align: center;
  .emoji {
    font-size: 4rem;
  }
  li {
    margin-bottom: 10px;
    .eng,
    .kor {
      font-style: italic;
      font-size: 1.5rem;
    }
    .eng {
      font-size: 1.6rem;
    }
  }
`;
