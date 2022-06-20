import styled from '@emotion/styled';

interface IErrorMsgProps {
  error: string;
}

export const ErrorMsg = ({ error }: IErrorMsgProps) => {
  return (
    <Cont>
      <span>{error}</span>
    </Cont>
  );
};
const Cont = styled.div`
  color: #e84118;
  /* margin: 20px; */
  font-size: 1.2rem;
  line-height: 25px;
  font-weight: 700;
  font-style: italic;
  text-align: center;
  background-color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
  span {
    display: block;
    margin-bottom: 5px;
  }
`;
