import styled from '@emotion/styled';
import { Flex } from '../../../../../../styles/global';
import { TrimText } from '../../../../../Tools/trimText';
import { useCapLetters } from '../../../../../libs/client/useTools';

interface IDetail {
  _post: {
    desc: string;
    title: string;
    hashtags: string;
    pageLink: string;
  };
}
export const Detail = ({ _post }: IDetail) => {
  const desc = _post?.desc!;
  const title = _post?.title!;
  const hash = _post?.hashtags!;
  const link = _post?.pageLink!;
  const isHashLink = Boolean(hash || link);
  //
  return (
    <Cont className="detail">
      <h1 className="title">
        <TrimText text={useCapLetters(title)} max={30} />
      </h1>
      <p>
        <TrimText text={desc} max={500} />
      </p>
      {isHashLink && (
        <ul>
          {hash && (
            <li>
              <span className="hash">{hash}</span>
            </li>
          )}
          {link && (
            <li>
              <span>Website:</span>
              <span>{link}</span>
            </li>
          )}
        </ul>
      )}
    </Cont>
  );
};
const Cont = styled(Flex)`
  form {
    height: fit-content;
  }
  gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  h1 {
    span {
      font-size: 1.4rem;
    }
  }
  p {
    font-size: 1.2rem;
    word-break: break-all;
  }
  ul {
    font-size: 1.05rem;
    font-style: italic;
    li {
      .hash {
        color: ${(p) => p.theme.color.logo};
      }
      span {
        line-height: 15px;
      }
    }
  }
`;
