import styled from '@emotion/styled';

export const ErrorMsg = ({ error }: any) => {
  return (
    <Cont>
      <span>{error}</span>
    </Cont>
  );
};
const Cont = styled.div`
  color: #e84118;
  margin-top: 20px;
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
