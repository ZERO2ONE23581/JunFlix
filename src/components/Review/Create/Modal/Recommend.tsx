import { Svg } from '../../../../Tools/Svg';
import { Btn } from '../../../../Tools/Button';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IUseform } from '../../../../types/global';
import { BtnWrap } from '../../../../../styles/global';

interface IRecommend extends IUseform {
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
      <Flex>
        <h1>
          <span>이 영화를 추천한다면 체크해주세요.</span>
          <span>Check if you recommend this movie.</span>
        </h1>
        <CheckBox>
          <input
            {...register!('recommend')}
            id="recommend"
            type="checkbox"
            name="recommend"
          />
          <label htmlFor="recommend">
            <Svg type="check" size="1rem" />
          </label>
        </CheckBox>
      </Flex>
      <BtnWrap className="btn-wrap">
        <Btn type="button" name="BACK" onClick={() => setRecommend(false)} />
        <Btn type="button" name="NEXT" onClick={() => setUpload(true)} />
      </BtnWrap>
    </>
  );
};
const Flex = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    span {
      display: block;
      text-align: center;
    }
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
