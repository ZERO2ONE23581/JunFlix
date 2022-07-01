import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

interface IBtnProps {
  name?: string;
  CLASSNAME?: string;
  isClicked?: boolean;
  loading?: boolean | null;
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Btn = ({
  type,
  name,
  loading,
  onClick,
  isClicked,
  CLASSNAME,
}: IBtnProps) => {
  return (
    <>
      <Button
        type={type}
        isClicked={isClicked}
        onClick={onClick}
        className={CLASSNAME}
      >
        {loading ? 'Loading...' : name}
      </Button>
    </>
  );
};
export const Button = styled.button<{ isClicked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  //
  border: none;
  font-size: 1rem;
  padding: 11px 15px;
  border-radius: 3px;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) =>
    p.isClicked ? p.theme.color.logo : p.theme.color.font};
  &:hover {
    color: white;
    background-color: ${(p) => p.theme.color.logo};
  }
`;
