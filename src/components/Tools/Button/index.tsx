import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { Svg } from '../Svg';

interface IBtnProps {
  name?: string;
  CLASSNAME?: string;
  disabled?: boolean;
  isClicked?: boolean;
  loading?: boolean | null;
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  svg?: string;
  size?: string;
}

export const Btn = ({
  type,
  name,
  loading,
  onClick,
  isClicked,
  CLASSNAME,
  disabled,
  svg,
  size,
}: IBtnProps) => {
  return (
    <>
      <Cont
        type={type}
        onClick={onClick}
        disabled={disabled}
        isClicked={isClicked}
        className={CLASSNAME}
      >
        {loading ? 'Loading...' : name}
        {svg && <Svg type={svg} size={size!} />}
      </Cont>
    </>
  );
};
export const Cont = styled.button<{ isClicked?: boolean }>`
  gap: 15px;
  border: none;
  padding: 8px;
  display: flex;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.color.bg};
  background-color: ${(p) =>
    p.isClicked ? p.theme.color.logo : p.theme.color.font};
  &:hover {
    color: white;
    background-color: ${(p) => p.theme.color.logo};
    svg {
      fill: white;
    }
  }
  svg {
    fill: ${(p) => p.theme.color.font};
  }
  .edit {
    margin-bottom: 3px;
  }
`;
