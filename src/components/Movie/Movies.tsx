import useSWR from 'swr';
import { Title } from './Title';
import { useState } from 'react';
import styled from '@emotion/styled';
import { MovieArray } from './Array/MovieArray';
import { Svg } from '../../Tools/Svg';
import { IMovieRes } from '../../types/global';
import { Flex, FlexCol_ } from '../../../styles/global';
import { useResponsive } from '../../libs/client/useTools';

interface ISlider {
  _data: {
    theme: boolean;
    hideTitle?: boolean;
    type: string | any;
  };
}
export const Movies = ({ _data }: ISlider) => {
  const [page, setPage] = useState(0);
  const { isDesk } = useResponsive();
  const { theme, type, hideTitle } = _data;
  const boxes = isDesk ? 6 : 2;
  const size = isDesk ? '2rem' : '3rem';
  const [leave, setLeave] = useState(false);
  const [reverse, setReverse] = useState(false);
  const { data } = useSWR<IMovieRes>(
    typeof window === 'undefined' ? null : `/api/movie/${type}`
  );

  const MOVIES = data?.movies!;
  const LastPage = Math.ceil(MOVIES?.length / boxes);
  const isSingleRow = Boolean(MOVIES?.length <= boxes);
  const array = MOVIES?.slice(boxes * page, boxes + boxes * page);

  const onClick = (arrow: string) => {
    if (leave) return;
    if (isSingleRow) return;
    setLeave((p) => !p);
    if (arrow === 'left') {
      setReverse(true);
      setPage((p) => (p === 0 ? LastPage - 1 : p - 1));
    }
    if (arrow === 'right') {
      setReverse(false);
      setPage((p) => (p === LastPage - 1 ? 0 : p + 1));
    }
  };
  return (
    <Cont isDesk={isDesk}>
      {!hideTitle && <Title _data={{ theme, type }} />}
      <Slider>
        <Svg
          theme={theme}
          item={{ size }}
          type="left-chev"
          onClick={() => onClick('left')}
        />
        <MovieArray _data={{ theme, array, page, boxes, reverse, setLeave }} />
        <Svg
          theme={theme}
          item={{ size }}
          type="right-chev"
          onClick={() => onClick('right')}
        />
      </Slider>
    </Cont>
  );
};
const Cont = styled(FlexCol_)`
  align-items: flex-start;
  padding: ${(p) => p.isDesk && '0 3rem'};
  .title {
    font-size: 1.8rem;
    font-size: ${(p) => (p.isDesk ? '1.8rem' : '3rem')};
  }
`;
const Slider = styled(Flex)`
  gap: 0.5rem;
  height: fit-content;
  margin-bottom: 2rem;
`;
