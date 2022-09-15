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
        setEng('POSTS');
        setKor('포스트');
      }
      if (type === 'boards') {
        setEng('BOARDS');
        setKor('보드');
      }
      if (type === 'trending') {
        setEng('MOVIES');
        setKor('인기상영작');
      }
      if (type === 'now') {
        setEng('NOW PLAYING');
        setKor('현재 상영작');
      }
      if (type === 'upcoming') {
        setEng('UPCOMING');
        setKor('개봉 예정작');
      }
      if (type === 'tv') {
        setEng('TV SHOWS');
        setKor('티비·드라마');
      }
      if (type === 'top') {
        setEng('CLASSIC');
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
    <Cont className="title">
      <span>{eng}</span>
      <span className="kor">{kor}</span>
      <Svg
        size="2rem"
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
  align-items: center;
  padding: 10px 0 15px;
  justify-content: flex-start;
  span {
    font-weight: 500;
    font-size: 1.8rem;
  }
  svg {
    cursor: pointer;
  }
`;
