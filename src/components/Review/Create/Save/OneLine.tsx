import styled from '@emotion/styled';
import { Length } from '../../../Tools';
import { ErrorMsg } from '../../../Style/ErrMsg';
import { InputWrap } from '../../../Style/Input';
import { IUseform } from '../../../../types/global';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Btn } from '../../../Style/Button';

interface IOneLine extends IUseform {
  error: string;
  setSave: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<boolean>>;
}
export const OneLineModal = ({
  watch,
  error,
  register,
  setValue,
  setError,
  clearErrors,
  setSave,
  setScore,
}: IOneLine) => {
  const MaxOneLine = 30;
  const OneLineLength = Length({ watch: watch, type: 'oneline' });
  const clickNext = () => {
    if (OneLineLength > MaxOneLine) {
      return setError('oneline', {
        message: `한줄평의 최대길이는 ${MaxOneLine} 내외입니다.`,
      });
    }
    setScore(true);
  };
  useEffect(() => {
    if (OneLineLength !== 0 && OneLineLength < MaxOneLine) clearErrors('title');
  }, [OneLineLength, MaxOneLine]);
  useEffect(() => {
    const start = 0.5;
    if (!watch('score')) setValue('score', start);
  }, [setValue, watch('score')]);
  return (
    <Cont>
      <h1>
        <span>이 영화에 대한 한줄평을 작성해 주세요.</span>
        <span>Write your review in a sentence.</span>
      </h1>
      <InputWrap
        type="text"
        id="oneline"
        label="영화 한줄평"
        watch={watch('oneline')}
        register={register('oneline')}
      />
      <h2>
        <span>
          * 한줄평은 <span className="num">{MaxOneLine}</span>자 이내 작성할 수
          있습니다.
        </span>
      </h2>
      {error && <ErrorMsg error={error} />}
      <div className="btn-wrap">
        <Btn type="button" name="뒤로가기" onClick={() => setSave(false)} />
        <Btn type="button" name="다음" onClick={clickNext} />
      </div>
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
