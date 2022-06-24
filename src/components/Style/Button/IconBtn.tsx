import { Svg } from '../Svg/Svg';
import styled from '@emotion/styled';

interface IIconBtnProps {
  svgType: string;
  isClicked?: boolean;
  onClick: () => void;
}
export const IconBtn = ({ svgType, onClick, isClicked }: IIconBtnProps) => {
  return (
    <Cont className="icon-btn" isClicked={isClicked}>
      <button type="button" onClick={onClick}>
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
