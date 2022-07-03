import styled from '@emotion/styled';
import { Svg } from '../../Svg/Svg';

interface ICommentSvg {
  isComment: boolean;
}
export const CommentSvg = ({ isComment }: ICommentSvg) => {
  return (
    <Cont>
      {isComment ? (
        <Svg type="solid-comment" />
      ) : (
        <Svg type="unsolid-comment" />
      )}
    </Cont>
  );
};
const Cont = styled.div`
  svg {
    width: 2em;
    height: 2em;
  }
`;
