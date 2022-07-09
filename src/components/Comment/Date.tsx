import styled from '@emotion/styled';
import { ComputeDate } from '../Tools';

interface IDate {
  CREATEDAT: Date;
}
export const Date = ({ CREATEDAT }: IDate) => {
  return (
    <>
      <Cont className="created-at">
        <span>{ComputeDate(CREATEDAT?.toString())}</span>
        <span>에 작성됨</span>
      </Cont>
    </>
  );
};
const Cont = styled.div`
  padding-top: 5px;
  opacity: 0.7;
  text-align: end;
  font-style: italic;
  span {
    margin-right: 5px;
  }
`;
