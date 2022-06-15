import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

interface IBtnProps {
  clicked?: boolean;
  type: 'button' | 'submit' | 'reset';
  name?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Btn = ({ clicked, type, name, loading, onClick }: IBtnProps) => {
  //
  return (
    <Button clicked={clicked} type={type} onClick={onClick}>
      {loading ? 'Loading...' : name}
    </Button>
  );
};
const Button = styled.button<{ clicked: boolean | undefined }>`
  border: none;
  width: 100px;
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) =>
    p.clicked ? p.theme.color.logo : p.theme.color.font};
  &:hover {
    color: whitesmoke;
    background-color: ${(p) => p.theme.color.logo};
  }
`;
