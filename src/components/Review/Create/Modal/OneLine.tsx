import { Btn } from '../../../Tools/Button';
import { InputWrap } from '../../../Tools/Input';
import { IUseform } from '../../../../types/global';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { BtnWrap } from '../../../../../styles/global';
import { useLength } from '../../../../libs/client/useTools';

interface IOneLine extends IUseform {
  isEdit?: boolean;
  setSave: Dispatch<SetStateAction<boolean>>;
  setScore: Dispatch<SetStateAction<boolean>>;
}
export const OneLine = ({
  watch,
  register,
  setValue,
  setError,
  setSave,
  setScore,
  clearErrors,
}: IOneLine) => {
  const max = 30;
  const length = useLength(watch!('oneline'));
  const clickNext = () => {
    if (length! > max) {
      return setError!('oneline', {
        message: `한줄평의 최대길이는 ${max} 내외입니다.`,
      });
    }
    setScore(true);
  };
  useEffect(() => {
    if (length !== 0 && length! < max) clearErrors!('oneline');
  }, [length, max]);
  useEffect(() => {
    const start = 0.5;
    if (watch!('score')) setValue!('score', start);
  }, [setValue, watch!('score')]);

  return (
    <>
      <span>이 영화에 대한 한줄평을 작성해 주세요.</span>
      <span>Write a one-line review to this movie.</span>
      <InputWrap
        type="text"
        id="oneline"
        register={register!('oneline')}
        placeholder="한줄평 작성..."
      />
      <span>
        * 한줄평은 <span className="red">{max}</span>자 이내 작성할 수 있습니다.
      </span>
      <BtnWrap className="btn-wrap">
        <Btn type="button" name="BACK" onClick={() => setSave(false)} />
        <Btn type="button" name="NEXT" onClick={clickNext} />
      </BtnWrap>
    </>
  );
};
