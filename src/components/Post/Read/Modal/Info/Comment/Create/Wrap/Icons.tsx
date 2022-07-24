import styled from '@emotion/styled';
import { LikeIcon } from '../../../../../../../Style/Icon/Likes/Post';
import { CommentIcon } from '../../../../../../../Style/Icon/Comment/Post';
import { IQuery } from '../../../../../../../../types/global';

export const Icons = ({ query }: IQuery) => {
  return (
    <Cont>
      <LikeIcon query={query} />
      <CommentIcon query={query} />
    </Cont>
  );
};
const Cont = styled.article`
  gap: 2rem;
  display: flex;
  padding: 10px 20px;
  align-items: center;
  .counts {
    top: -8px;
    right: -10px;
    position: absolute;
    font-size: 15px;
    font-weight: 550;
    color: ${(p) => p.theme.color.logo};
  }
`;
