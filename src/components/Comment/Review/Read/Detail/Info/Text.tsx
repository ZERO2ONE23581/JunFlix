import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useCapLetter } from '../../../../../../libs/client/useTools';

interface IText {
  content: string;
  username: string;
}
export const Text = ({ content, username }: IText) => {
  const [text, setText] = useState('');
  const [fold, setFold] = useState(false);
  const Sliced = content?.slice(0, 30) + '...';
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
    <>
      <Cont className="TEXT">
        <div>
          <Name>@{username?.toUpperCase()}</Name>
          <span className="text-content">{useCapLetter(text)}</span>
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
  font-size: 1.2rem;
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
