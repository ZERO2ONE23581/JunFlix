import useSWR from 'swr';
import { Svg } from '../Svg';
import { Row } from './Row';
import { NoData } from '../NoData';
import styled from '@emotion/styled';
import { SlideTitle } from './SlideTitle';
import { useEffect, useState } from 'react';
import { IApi } from '../../../types/global';
import useUser from '../../../libs/client/useUser';
import { useCapLetter } from '../../../libs/client/useTools';
import { useRouter } from 'next/router';

interface ISlider {
  pageType?: string;
  sliderType: string;
  sliderDetail?: string;
}
export const Slider = ({ pageType, sliderType, sliderDetail }: ISlider) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { loggedInUser } = useUser();
  const [api, setApi] = useState('');
  const { data } = useSWR<IApi>(api);
  const [boxes, setBoxes] = useState(6);
  const [page, setPage] = useState(0);
  const [leave, setLeave] = useState(false);
  const [array, setArray] = useState<any>([]);
  const [reverse, setReverse] = useState(false);
  const slicedArray = array?.slice(boxes * page, boxes + boxes * page);

  //api
  useEffect(() => {
    if (sliderType === 'board') setApi(`/api/boards`);
    if (sliderType === 'post') {
      if (sliderDetail === 'likes') setApi(`/api/user/${user_id}/likes`);
      else setApi(`/api/posts`);
    }
    if (sliderType === 'movie') {
      if (pageType === 'home') {
        setApi(`/api/movie/trending`);
      } else setApi(`/api/movie/${sliderDetail}`);
    }
  }, [pageType, sliderType, setApi, sliderDetail, user_id]);

  //array
  useEffect(() => {
    if (sliderType === 'movie') setArray(data?.arr?.results);
    if (sliderType === 'board') {
      if (sliderDetail === 'my')
        setArray(data?.boards?.filter((p) => p.UserID === loggedInUser?.id));
      else if (pageType === 'genre-boards')
        setArray(
          data?.boards?.filter((p) => p.genre === useCapLetter(sliderDetail!))
        );
      else setArray(data?.boards);
    }
    if (sliderType === 'post') {
      if (sliderDetail === 'my')
        setArray(data?.posts?.filter((p) => p.UserID === loggedInUser?.id));
      else if (sliderDetail === 'likes') setArray(data?.MyPostLikes);
      else setArray(data?.posts);
    }
  }, [
    data,
    setArray,
    pageType,
    sliderType,
    sliderDetail,
    loggedInUser,
    useCapLetter,
  ]);

  //Boxes
  useEffect(() => {
    if (sliderType === 'movie') return setBoxes(6);
    if (sliderDetail === 'likes') return setBoxes(5);
    else return setBoxes(4);
  }, [pageType, sliderType, setBoxes, sliderDetail]);

  const isSingleRow = Boolean(array?.length <= boxes);
  const clickArrow = (arrow: string) => {
    if (isSingleRow) return;
    if (leave) return;
    setLeave((p) => !p);
    const LastPage = Math.ceil(array?.length / boxes);
    if (arrow === 'left') {
      setReverse(true);
      setPage((p) => (p === 0 ? LastPage - 1 : p - 1));
    }
    if (arrow === 'right') {
      setReverse(false);
      setPage((p) => (p === LastPage - 1 ? 0 : p + 1));
    }
  };
  const isData = Boolean(data);
  return (
    <Cont className="slider">
      <SlideTitle
        pageType={pageType}
        sliderType={sliderType}
        sliderDetail={sliderDetail}
      />
      {isData && (
        <Flex className="flex" isSingleRow={isSingleRow}>
          <Svg
            size="2rem"
            type="left-chevron"
            onClick={() => clickArrow('left')}
          />
          <Row
            page={page}
            boxes={boxes}
            reverse={reverse}
            setLeave={setLeave}
            array={slicedArray}
            type={{
              pageType: pageType!,
              sliderType: sliderType,
              sliderDetail: sliderDetail,
            }}
          />
          <Svg
            size="2rem"
            type="right-chevron"
            onClick={() => clickArrow('right')}
          />
        </Flex>
      )}
      {!isData && <NoData type="movie" />}
    </Cont>
  );
};
const Cont = styled.section``;
const Flex = styled.article<{ isSingleRow: boolean }>`
  gap: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .right-chevron,
  .left-chevron {
    opacity: ${(p) => p.isSingleRow && 0};
    pointer-events: ${(p) => p.isSingleRow && 'none'};
  }
`;
