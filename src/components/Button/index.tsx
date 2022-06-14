import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

interface IBtnProps {
  type: 'button' | 'submit' | 'reset';
  name?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Btn = ({ type, name, loading, onClick }: IBtnProps) => {
  //
  return (
    <Button type={type} onClick={onClick}>
      {loading ? 'Loading...' : name}
    </Button>
  );
};
const Button = styled.button`
  border: none;
  width: 100px;
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) => p.theme.color.font};
  &:hover {
    color: whitesmoke;
    background-color: ${(p) => p.theme.color.logo};
  }
`;
