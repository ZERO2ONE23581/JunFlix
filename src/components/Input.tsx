import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IInputProps {
  label?: string;
  register?: UseFormRegisterReturn;
  name?: string;
  type?: string;
  placeholder?: string;
  errMsg?: string;
  disabled?: boolean;
}

export const Input = (props: IInputProps) => {
  return (
    <>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        disabled={props.disabled}
        {...props.register}
        name={props.name}
        id={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
      {props.errMsg && <Error>{props.errMsg}</Error>}
    </>
  );
};
export const Error = styled.span`
  color: red;
  font-style: italic;
  background-color: bisque;
  text-align: center;
`;
