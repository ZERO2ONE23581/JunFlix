import styled from '@emotion/styled';
import { motion } from 'framer-motion';
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
    fill?: string;
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
        variants={{
          hover: {
            backgroundColor: '#E50914',
            transition: {
              delay: 0.3,
              duration: 0.3,
            },
          },
        }}
        //
        type={type}
        onClick={onClick}
        disabled={disabled}
        isClicked={isClicked}
        className={CLASSNAME}
        isUserList={isUserList!}
      >
        {svg?.location?.left && (
          <Svg type={svg.type!} size={svg.size!} fill={svg?.fill} />
        )}
        {loading ? 'Loading...' : name}
        {svg?.location?.right && (
          <Svg type={svg.type!} size={svg.size!} fill={svg?.fill} />
        )}
      </Button>
    </>
  );
};
export const Button = styled(motion.button)<{
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
  opacity: ${(p) => p.isClicked && '0.9'};
  color: ${(p) => p.isClicked && 'white'};
  background-color: ${(p) => p.isClicked && p.theme.color.logo};
  :hover {
    color: white;
    background-color: ${(p) => p.theme.color.logo};
    svg {
      fill: white;
    }
  }
  svg {
    /* fill: ${(p) => p.theme.color.font}; */
  }
`;
