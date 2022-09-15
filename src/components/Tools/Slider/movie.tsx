import useSWR from 'swr';
import { useState } from 'react';
import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { NoData } from '../NoData';
import { AnimatePresence, motion } from 'framer-motion';
import { boxVars, rowVars } from '../../../../styles/global';
import { useRouter } from 'next/router';

export const MovieSlider = () => {
  const { data } = useSWR(`/api/movie/trending`);
  //
  const offset = 6;
  const [page, setPage] = useState(0);
  const array = data?.arr?.results;
  const slicedArray = array?.slice(offset * page, offset + offset * page);
  const isData = Boolean(array?.length > 0);
  const Length = Number(array?.length);
  const MaxIndex = Math.floor(Length / offset) - 1;
  //
  const [leave, setLeave] = useState(false);
  const increaseIndex = () => {
    if (leave) return;
    setLeave((p) => !p);
    setPage((p) => (p === MaxIndex ? 0 : p + 1));
  };
  const router = useRouter();
  return (
    <SliderCont>
      <h1 onClick={() => router.push(`/movies`)}>
        <span>Trending Now</span>
        <Svg type="smile" size="2rem" />
      </h1>
      {isData && (
        <Wrap>
          <Svg size="2.5rem" type="chev-left-arrow" onClick={() => {}} />
          <Row>
            <AnimatePresence
              initial={false}
              onExitComplete={() => setLeave((p) => !p)}
            >
              <Slide
                key={page}
                variants={rowVars}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
              >
                {slicedArray?.map((item: any) => (
                  <Box
                    key={item.id}
                    className="movie"
                    variants={boxVars}
                    initial="initial"
                    whileHover="hover"
                    bg={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  >
                    {/* <Info item={item} /> */}
                  </Box>
                ))}
              </Slide>
            </AnimatePresence>
          </Row>
          <Svg size="2.5rem" type="chev-right-arrow" onClick={increaseIndex} />
        </Wrap>
      )}
      {!isData && <NoData type="movie" />}
    </SliderCont>
  );
};
export const SliderCont = styled.section`
  h1 {
    gap: 10px;
    display: flex;
    align-items: center;
    font-size: 1.7rem;
    border-radius: 5px;
    padding: 5px 10px;
    width: fit-content;
    margin-left: 80px;
    margin-bottom: 15px;
    :hover {
      cursor: pointer;
      color: ${(p) => p.theme.color.logo};
      svg {
        fill: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
export const Wrap = styled.article`
  gap: 10px;
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
`;
export const Row = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 150px;

  gap: 10px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;
const Box = styled(motion.div)<{ bg: string }>`
  position: relative;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  background: ${(prev) => `url(${prev.bg}) center / cover no-repeat`};
  &:first-of-type {
    transform-origin: center left;
  }
  &:last-of-type {
    transform-origin: center right;
  }
`;
