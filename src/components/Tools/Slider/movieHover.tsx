import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Svg } from '../Svg';

interface IMovieHover {
  date: string;
  lang: string;
  rate: number;
  title: string;
}
export const MovieHover = ({ title, date, rate, lang }: IMovieHover) => {
  const [sliced, setSliced] = useState(title);
  useEffect(() => {
    if (title.length <= 10) setSliced(title);
    if (title.length > 10) setSliced(title.slice(0, 8) + '...');
  }, [setSliced, title]);
  return (
    <Cont>
      <UnHovered variants={unHoverVar} className="unhover">
        <h1>{sliced}</h1>
      </UnHovered>
      <Hovered className="hover" variants={hoverVar} isLong={lang === 'ja'}>
        <h1>{title}</h1>
        <ul>
          {date && (
            <li>
              <span>Date:</span>
              <span className="data">{date}</span>
            </li>
          )}
          <li>
            <span>Rate:</span>
            <span className="data">{Math.round(rate * 10) / 10}</span>
          </li>
          <Svg type="caret-down" size="1.2rem" />
        </ul>
      </Hovered>
    </Cont>
  );
};
const Cont = styled(motion.article)`
  opacity: 1;
  width: 100%;
  height: 100%;
  font-weight: 500;
  font-size: 1.6rem;
  text-align: center;
  position: relative;
  display: flex;
  align-items: flex-end;
`;
const unHoverVar = {
  hover: {
    opacity: 0,
    display: 'none',
  },
};
const UnHovered = styled(motion.div)`
  opacity: 1;
  padding: 5px;
  width: 100%;
  margin-bottom: 15px;
`;
const hoverVar = {
  hover: {
    opacity: 1,
  },
};
const Hovered = styled(motion.h2)<{ isLong: boolean }>`
  bottom: 0;
  opacity: 0;
  width: 100%;
  height: fit-content;
  display: flex;
  position: absolute;
  flex-direction: column-reverse;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};

  h1 {
    padding: 10px;
    font-size: 1rem;
    text-align: center;
    font-size: ${(p) => (p.isLong ? '0.9rem' : '1rem')};
  }
  ul {
    gap: 5px;
    display: flex;
    padding: 5px 10px 0;
    align-items: center;
    justify-content: center;
    svg {
      margin-bottom: 2px;
    }
    li {
      font-size: 8px;
      .data {
        margin-left: 5px;
        color: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
