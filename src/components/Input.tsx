import { ErrMsg } from '../../styles/defaultStyle';
import { InputCont } from '../../styles/inputStyle';
import { IInputProps } from '../types/input';

export const Input = (props: IInputProps) => {
  return (
    <InputCont>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        {...props.register}
        disabled={props.disabled}
        name={props.name}
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
      {props.errMsg && <ErrMsg>{props.errMsg}</ErrMsg>}
    </InputCont>
  );
};

export const Select = ({
  options,
  label,
  name,
  errMsg,
  placeholder,
  register,
}: IInputProps) => {
  //
  return (
    <InputCont>
      <label htmlFor={name}>{label}</label>
      <select {...register} name={name} id={name}>
        <option value="">{placeholder}</option>
        <option value="Male">{options[0]}</option>
        <option value="Female">{options[1]}</option>
      </select>
      {errMsg && <ErrMsg>{errMsg}</ErrMsg>}
    </InputCont>
  );
};
