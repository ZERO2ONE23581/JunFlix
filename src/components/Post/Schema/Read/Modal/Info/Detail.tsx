import styled from '@emotion/styled';
import { IGetPostType } from '../../../../../../types/post';
import { Flex } from '../../../../../../../styles/global';
import { TrimText } from '../../../../../../Tools/Trim';
import { useCapLetters } from '../../../../../../libs/client/useTools';

export const Detail = ({ post }: IGetPostType) => {
  const { description, title, hashtags, pageLink } = post;
  return (
    <Cont className="detail">
      <h1 className="title">
        <TrimText text={useCapLetters(title)} max={30} />
      </h1>
      <p>
        <TrimText text={description!} max={500} />
      </p>
      <ul>
        {hashtags && (
          <li>
            <span className="hashtags">{hashtags}</span>
          </li>
        )}
        {pageLink && (
          <li>
            <span>Link:</span>
            <span>{pageLink}</span>
          </li>
        )}
      </ul>
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
