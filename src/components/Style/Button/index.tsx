import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';

interface IBtnProps {
  name?: string;
  CLASSNAME?: string;
  disabled?: boolean;
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
  disabled,
}: IBtnProps) => {
  return (
    <>
      <Button
        disabled={disabled}
        type={type}
        onClick={onClick}
        isClicked={isClicked}
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
