import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { PageTitle } from './Title';
import { Grid, Row, rowVars, Slider } from '../../../styles/global';
import { Info } from './List/Info';
import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { NoData } from '../Tools/NoData';
import { Btn } from '../Tools/Button';
import { Svg } from '../Tools/Svg';

interface IMovie {
  type: string;
}
export const Movie = ({ type }: IMovie) => {
  const [api, setApi] = useState('');
  useEffect(() => {
    if (type) setApi(`/api/movie/${type}`);
  }, [type, setApi]);
  const { data } = useSWR(api);
  //
  const array = data?.arr?.results;
  const isAny = Boolean(array?.length! > 0);
  const [page, setPage] = useState(0);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((p) => !p);
  const offset = 5;
  const totalNum = Number(array?.length);
  const MaxIndex = Math.floor(totalNum / offset) - 1;

  const increaseIndex = () => {
    if (clicked) return;
    toggleClicked();
    setPage((p) => (p === MaxIndex ? 0 : p + 1));
  };

  return (
    <>
      <PageTitle type={type} />
      {/* <List array={array} /> */}

      {isAny && (
        <Slider>
          <AnimatePresence initial={false} onExitComplete={toggleClicked}>
            <Row
              key={page}
              variants={rowVars}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: 'tween', duration: 1 }}
            >
              {array
                ?.slice(offset * page, offset + offset * page)
                .map((item: any) => (
                  <Box key={item.id}>
                    <span className="num">#{array?.indexOf(item) + 1}</span>
                    <img
                      src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                      alt="영화포스터1"
                    />
                    <Info item={item} />
                  </Box>
                ))}
            </Row>
          </AnimatePresence>
        </Slider>
      )}
      {!isAny && <NoData type="movie" key={page} />}
    </>
  );
};

const Box = styled.article`
  .num {
    font-size: 3rem;
    font-weight: 800;
    color: red;
  }
  img {
    width: 100%;
    min-height: 130px;
    border-radius: 3px;
  }
  .red {
    color: ${(p) => p.theme.color.logo};
  }
`;
