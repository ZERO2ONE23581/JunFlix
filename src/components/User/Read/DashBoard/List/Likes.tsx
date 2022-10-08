import { useState } from 'react';
import styled from '@emotion/styled';
import { IData } from '../../../../../types/global';
import { Slider } from '../../../../../Tools/Slider';
import { ReviewList } from '../../../../Review/Read/List';
import { ITheme } from '../../../../../../styles/theme';
import { BtnWrap } from '../../../../../../styles/global';
import { Btn } from '../../../../../Tools/Button';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { circleVar, Circle } from '../../../../../../styles/variants';

export const MyLikes = ({ theme }: ITheme) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [type, setType] = useState('post');
  const { data } = useSWR<IData>(user_id && `/api/user/${user_id}/likes`);
  //
  console.log(type);
  return (
    <Cont className="likes-wrap">
      <BtnWrap>
        <Btn
          theme={!theme}
          type="button"
          name={`${'username'}님이 좋아하는 포스트`}
          onClick={() => setType('post')}
        >
          <>
            {type === 'post' && (
              <Circle
                className="circle"
                exit="exit"
                initial="initial"
                animate="animate"
                variants={circleVar}
              />
            )}
          </>
        </Btn>
        <Btn
          theme={!theme}
          type="button"
          name={`${'username'}님이 좋아하는 리뷰`}
          onClick={() => setType('review')}
        >
          <>
            {type === 'review' && (
              <Circle
                className="circle"
                exit="exit"
                initial="initial"
                animate="animate"
                variants={circleVar}
              />
            )}
          </>
        </Btn>
      </BtnWrap>
      <div className="lists">
        {type === 'post' && (
          <Slider theme={theme} sliderType="post" sliderDetail="likes" />
        )}
        {type === 'review' && <ReviewList isMyPage reviews={[]} isLikesType />}
      </div>
    </Cont>
  );
};
const Cont = styled.article`
  width: 100%;
  .child {
    top: 120%;
    .circle {
      position: absolute;
    }
  }
`;
