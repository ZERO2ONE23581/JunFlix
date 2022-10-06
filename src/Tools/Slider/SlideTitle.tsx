import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCapLetters } from '../../libs/client/useTools';

interface ISlideTitle {
  pageType?: string;
  sliderType?: string;
  sliderDetail?: string;
}

export const SlideTitle = ({
  pageType,
  sliderType,
  sliderDetail,
}: ISlideTitle) => {
  const router = useRouter();
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (pageType === 'home') {
      if (sliderType === 'board') setTitle('Boards');
      if (sliderType === 'post') setTitle('Posts');
      if (sliderType === 'movie') setTitle('Trending Movies');
    }
    if (pageType === 'movie') {
      if (sliderDetail) setTitle(sliderDetail);
    }
  }, [pageType, sliderType, setTitle, sliderDetail]);

  const clickTitle = () => {
    if (pageType === 'home') {
      if (sliderType === 'post') return router.push(`/posts`);
      if (sliderType === 'movie') return router.push(`/movies`);
      if (sliderType === 'board') return router.push(`/boards`);
    }
  };
  return (
    <Cont onClick={clickTitle} className="title">
      <span>{useCapLetters(title)}</span>
    </Cont>
  );
};

const Cont = styled.h1`
  gap: 10px;
  display: flex;
  font-size: 1.7em;
  align-items: center;
  width: fit-content;
  padding-left: 40px;
  padding-bottom: 12px;
  :hover {
    cursor: pointer;
    color: ${(p) => p.theme.color.logo};
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
  }
`;
