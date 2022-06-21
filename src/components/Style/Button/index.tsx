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
    <Button clicked={clicked} type={type} onClick={onClick}>
      {loading ? 'Loading...' : name}
    </Button>
  );
};
const Button = styled.button<{ clicked: boolean | undefined }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 1.1rem;
  border-radius: 3px;
  padding: 11px 15px;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) =>
    p.clicked ? p.theme.color.logo : p.theme.color.btn};
  &:hover {
    color: white;
    background-color: ${(p) => p.theme.color.logo};
  }
`;
