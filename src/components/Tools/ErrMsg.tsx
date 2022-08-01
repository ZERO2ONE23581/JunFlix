import { Svg } from './Svg';
import styled from '@emotion/styled';

interface IErrorMsgProps {
  type?: string;
  error?: string;
}
export const ErrorMsg = ({ type, error }: IErrorMsgProps) => {
  return (
    <Cont className={type}>
      <span>
        <Svg type="warn" size="2rem" />
      </span>
      <span>{error}</span>
    </Cont>
  );
};
const Cont = styled.div`
  top: 50%;
  left: 50%;
  z-index: 100;
  position: fixed;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #d63031;
  span {
    font-size: 1.4em;
    margin-right: 20px;
    svg {
      fill: white;
      margin-top: 4px;
      pointer-events: none;
    }
  }
`;
