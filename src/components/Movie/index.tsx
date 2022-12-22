import useSWR from 'swr';
import { Title } from './Title';
import styled from '@emotion/styled';
import { MovieArray } from './Array';
import { Svg } from '../../Tools/Svg';
import { IMovie, IMovieRes } from '../../types/global';
import { Flex, FlexCol } from '../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ISlider {
  _data: {
    theme: boolean;
    hideTitle?: boolean;
    type: string | any;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const Movies = ({ _data }: ISlider) => {
  const [page, setPage] = useState(0);
  const [boxes, setBoxes] = useState(6);
  const [leave, setLeave] = useState(false);
  const [reverse, setReverse] = useState(false);

  const { theme, type, setFixed, hideTitle } = _data;
  const { data } = useSWR<IMovieRes>(`/api/movie/${type}`);

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
  useEffect(() => {
    if (type) return setBoxes(5);
  }, [type, setBoxes]);

  return (
    <Cont>
      {!hideTitle && <Title _data={{ theme, type }} />}
      <Slider>
        <Svg theme={theme} type="left-chev" onClick={() => onClick('left')} />
        <MovieArray
          _data={{ theme, array, page, boxes, reverse, setFixed, setLeave }}
        />
        <Svg theme={theme} type="right-chev" onClick={() => onClick('right')} />
      </Slider>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  padding: 0 5rem;
  align-items: flex-start;
`;
const Slider = styled(Flex)`
  gap: 0.5rem;
  height: fit-content;
  margin-bottom: 2rem;
`;
