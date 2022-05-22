import styled from '@emotion/styled';
import { ErrMsg, InputCont } from '../../styles/components/default';
import { IInputProps } from '../types/input';

export const Input = (props: IInputProps) => {
  return (
    <>
      {props.name !== 'content' ? (
        <InputCont>
          <label htmlFor={props.name}>{props.label}</label>
          <input
            name={props.name}
            type={props.type}
            {...props.register}
            disabled={props.disabled}
            placeholder={props.placeholder}
          />
          {props.errMsg && <ErrMsg>{props.errMsg}</ErrMsg>}
        </InputCont>
      ) : (
        <InputCont>
          <label htmlFor={props.name}>{props.label}</label>
          <Textarea {...props.register} name={props.name} cols={20} rows={20} />
          {props.errMsg && <ErrMsg>{props.errMsg}</ErrMsg>}
        </InputCont>
      )}
    </>
  );
};

export const Select = ({
  name,
  label,
  errMsg,
  options,
  register,
  placeholder,
  disabled,
}: IInputProps) => {
  return (
    <>
      {name !== 'genre' ? (
        <InputCont>
          <label htmlFor={name}>{label}</label>
          <select {...register} name={name} id={name}>
            <option value="">{placeholder}</option>
            <option value="Male">{options[0]}</option>
            <option value="Female">{options[1]}</option>
          </select>
          {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        </InputCont>
      ) : (
        <InputCont>
          <label htmlFor={name}>{label}</label>
          <select disabled={disabled} {...register} name={name} id={name}>
            <option value="">{placeholder}</option>
            <option value="SF">{options[0]}</option>
            <option value="Drama">{options[1]}</option>
            <option value="Horror">{options[2]}</option>
            <option value="Comedy">{options[3]}</option>
            <option value="Fantasy">{options[4]}</option>
            <option value="Romance">{options[5]}</option>
            <option value="Action">{options[6]}</option>
            <option value="Mystery">{options[7]}</option>
            <option value="Thriller">{options[8]}</option>
            <option value="Others">{options[9]}</option>
          </select>
          {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        </InputCont>
      )}
    </>
  );
};

const Textarea = styled.textarea`
  padding: 20px;
  font-size: 1rem;
`;
