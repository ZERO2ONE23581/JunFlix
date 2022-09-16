import useSWR from 'swr';
import { useState } from 'react';
import { Svg } from '../Svg';
import styled from '@emotion/styled';
import { NoData } from '../NoData';
import { AnimatePresence } from 'framer-motion';
import { rowVars } from '../../../../styles/global';
import { IPostList } from '../../../types/post';
import { PostBox } from '../../Post/Read/List/PostBox';
import { useRouter } from 'next/router';
import { Row, Slide, SliderCont, Wrap } from './movie';

export const PostSlide = () => {
  const { data } = useSWR<IPostList>(`/api/posts`);
  //
  const offset = 4;
  const [page, setPage] = useState(0);
  const array = data?.posts;
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
      <h1 onClick={() => router.push(`/posts`)}>
        <span>Posts</span>
        <Svg type="post" size="2rem" />
      </h1>
      {isData && (
        <Wrap>
          <Svg size="2rem" type="chev-left-arrow" onClick={() => {}} />
          <Row className="post-row">
            <AnimatePresence
              initial={false}
              onExitComplete={() => setLeave((p) => !p)}
            >
              <Slide
                className="post-slide"
                key={page}
                variants={rowVars}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
              >
                {slicedArray?.map((item: any) => (
                  <PostBox post={item} key={item.id} />
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
const Cont = styled(SliderCont)`
  .post-row {
    min-height: 330px;
    .post-slide {
      grid-template-columns: repeat(4, 1fr);
      .post-box {
        min-height: 330px;
        .post-bg {
          min-height: 330px;
          .post-icon {
            min-height: 330px;
          }
        }
      }
    }
  }
`;
