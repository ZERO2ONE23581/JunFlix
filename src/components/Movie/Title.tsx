import styled from '@emotion/styled';
import { Svg } from '../Tools/Svg';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface IPageTitle {
  type: string;
}
export const PageTitle = ({ type }: IPageTitle) => {
  const router = useRouter();
  const [eng, setEng] = useState('');
  const [kor, setKor] = useState('');
  useEffect(() => {
    if (type) {
      if (type === 'posts') {
        setEng('All Posts');
        setKor('모든 포스트');
      }
      if (type === 'boards') {
        setEng('Movie Boards');
        setKor('보드 둘러보기');
      }
      if (type === 'trending') {
        setEng('Trending Movies');
        setKor('현재 인기영화');
      }
      if (type === 'now') {
        setEng('Now Playing');
        setKor('현재 상영작');
      }
      if (type === 'upcoming') {
        setEng('Upcoming');
        setKor('개봉 예정작');
      }
      if (type === 'tv') {
        setEng('TV Shows');
        setKor('티비·드라마');
      }
      if (type === 'top') {
        setEng('Classic');
        setKor('명작·클래식');
      }
    }
  }, [setEng, setKor, type]);

  const SVG = (type: string) => {
    if (type === 'tv') return 'tv';
    if (type === 'posts') return 'post';
    if (type === 'boards') return 'board';
    if (type === 'trending') return 'fire';
    else return 'film';
  };
  return (
    <Cont className={type}>
      <span>{eng}</span>
      <span className="kor">{kor}</span>
      <Svg
        size="1.5rem"
        type={SVG(type)}
        onClick={() =>
          router.push(`/${type === 'trending' ? `movies/${type}` : type}`)
        }
      />
    </Cont>
  );
};
const Cont = styled.h1`
  gap: 8px;
  display: flex;
  margin-left: 15px;
  align-items: center;
  padding: 10px 0 15px;
  justify-content: flex-start;
  span {
    font-weight: 500;
    font-size: 1.7rem;
  }
  .kor {
    margin-top: 7px;
    font-size: 1.5rem;
  }
  svg {
    margin-top: 7px;
    cursor: pointer;
  }
`;
