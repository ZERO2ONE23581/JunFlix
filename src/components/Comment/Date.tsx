import styled from '@emotion/styled';
import { ComputeDate } from '../Tools';

interface IDate {
  CREATEDAT: Date;
}
export const Date = ({ CREATEDAT }: IDate) => {
  return (
    <>
      <Cont>
        <span>{ComputeDate(CREATEDAT?.toString())}</span>
        <span>에 작성된 댓글</span>
      </Cont>
    </>
  );
};
const Cont = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: end;
  opacity: 0.7;
  font-size: 1rem;
  font-style: italic;
`;
