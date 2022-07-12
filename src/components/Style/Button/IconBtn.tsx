import { Svg } from '../Svg/Svg';
import styled from '@emotion/styled';

interface IIconBtnProps {
  size: string;
  svgType: string;
  disabled?: boolean;
  isClicked?: boolean;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}
export const IconBtn = ({
  size,
  type,
  onClick,
  svgType,
  disabled,
  isClicked,
}: IIconBtnProps) => {
  return (
    <Cont
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={svgType}
      isClicked={isClicked}
    >
      <Svg type={svgType} size={size!} />
    </Cont>
  );
};
const Cont = styled.button<{ isClicked?: boolean }>`
  padding: 0;
  border: none;
  outline: none;
  background: none;
  svg {
    fill: ${(p) => p.isClicked && p.theme.color.logo};
    :hover {
      fill: ${(p) => p.theme.color.logo};
    }
  }
`;
