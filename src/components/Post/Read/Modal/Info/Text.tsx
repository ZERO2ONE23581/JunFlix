import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { CapFirstLetter, ReadDate } from '../../../../Tools';

interface IText {
  date: {
    createdAt: Date;
    updatedAt: Date;
  };
  content: string;
  username: string;
  sliceFrom: number;
}
export const PostText = ({ date, content, username, sliceFrom }: IText) => {
  const [text, setText] = useState('');
  const [fold, setFold] = useState(false);
  const Sliced = content?.slice(0, sliceFrom) + '...';
  const [isLongLength, setIsLongLength] = useState(false);
  useEffect(() => {
    const Length = content?.length;
    if (Length! >= 50) {
      setText(Sliced?.toString());
      setFold(true);
      setIsLongLength(true);
    } else {
      setText(content);
      setFold(false);
      setIsLongLength(false);
    }
  }, [content, setText, setFold]);

  const handleClick = (type: string) => {
    if (type === 'unfold') {
      setFold(false);
      setText(content);
    }
    if (type === 'fold') {
      setFold(true);
      setText(Sliced?.toString());
    }
  };
  return (
    <Cont>
      <span className="username">@{username?.toUpperCase()}</span>
      <span className="text-content">{CapFirstLetter(text)}</span>
      {isLongLength && (
        <span>
          {fold && (
            <More type="button" onClick={() => handleClick('unfold')}>
              더보기
            </More>
          )}
          {!fold && (
            <More type="button" onClick={() => handleClick('fold')}>
              접기
            </More>
          )}
        </span>
      )}
      <ReadDate CREATEDAT={date?.createdAt} UPDATEDAT={date?.updatedAt} />
    </Cont>
  );
};
const Cont = styled.article`
  span {
    line-height: 22px;
    word-break: break-word;
  }
  .username {
    font-weight: 400;
    font-style: italic;
    margin-right: 7px;
  }
`;
const More = styled.button`
  border: none;
  font-style: italic;
  background-color: inherit;
  text-decoration: underline;
  color: ${(p) => p.theme.color.logo};
`;
