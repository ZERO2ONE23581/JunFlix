import { Svg } from '../Svg/Svg';
import styled from '@emotion/styled';

interface IIconBtnProps {
  svgType: string;
  isClicked?: boolean;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}
export const IconBtnFixed = ({
  type,
  svgType,
  onClick,
  isClicked,
}: IIconBtnProps) => {
  return (
    <Cont className={svgType} isClicked={isClicked}>
      <button type={type} onClick={onClick}>
        <Svg type={svgType} />
      </button>
    </Cont>
  );
};
const Cont = styled.div<{ isClicked?: boolean }>`
  right: 5%;
  bottom: 10%;
  position: fixed;
  button {
    border: none;
    outline: none;
    background: none;
    svg {
      width: 40px;
      height: 40px;
      fill: ${(p) => p.isClicked && p.theme.color.logo};
    }
  }
`;
