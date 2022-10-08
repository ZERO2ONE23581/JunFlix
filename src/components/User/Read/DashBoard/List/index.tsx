import useSWR from 'swr';
import { useState } from 'react';
import { MyLikes } from './Likes';
import { PostList } from '../../../../Post/Read/List';
import { ReviewList } from '../../../../Review/Read/List';
import { IBoardWithAttrs } from '../../../../../types/board';
import {
  IGetReviews,
  LikesWithReview,
  ReviewWithUser,
} from '../../../../../types/review';
import { LikesWithPost, PostModel } from '../../../../../types/post';
import { BoardList } from '../../../../Board/Read/List';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Slider } from '../../../../../Tools/Slider';
import { BtnWrap } from '../../../../../../styles/global';
import { Btn } from '../../../../../Tools/Button';
import { ITheme } from '../../../../../../styles/theme';
import { useCapLetters } from '../../../../../libs/client/useTools';
import { Svg } from '../../../../../Tools/Svg';
import { AnimatePresence, motion } from 'framer-motion';
import { cicleVar, Circle } from '../../../../../../styles/variants';

interface IUserList extends ITheme {
  username: string;
}
export const ListWrap = ({ theme, username }: IUserList) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { data } = useSWR<IGetReviews>(
    user_id && `/api/user/${user_id}/review`
  );
  const btns = ['board', 'post', 'review', 'like'];
  const [clicked, setClicked] = useState('board');
  //
  return (
    <Cont className="list-wrap">
      <BtnWrap className="btn-wrap">
        {btns.map((i) => (
          <Btn
            key={i}
            theme={!theme}
            type="button"
            className="btn"
            layoutId={btns.indexOf(i)}
            name={`${useCapLetters(i)}s`}
            onClick={() => setClicked(i)}
            isClicked={Boolean(clicked === i)}
          />
        ))}
      </BtnWrap>
      <Lists className="list">
        {clicked === 'board' && (
          <Slider sliderType={'board'} sliderDetail="my" theme={theme} />
        )}
        {clicked === 'post' && (
          <Slider sliderType={'post'} sliderDetail="my" theme={theme} />
        )}
        {clicked === 'review' && <ReviewList reviews={data?.reviews!} />}
        {clicked === 'like' && <MyLikes theme={theme} />}
      </Lists>
    </Cont>
  );
};
const Cont = styled.article`
  .btn-wrap {
    padding-top: 20px;
    padding-bottom: 10px;
    margin-bottom: 20px;
    .btn {
      position: relative;
      padding: 5px;
      font-size: 1.2em;
      .child {
        top: 130%;
        left: 50%;
        transform: translate(-50%, -50%);
        .circle {
        }
      }
    }
    // border-bottom: thick double ${(p) => p.theme.color.logo};
  }
  .list {
    //border: 2px solid red;
  }
`;
const Lists = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  .slider {
    width: 100%;
    .flex {
      gap: 5px;
      .left-chevron,
      .right-chevron {
        width: 50px;
        height: 50px;
      }
      .row {
        min-height: 400px;
        .slide {
          .box-array {
            .slide {
              gap: 20px;
            }
          }
        }
      }
    }
  }
`;
