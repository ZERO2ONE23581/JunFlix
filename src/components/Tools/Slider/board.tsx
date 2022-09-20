import useSWR from 'swr';
import { Svg } from '../Svg';
import { useState } from 'react';
import { NoData } from '../NoData';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { IGetBoards } from '../../../types/board';
import { slideVars } from '../../../../styles/global';
import { BoardBox } from '../../Board/Read/List/Board';
import { Row, Slide, SliderWrap, Wrap } from './Movie';

export const BoardSlide = () => {
  const { data } = useSWR<IGetBoards>(`/api/boards`);
  //
  const offset = 5;
  const [page, setPage] = useState(0);
  const array = data?.boards;
  const slicedArray = array?.slice(offset * page, offset + offset * page);
  const isData = Boolean(array?.length! > 0);
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
  //
  return (
    <Cont>
      <h1 onClick={() => router.push(`/boards`)}>
        <span>Boards</span>
        <Svg type="grid" size="2rem" />
      </h1>
      {isData && (
        <Wrap>
          <Svg size="2rem" type="chev-left-arrow" onClick={() => {}} />
          <Row className="board-row">
            <AnimatePresence
              initial={false}
              onExitComplete={() => setLeave((p) => !p)}
            >
              <Slide
                className="board-slide"
                key={page}
                variants={slideVars}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
              >
                {slicedArray?.map((item: any) => (
                  <BoardBox
                    key={item.id}
                    boardId={item.id}
                    genre={item.genre}
                    title={item.title}
                    userId={item.UserID}
                    avatar={item.avatar!}
                    username={item.user.username!}
                  />
                ))}
              </Slide>
            </AnimatePresence>
          </Row>
          <Svg size="2rem" type="chev-right-arrow" onClick={increaseIndex} />
        </Wrap>
      )}
      {!isData && <NoData type="board" />}
    </Cont>
  );
};

const Cont = styled(SliderWrap)`
  .board-row {
    height: 250px;
    .board-slide {
      grid-template-columns: repeat(5, 1fr);
      .board-box {
        height: 250px;
      }
    }
  }
`;
