import { useState } from 'react';
import { IInputWrapProps, Input, InputLabel } from '.';
import { ErrorMsg } from '../ErrMsg';
import styled from '@emotion/styled';

interface IOptionsProps {
  type: string;
}
export const Options = ({ type }: IOptionsProps) => {
  return (
    <>
      {type === 'genre' && (
        <>
          <option value="">장르를 선택해주세요.</option>
          <option value="SF">SF</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Comedy">Comedy</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Thriller">Thriller</option>
          <option value="others">Others (기타)</option>
        </>
      )}
    </>
  );
};
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
          {id === 'genre' && <Options type="genre" />}
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
  .wrap {
    position: relative;
  }
  .error {
    margin-top: 20px;
  }
`;
const Label = styled(InputLabel)<{ isChange: boolean }>`
  /* width: 90%; */
  /* width: ${(p) => p.isChange && '32%'}; */
`;
const Select = styled.select`
  border: none;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  background-color: inherit;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  color: ${(p) => p.theme.color.font};
  &:focus {
    border: none;
    outline: 2px solid ${(p) => p.theme.color.logo};
  }
`;
