import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { CapFirstLetter, ReadDate } from '../../Tools';

interface IText {
  Content: string;
  Username: string;
  CreatedAt: Date;
}
export const PostText = ({ Content, Username, CreatedAt }: IText) => {
  const [text, setText] = useState('');
  const [fold, setFold] = useState(false);
  const Sliced = Content?.slice(0, 30) + '...';
  const [isLongLength, setIsLongLength] = useState(false);

  useEffect(() => {
    const Length = Content?.length;
    if (Length! >= 50) {
      setText(Sliced?.toString());
      setFold(true);
      setIsLongLength(true);
    } else {
      setText(Content);
      setFold(false);
      setIsLongLength(false);
    }
  }, [Content, setText, setFold]);

  const handleClick = (type: string) => {
    if (type === 'unfold') {
      setFold(false);
      setText(Content);
    }
    if (type === 'fold') {
      setFold(true);
      setText(Sliced?.toString());
    }
  };
  return (
    <>
      <Cont>
        <span className="username">@{Username?.toUpperCase()}</span>
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
        <ReadDate CREATEDAT={CreatedAt} />
      </Cont>
    </>
  );
};
const Cont = styled.div`
  padding-top: 5px;
  span {
    line-height: 20px;
    word-break: break-word;
  }
  .username {
    font-weight: 400;
    font-style: italic;
    margin-right: 7px;
  }
  .READ-DATE {
    display: inline-block;
    margin-left: 5px;
    span {
      font-size: 0.9em;
    }
  }
`;
const More = styled.button`
  border: none;
  font-style: italic;
  text-decoration: underline;
  background-color: inherit;
  color: ${(p) => p.theme.color.logo};
`;
