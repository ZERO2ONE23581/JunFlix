import styled from '@emotion/styled';
import { FlexCol } from '../../styles/global';

interface IReadDate {
  createdAt: Date | null;
  updatedAt: Date | null;
}
export const ReadDate = ({ createdAt, updatedAt }: IReadDate) => {
  const Compute = (date: string) => {
    const NewDate = new Date(date);
    const Year = NewDate.getFullYear().toString();
    const Month = NewDate.getMonth() + 1;
    const TheDate = NewDate.getDate();
    const Hour = NewDate.getHours();
    const Minute = NewDate.getMinutes();
    return `${Year.slice(2, 4)}년 ${Month}월 ${TheDate}일 ${Hour}:${Minute}`;
  };
  const CreatedAt = Compute(createdAt?.toString()!);
  const UpdatedAt = Compute(updatedAt?.toString()!);
  const isUpdated = !Boolean(CreatedAt === UpdatedAt);

  const isCreate = createdAt && CreatedAt;
  const isUpdate = updatedAt && UpdatedAt && isUpdated;
  return (
    <Cont className="read-date">
      {!UpdatedAt && (
        <div className="create">
          <span>{CreatedAt}</span>
          <span>작성</span>
        </div>
      )}
      <div className="update">
        <span>{UpdatedAt}</span>
        <span>수정</span>
      </div>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  gap: 5px;
  font-size: 1rem;
  /* width: 100%; */
  font-style: italic;
  //border: 1px solid yellow;
  span {
    margin-right: 3px;
  }
  .create {
    opacity: 0.7;
  }
  .update {
    opacity: 0.9;
    color: #d63031;
  }
`;
