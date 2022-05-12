import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IInputProps {
  label?: string;
  register?: UseFormRegisterReturn;
  name?: string;
  type?: string;
  placeholder?: string;
  loading?: boolean;
  btnName?: string;
  errMsg?: string;
}

export const Input = (props: IInputProps) => {
  return (
    <>
      {props.type !== 'submit' && (
        <>
          <label htmlFor={props.name}>{props.label}</label>
          <input
            {...props.register}
            name={props.name}
            id={props.name}
            type={props.type}
            placeholder={props.placeholder}
          />
          {props.errMsg && <Error>{props.errMsg}</Error>}
        </>
      )}
      {props.type === 'submit' && (
        <button type={props.type}>{props.btnName}</button>
      )}
    </>
  );
};
export const Error = styled.span`
  color: red;
  font-style: italic;
  background-color: bisque;
`;
