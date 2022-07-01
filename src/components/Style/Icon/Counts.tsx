import styled from '@emotion/styled';
import { Svg } from '../Svg/Svg';

interface ICounts {
  isLikes?: boolean;
  isComment?: boolean;
  LikesCounts?: number;
  CommentCounts?: number;
}
export const Counts = ({
  isLikes,
  isComment,
  LikesCounts,
  CommentCounts,
}: ICounts) => {
  return (
    <Cont>
      {isLikes && (
        <>
          <span>
            <Svg type="like" />
          </span>
          <span className="likes-count">{LikesCounts}</span>
        </>
      )}
      {isComment && (
        <>
          <span>
            <Svg type="comment" />
          </span>
          <span className="comments-count">{CommentCounts}</span>
        </>
      )}
    </Cont>
  );
};
const Cont = styled.div`
  position: relative;
  svg {
    /* width: 2em;
    height: 2em; */
  }
  .comments-count,
  .likes-count {
    top: -20%;
    right: -40%;
    position: absolute;
    font-size: 1.1em;
    font-weight: 500;
    color: ${(p) => p.theme.color.logo};
  }
`;
