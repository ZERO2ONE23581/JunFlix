import styled from '@emotion/styled';
import { TrimText } from '../../../../../../Tools/Trim';
import { IPostType } from '../../../../../../types/post';
import { FlexCol_, Flex_ } from '../../../../../../../styles/global';
import { useCapLetters } from '../../../../../../libs/client/useTools';

interface IDetail {
  post: IPostType;
  isDesk: boolean;
}

export const Detail = ({ post, isDesk }: IDetail) => {
  const { description, title, hashtags, pageLink } = post;
  return (
    <Cont isDesk={isDesk}>
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
const Cont = styled(FlexCol_)`
  gap: 0.2rem;
  align-items: flex-start;
  h1 {
    span {
      font-size: ${(p) => (p.isDesk ? '1.4rem' : '3.8rem')};
    }
  }
  p {
    word-break: break-all;
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.2rem')};
  }
  ul {
    opacity: 0.8;
    font-style: italic;
    color: ${(p) => p.theme.color.logo};
    font-size: ${(p) => (p.isDesk ? '1.3rem' : '2.4rem')};
  }
`;
