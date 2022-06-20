import { useState } from 'react';
import { IInputWrapProps, Input, InputLabel } from '.';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';

export const SelectWrap = ({
  id,
  label,
  watch,
  isValue,
  register,
  disabled,
  inputErrMsg,
}: IInputWrapProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const handleBlur = () => {
    if (inputErrMsg) return;
    if (watch) return;
    setIsFocus(false);
  };
  const isLabelChange = Boolean(isFocus || disabled || isValue);
  return (
    <Cont>
      <div className="wrap">
        <Label htmlFor={id} isChange={isLabelChange}>
          {label}
        </Label>
        <Select
          as="select"
          {...register}
          id={id}
          name={id}
          disabled={disabled}
          onFocus={() => setIsFocus(true)}
          onBlur={handleBlur}
        >
          {id === 'gender' && (
            <>
              <option value="">성별을 선택해주세요.</option>
              <option value="male">남</option>
              <option value="female">여</option>
            </>
          )}
          {id === 'genre' && (
            <>
              <option value="">좋아하는 영화 장르를 선택해주세요.</option>
              <option value="SF">SF</option>
              <option value="Action">Action</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Comedy">Comedy</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Thriller">Thriller</option>
            </>
          )}
        </Select>
      </div>
      {inputErrMsg && (
        <div className="error">
          <ErrorMsg error={inputErrMsg} />
        </div>
      )}
    </Cont>
  );
};
const Cont = styled.article`
  width: 100%;
  .wrap {
    position: relative;
  }
  .error {
    margin-top: 20px;
  }
`;
const Label = styled(InputLabel)<{ isChange: boolean }>`
  width: 90%;
  width: ${(p) => p.isChange && '32%'};
`;
const Select = styled(Input)``;
