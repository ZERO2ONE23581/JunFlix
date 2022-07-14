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
  CREATEDAT?: Date;
  UPDATEDAT?: Date;
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
  return (
    <DateCont className="READ-DATE">
      {CREATEDAT && (
        <div className="create">
          <span>{Compute(CREATEDAT?.toString())}</span>
          {!isList && <span>에 작성</span>}
        </div>
      )}
      {UPDATEDAT && (
        <div className="update">
          <span>{Compute(UPDATEDAT?.toString())}</span>
          {!isList && <span>에 업데이트</span>}
        </div>
      )}
    </DateCont>
  );
};
const DateCont = styled.div`
  gap: 7px;
  display: flex;
  flex-direction: column;
  opacity: 0.7;
  text-align: end;
  font-style: italic;
  .create,
  .update {
  }
  .update {
    color: ${(p) => p.theme.color.logo};
  }
`;

export const ComputeLength = ({ watch, type }: any) => {
  return watch(type)?.toString().replace(/\s/gi, '')?.length;
};
