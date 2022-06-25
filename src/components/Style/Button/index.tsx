import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

interface IBtnProps {
  clicked?: boolean;
  type: 'button' | 'submit' | 'reset';
  name?: string;
  loading?: boolean | null;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Btn = ({ clicked, type, name, loading, onClick }: IBtnProps) => {
  return (
    <Button
      type={type}
      clicked={clicked}
      onClick={onClick}
      className="btn-style"
    >
      {loading ? 'Loading...' : name}
    </Button>
  );
};
const Button = styled.button<{ clicked?: boolean }>`
  border: none;
  display: flex;
  font-size: 1rem;
  padding: 11px 15px;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) =>
    p.clicked ? p.theme.color.logo : p.theme.color.font};
  &:hover {
    color: white;
    background-color: ${(p) => p.theme.color.logo};
  }
`;
