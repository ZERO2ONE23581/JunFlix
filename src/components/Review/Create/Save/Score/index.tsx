import { Stars } from './Stars';
import styled from '@emotion/styled';
import { Btn } from '../../../../Style/Button';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface IScoreModal {
  watch: UseFormWatch<any>;
  register: UseFormRegister<any>;
  setScore: Dispatch<SetStateAction<boolean>>;
  setRecommend: Dispatch<SetStateAction<boolean>>;
}
export const ScoreModal = ({
  watch,
  register,
  setScore,
  setRecommend,
}: IScoreModal) => {
  return (
    <>
      <Cont>
        <h1>
          <span>리뷰하는 영화에 대한 별점을 매겨보세요.</span>
          <span>Give stars to the movie you review!</span>
        </h1>
        <Range>
          <Stars score={watch('score')} />
          <label htmlFor="score" />
          <input
            {...register('score')}
            min={0}
            max={5}
            step={0.5}
            id="score"
            name="score"
            type="range"
          />
        </Range>
        <h2>
          <span>
            * 별은 최소 반개 <span className="num">(0.5)</span> 부터{' '}
            <span className="num">5</span>
            개까지 줄 수 있습니다.
          </span>
          <span>
            * You can give stars from half <span className="num">(0.5)</span> up
            to <span className="num">5</span>.
          </span>
        </h2>
        <div className="btn-wrap">
          <Btn type="button" name="뒤로가기" onClick={() => setScore(false)} />
          <Btn type="button" name="다음" onClick={() => setRecommend(true)} />
        </div>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
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
