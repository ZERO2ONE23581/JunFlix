import styled from '@emotion/styled';
import { Length } from '../../Tools';
import { InputWrap } from '../../Input';
import { IUseform } from '../../../../types/global';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Btn } from '../../Button';

interface IOneLine extends IUseform {
  isEdit?: boolean;
  setSave: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<boolean>>;
}
export const OneLineModal = ({
  isEdit,
  watch,
  register,
  setValue,
  setError,
  clearErrors,
  setSave,
  setScore,
}: IOneLine) => {
  const MaxOneLine = 30;
  const OneLineLength = Length(watch!('oneline'));
  const clickNext = () => {
    if (OneLineLength! > MaxOneLine) {
      return setError!('oneline', {
        message: `한줄평의 최대길이는 ${MaxOneLine} 내외입니다.`,
      });
    }
    setScore(true);
  };
  useEffect(() => {
    if (OneLineLength !== 0 && OneLineLength! < MaxOneLine)
      clearErrors!('oneline');
  }, [OneLineLength, MaxOneLine]);
  useEffect(() => {
    const start = 0.5;
    if (watch!('score')) setValue!('score', start);
  }, [setValue, watch!('score')]);
  return (
    <Cont>
      <h1>
        {isEdit && <span>한줄평을 수정하시겠습니까?</span>}
        {!isEdit && <span>이 영화에 대한 한줄평을 작성해 주세요.</span>}
        {isEdit && <span>Do you want to edit your one line review?</span>}
        {!isEdit && <span>Write your review in a sentence.</span>}
      </h1>
      <InputWrap
        type="text"
        id="oneline"
        label="영화 한줄평"
        watch={watch!('oneline')}
        register={register!('oneline')}
      />
      <h2>
        <span>
          * 한줄평은 <span className="num">{MaxOneLine}</span>자 이내 작성할 수
          있습니다.
        </span>
      </h2>

      <BtnWrap>
        <Btn type="button" name="뒤로가기" onClick={() => setSave(false)} />
        <Btn type="button" name="다음" onClick={clickNext} />
      </BtnWrap>
    </Cont>
  );
};
const Cont = styled.article`
  gap: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .oneline {
    max-width: 300px;
  }
  .data {
    color: ${(p) => p.theme.color.logo};
  }
`;
export const BtnWrap = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    min-width: 100px;
    height: 30px;
  }
`;
