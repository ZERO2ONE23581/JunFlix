import { Svg } from '../Svg/Svg';
import styled from '@emotion/styled';

interface IIconBtn {
  size: string;
  svgType: string;
  fill?: string;
  isDisable?: boolean;
  isClicked?: boolean;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}
export const IconBtn = ({
  size,
  type,
  fill,
  onClick,
  svgType,
  isDisable,
  isClicked,
}: IIconBtn) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isDisable}
      className={svgType}
      isClicked={isClicked}
    >
      <Svg type={svgType} size={size!} fill={fill} />
    </Button>
  );
};
const Button = styled.button<{ isClicked?: boolean }>`
  padding: 0;
  border: none;
  outline: none;
  background: none;
  :disabled {
    svg {
      opacity: 0.5;
    }
    pointer-events: none;
  }
  svg {
    fill: ${(p) => p.isClicked && p.theme.color.logo};
  }
`;
