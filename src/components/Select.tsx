import styled from '@emotion/styled';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Error } from '../../styles/global';

interface IInputProps {
  label?: string;
  name?: string;
  errMsg?: string;
  placeholder?: string;
  options?: string[] | any;
  register?: UseFormRegisterReturn;
}

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
    <Cont>
      <label htmlFor={name}>{label}</label>
      <select {...register} name={name} id={name}>
        <option value="x">{placeholder}</option>
        <option value="0">{options[0]}</option>
        <option value="1">{options[1]}</option>
      </select>
      {errMsg && <Error>{errMsg}</Error>}
    </Cont>
  );
};
const Cont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
