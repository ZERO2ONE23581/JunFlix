import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { CapFirstLetter } from '../../../Tools';

interface IText {
  Content: string;
  Username: string;
  CreatedAt: Date;
}
export const ReviewText = ({ Content, Username, CreatedAt }: IText) => {
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
      <Cont className="TEXT">
        <div>
          <Name>@{Username?.toUpperCase()}</Name>
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
        </div>
      </Cont>
    </>
  );
};
const Cont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1rem;
  div {
    display: inline;
    span {
      line-height: 20px;
      word-break: break-word;
    }
  }
  .created-at {
    font-size: 0.9rem;
  }
`;
const Name = styled.span`
  font-weight: 400;
  font-style: italic;
  margin-right: 7px;
`;
const More = styled.button`
  border: none;
  font-style: italic;
  text-decoration: underline;
  background-color: inherit;
  color: ${(p) => p.theme.color.logo};
`;
