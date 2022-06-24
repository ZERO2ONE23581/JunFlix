import styled from '@emotion/styled';
import { FollowCounts } from '../Follow/counts';

export const Description = ({ board }: any) => {
  return (
    <>
      <Cont>
        <FollowCounts counts={board?._count} />
        <ul>
          <li>
            <span className="item">보드장르:</span>
            <span className="dim">"{board?.genre}"</span>
          </li>
          <li>
            <span className="item">소개:</span>
            {board?.intro && <p className="dim intro">"{board?.intro}"</p>}
          </li>
        </ul>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  .follow-counts {
    margin: 10px auto;
  }
  ul {
    li {
      gap: 5px;
      display: flex;
      margin-bottom: 8px;
      align-items: center;
      padding-bottom: 5px;
      border-bottom: 1px dotted ${(p) => p.theme.color.font};
      .dim {
        font-size: 1.3rem;
      }
      .intro {
        font-style: italic;
      }
    }
  }
`;
