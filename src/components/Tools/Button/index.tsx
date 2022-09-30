import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { MouseEventHandler } from 'react';
import { Svg } from '../Svg';

interface IBtnProps {
  name?: string;
  CLASSNAME?: string;
  disabled?: boolean;
  isuserlist?: boolean;
  isclicked?: boolean;
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
  isclicked,
  CLASSNAME,
  disabled,
  isuserlist,
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
        isclicked={isclicked}
        className={CLASSNAME}
        isuserlist={isuserlist!}
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
  isclicked?: boolean;
  isuserlist: boolean;
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
  font-weight: ${(p) => p.isclicked && 550};
  color: ${(p) =>
    p.isuserlist
      ? p.isclicked
        ? 'white'
        : p.theme.color.font
      : p.theme.color.bg};
  background-color: ${(p) =>
    p.isuserlist
      ? p.isclicked
        ? p.theme.color.logo
        : p.theme.color.bg
      : p.theme.color.font};
  border: 2px solid
    ${(p) =>
      p.isuserlist
        ? p.isclicked
          ? p.theme.color.logo
          : p.theme.color.font
        : 'none'};
  opacity: ${(p) => p.isclicked && '0.9'};
  color: ${(p) => p.isclicked && 'white'};
  background-color: ${(p) => p.isclicked && p.theme.color.logo};
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
