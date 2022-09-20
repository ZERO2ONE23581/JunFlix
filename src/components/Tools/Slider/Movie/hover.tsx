import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Svg } from '../../Svg';
import { MovieModal } from './modal';

interface IMovieHover {
  data: {
    id: number;
    title?: string;
    overview?: string;
    vote_average?: number;
    release_date?: string;
    original_title?: string;
    original_language?: string;
    original_name?: string;
    poster_path?: string;
    backdrop_path?: string;
  };
}
export const MovieHover = ({ data }: IMovieHover) => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (data) {
      if (data.title) setTitle(data.title);
      if (data.original_title) setTitle(data.original_title);
      if (data.original_name) setTitle(data.original_name);
    }
  }, [data, setTitle]);
  const [sliced, setSliced] = useState(title);
  useEffect(() => {
    if (title.length <= 10) setSliced(title);
    if (title.length > 10) setSliced(title.slice(0, 8) + '...');
  }, [setSliced, title]);
  const isEng = Boolean(data.original_language === 'en');
  //
  return (
    <>
      {data && (
        <Cont>
          <UnHovered variants={unHoverVar} className="unhover">
            <h1>{sliced}</h1>
          </UnHovered>
          <Hovered className="hover" variants={hoverVar}>
            <Title isEng={isEng}>{title}</Title>
            <ul>
              {data.release_date && (
                <li>
                  <span>Date:</span>
                  <span className="data">{data.release_date}</span>
                </li>
              )}
              {data.vote_average && (
                <li>
                  <span>Rate:</span>
                  <span className="data">
                    {Math.round(data.vote_average! * 100) / 100}
                  </span>
                </li>
              )}
              <Svg
                size="1.2rem"
                type="caret-down"
                onClick={() => router.replace(`/home/${data.id}`)}
              />
            </ul>
          </Hovered>
        </Cont>
      )}
    </>
  );
};
const Cont = styled(motion.article)`
  opacity: 1;
  width: 100%;
  height: 100%;
  font-weight: 500;
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
  width: 100%;
  opacity: 0.5;
  padding: 8px;
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};
`;
const hoverVar = {
  hover: {
    opacity: 1,
  },
};
const Title = styled.div<{ isEng: boolean }>`
  padding: 10px;
  font-size: 1rem;
  text-align: center;
  font-size: ${(p) => (!p.isEng ? '0.9rem' : '1rem')};
`;
const Hovered = styled(motion.h2)`
  bottom: 0;
  opacity: 0;
  width: 100%;
  height: fit-content;
  display: flex;
  position: absolute;
  flex-direction: column-reverse;
  color: ${(p) => p.theme.color.font};
  background-color: ${(p) => p.theme.color.bg};

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
