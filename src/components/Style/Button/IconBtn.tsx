import { Svg } from '../Svg/Svg';
import styled from '@emotion/styled';

interface IIconBtnProps {
  svgType: string;
  disabled?: boolean;
  isClicked?: boolean;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}
export const IconBtn = ({
  type,
  svgType,
  onClick,
  isClicked,
  disabled,
}: IIconBtnProps) => {
  return (
    <Cont className={svgType} isClicked={isClicked}>
      <button type={type} onClick={onClick} disabled={disabled}>
        <Svg type={svgType} />
      </button>
    </Cont>
  );
};
const Cont = styled.div<{ isClicked?: boolean }>`
  button {
    border: none;
    outline: none;
    background: none;
    svg {
      fill: ${(p) => p.isClicked && p.theme.color.logo};
    }
  }
`;
