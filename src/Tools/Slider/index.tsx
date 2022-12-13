import useSWR from 'swr';
import { Row } from './Row';
import { Title } from './Title';
import styled from '@emotion/styled';
import { IMovie } from '../../types/global';
import { FlexCol } from '../../../styles/global';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ISlider {
  _data: {
    theme: boolean;
    type: string;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const Slider = ({ _data }: ISlider) => {
  const [page, setPage] = useState(0);
  const [boxes, setBoxes] = useState(6);
  const [leave, setLeave] = useState(false);
  const [reverse, setReverse] = useState(false);

  const { theme, type, setFixed } = _data;
  const { data } = useSWR<IMovie>(`/api/movie/${type}`);

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
    <Cont className="slider">
      <Title _data={{ theme, type }} />
      <Row
        _set={{ setFixed, setLeave }}
        _data={{ theme, array, page, boxes, reverse, onClick }}
      />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  padding: 0 5rem;
  align-items: flex-start;
`;
