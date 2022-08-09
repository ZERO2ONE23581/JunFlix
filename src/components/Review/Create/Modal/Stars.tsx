import { Btn } from '../../../Tools/Button';
import { Stars } from '../../../Tools/Stars';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IUseform } from '../../../../types/global';
import { BtnWrap } from '../../../../../styles/global';

interface IScoreModal extends IUseform {
  stars: number;
  setScore: Dispatch<SetStateAction<boolean>>;
  setRecommend: Dispatch<SetStateAction<boolean>>;
}
export const ReviewStars = ({
  watch,
  stars,
  register,
  setScore,
  setRecommend,
}: IScoreModal) => {
  return (
    <>
      <span>리뷰하는 영화에 대한 별점을 매겨보세요.</span>
      <span>Give Stars to the movie.</span>
      <Range>
        <Stars score={watch!('score')} />
        {/* <Stars score={stars} /> */}
        <label htmlFor="score" />
        <input
          {...register!('score')}
          min={0.5}
          max={5}
          step={0.5}
          id="score"
          name="score"
          type="range"
        />
      </Range>
      <span>
        * 별은 최소 반개 <span className="red">(0.5)</span> 부터
        <span className="red">5</span>개 까지 줄 수 있습니다.
      </span>
      <span>
        * You can give stars from half <span className="red">(0.5)</span> up to
        <span className="red">5</span>.
      </span>
      <BtnWrap className="btn-wrap">
        <Btn type="button" name="BACK" onClick={() => setScore(false)} />
        <Btn type="button" name="NEXT" onClick={() => setRecommend(true)} />
      </BtnWrap>
    </>
  );
};
const Range = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  input[type='range'] {
    z-index: 2;
    cursor: pointer;
    width: 135px;
    background: inherit;
    -webkit-appearance: none;
  }
  input[type='range']::-webkit-slider-thumb {
    height: 1rem;
    width: 1rem;
    background: inherit;
    -webkit-appearance: none;
  }
`;
