import { UseFormRegisterReturn } from 'react-hook-form';

interface IInputProps {
  register?: UseFormRegisterReturn;
  name?: string;
  type?: string;
  placeholder?: string;
  loading?: boolean;
  btnName?: string;
}

export const Input = (props: IInputProps) => {
  return (
    <>
      {props.type !== 'submit' && (
        <input
          {...props.register}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
        />
      )}
      {props.type === 'submit' && (
        <button type={props.type}>{props.btnName}</button>
      )}
    </>
  );
};
