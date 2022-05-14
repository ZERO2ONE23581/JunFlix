import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Error } from '../../styles/global';

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
  //
  return (
    <Cont>
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
    </Cont>
  );
};
const Cont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
