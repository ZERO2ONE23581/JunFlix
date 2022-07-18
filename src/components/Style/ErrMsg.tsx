import styled from '@emotion/styled';

interface IErrorMsgProps {
  error?: string;
}

export const ErrorMsg = ({ error }: IErrorMsgProps) => {
  return (
    <Cont className="error-msg">
      <span>{error}</span>
    </Cont>
  );
};
const Cont = styled.div`
  color: #e84118;
  font-size: 1rem;
  font-weight: 700;
  font-style: italic;
  text-align: center;
  background-color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  span {
    display: block;
  }
`;
