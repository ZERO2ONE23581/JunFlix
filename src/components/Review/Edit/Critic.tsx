import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';
import { IReviewForm } from '../../../types/review';
import { Input } from '../../Style/Input';

interface ICritic {
  register: UseFormRegister<IReviewForm>;
}
export const Critic = ({ register }: ICritic) => {
  return (
    <>
      <Cont>
        <Oneline>
          <label htmlFor="oneline">
            {/* 이 영화에 대한 한줄평을 작성해 주세요. */}
            한줄평 수정하기
          </label>
          <Input
            id="oneline"
            type="text"
            maxLength={30}
            placeholder="영화 한줄평"
            {...register('oneline')}
          />
        </Oneline>
        <Score>
          <label htmlFor="score">별점 수정하기</label>
          <input {...register('score')} type="range" min={0} max={5} />
        </Score>
        <Recommend>
          <label htmlFor="recommend">영화추천 유무</label>
          <input
            {...register('recommend')}
            type="checkbox"
            id="recommend"
            name="recommend"
          />
        </Recommend>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  > div {
    width: 100%;
    height: 70px;
    border-radius: 3px;
    position: relative;
    border: 2px solid ${(p) => p.theme.color.logo};
    border: ${(p) => p.theme.border.thick};
    label {
      top: 0%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      width: 120px;
      padding: 5px;
      background-color: ${(p) => p.theme.color.bg};
      font-size: 1rem;
    }
    .question {
      position: absolute;
    }
  }
`;
const Oneline = styled.div`
  text-align: center;
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    border: none;
    box-shadow: none;
    padding: 5px 20px;
    :focus {
      border: none;
      outline: none;
    }
  }
`;
const Score = styled(Oneline)`
  input {
    width: 60px;
    margin: 10px auto;
    text-align: center;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }
`;
const Recommend = styled(Oneline)`
  flex-direction: row;
  align-items: center;
  input {
    border-radius: 10%;
    width: 30px;
    height: 30px;
    &:checked {
      color: red;
      background-color: red;
    }
  }
`;
