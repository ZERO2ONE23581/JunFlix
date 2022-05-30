import styled from '@emotion/styled';
import { ErrMsg, InputCont } from '../../../styles/default';
import { IInputProps } from '../../types/input';

export const Input = (props: IInputProps) => {
  return (
    <>
      {props.name !== 'content' ? (
        <InputCont>
          <label htmlFor={props.name}>{props.label}</label>
          <input
            id={props.name}
            name={props.name}
            min={props.min}
            max={props.max}
            type={props.type}
            {...props.register}
            disabled={props.disabled}
            placeholder={props.placeholder}
          />
          {props.errMsg && <ErrMsg>{props.errMsg}</ErrMsg>}
        </InputCont>
      ) : props.type === 'file' ? (
        <InputCont>
          <label htmlFor={props.name}>{props.label}</label>
          <FileInput
            accept="image/*"
            id={props.name}
            name={props.name}
            type={props.type}
            {...props.register}
            disabled={props.disabled}
          />
          {props.errMsg && <ErrMsg>{props.errMsg}</ErrMsg>}
        </InputCont>
      ) : (
        <InputCont>
          <label htmlFor={props.name}>{props.label}</label>
          <Textarea
            {...props.register}
            name={props.name}
            cols={10}
            rows={10}
            disabled={props.disabled}
          />
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
          <label id={name} htmlFor={name}>
            {label}
          </label>
          <select {...register} name={name} id={name}>
            <option value="">{placeholder}</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        </InputCont>
      ) : (
        <InputCont>
          <label htmlFor={name}>{label}</label>
          <select disabled={disabled} {...register} name={name} id={name}>
            <option value="">{placeholder}</option>
            <option value="SF">SF</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Comedy">Comedy</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Action">Action</option>
            <option value="Mystery">Mystery</option>
            <option value="Thriller">Thriller</option>
            <option value="none">none</option>
          </select>
          {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
        </InputCont>
      )}
    </>
  );
};

const FileInput = styled.input`
  background-color: red;
`;

const Textarea = styled.textarea`
  padding: 20px;
  font-size: 1rem;
`;
