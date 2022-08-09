import styled from '@emotion/styled';
import { MouseEventHandler } from 'react';
import { Svg } from '../Svg';

interface IBtnProps {
  name?: string;
  CLASSNAME?: string;
  disabled?: boolean;
  isUserList?: boolean;
  isClicked?: boolean;
  loading?: boolean | null;
  type: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  svg?: {
    size?: string;
    type?: string;
    location?: {
      left?: boolean;
      right?: boolean;
    };
  };
}

export const Btn = ({
  type,
  name,
  loading,
  onClick,
  isClicked,
  CLASSNAME,
  disabled,
  isUserList,
  svg,
}: IBtnProps) => {
  return (
    <>
      <Button
        type={type}
        onClick={onClick}
        disabled={disabled}
        isClicked={isClicked}
        className={CLASSNAME}
        isUserList={isUserList!}
      >
        {svg?.location?.left && <Svg type={svg.type!} size={svg.size!} />}
        {loading ? 'Loading...' : name}
        {svg?.location?.right && <Svg type={svg.type!} size={svg.size!} />}
      </Button>
    </>
  );
};
export const Button = styled.button<{
  isClicked?: boolean;
  isUserList: boolean;
}>`
  gap: 10px;
  border: none;
  padding: 8px;
  display: flex;
  font-weight: 500;
  font-size: 1.1rem;
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  color: ${(p) => p.theme.color.bg};
  font-weight: ${(p) => p.isClicked && 550};
  color: ${(p) =>
    p.isUserList
      ? p.isClicked
        ? 'white'
        : p.theme.color.font
      : p.theme.color.bg};
  background-color: ${(p) =>
    p.isUserList
      ? p.isClicked
        ? p.theme.color.logo
        : p.theme.color.bg
      : p.theme.color.font};
  border: 2px solid
    ${(p) =>
      p.isUserList
        ? p.isClicked
          ? p.theme.color.logo
          : p.theme.color.font
        : 'none'};
  :hover {
    color: white;
    background-color: ${(p) => p.theme.color.logo};
    svg {
      fill: white;
    }
  }
  svg {
    fill: ${(p) => p.theme.color.font};
  }
`;
