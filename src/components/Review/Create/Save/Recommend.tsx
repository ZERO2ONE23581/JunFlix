import styled from '@emotion/styled';
import { Btn } from '../../../Style/Button';
import { Svg } from '../../../Style/Svg/Svg';
import { Dispatch, SetStateAction } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface IRecommend {
  register: UseFormRegister<any>;
  setUpload: Dispatch<SetStateAction<boolean>>;
  setRecommend: Dispatch<SetStateAction<boolean>>;
}
export const Recommend = ({
  register,
  setUpload,
  setRecommend,
}: IRecommend) => {
  return (
    <>
      <Cont>
        <div className="flex">
          <h1>
            <span>이 영화를 추천한다면 체크해주세요.</span>
          </h1>
          <CheckBox>
            <input
              {...register('recommend')}
              id="recommend"
              type="checkbox"
              name="recommend"
            />
            <label htmlFor="recommend">
              <Svg type="check" size="1rem" />
            </label>
          </CheckBox>
        </div>
        <div className="btn-wrap">
          <Btn
            type="button"
            name="뒤로가기"
            onClick={() => setRecommend(false)}
          />
          <Btn type="button" name="다음" onClick={() => setUpload(true)} />
        </div>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  .flex {
    margin: 10px 0;
    gap: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn-wrap {
    margin: 0 auto;
    max-width: 200px;
  }
`;
const CheckBox = styled.div`
  input[type='checkbox'] {
    display: none;
  }
  label {
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    position: relative;
    border: 2px solid ${(p) => p.theme.color.logo};
    svg {
      display: none;
    }
    :hover {
      background-color: ${(p) => p.theme.color.logo};
      svg {
        fill: ${(p) => p.theme.color.bg};
      }
    }
  }
  input[type='checkbox']:checked + label {
    position: relative;
    background-color: ${(p) => p.theme.color.logo};
    svg {
      display: block;
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      fill: ${(p) => p.theme.color.font};
    }
    :hover {
      border: 2px solid ${(p) => p.theme.color.font};
      background-color: ${(p) => p.theme.color.font};
      svg {
        fill: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
