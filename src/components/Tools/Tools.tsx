import styled from '@emotion/styled';

export const CapFirstLetters = (word: string) => {
  return word?.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};
export const CapFirstLetter = (word: string) => {
  return `${
    word?.toString()?.slice(0, 1).toUpperCase() + word?.toString().slice(1)
  }`;
};

interface IReadDate {
  isList?: boolean;
  CREATEDAT?: Date | null;
  UPDATEDAT?: Date | null;
}
export const ReadDate = ({ CREATEDAT, UPDATEDAT, isList }: IReadDate) => {
  const Compute = (date: string) => {
    const NewDate = new Date(date);
    const Year = NewDate.getFullYear().toString();
    const Month = NewDate.getMonth() + 1;
    const TheDate = NewDate.getDate();
    const Hour = NewDate.getHours();
    const Minute = NewDate.getMinutes();
    return `${Year.slice(2, 4)}년 ${Month}월 ${TheDate}일 ${Hour}:${Minute}`;
  };
  const isUpdate = Boolean(
    Compute(CREATEDAT?.toString()!) !== Compute(UPDATEDAT?.toString()!)
  );
  return (
    <Container className="read-date" isList={isList}>
      <span className="create">
        {CREATEDAT && <span>{Compute(CREATEDAT?.toString()!)}</span>}
        {!isList && <span>작성</span>}
      </span>
      <span className="update">
        {UPDATEDAT && isUpdate && (
          <span>{Compute(UPDATEDAT?.toString()!)}</span>
        )}
        {!isList && <span>수정</span>}
      </span>
    </Container>
  );
};
const Container = styled.article<{ isList?: boolean }>`
  margin-left: 10px;
  font-size: 0.8rem;
  font-style: italic;
  display: inline-block;
  display: ${(p) => p.isList && 'flex'};
  gap: 3px;
  align-items: center;
  flex-direction: column;
  justify-content: center;

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
export const Length = (watch: string | undefined) => {
  if (watch) return watch.toString().replace(/\s/gi, '').length;
};
