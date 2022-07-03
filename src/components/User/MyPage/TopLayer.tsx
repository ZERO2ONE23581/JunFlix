import { Profile } from './Profile';
import { FollowingBoards } from './FollowingBoards';
import styled from '@emotion/styled';

export const TopLayer = () => {
  return (
    <Cont>
      <Profile />
      <FollowingBoards />
    </Cont>
  );
};
const Cont = styled.article`
  gap: 2em;
  display: flex;
  align-items: center;
  > article {
    min-height: 240px;
    border-radius: 5px;
    border: ${(p) => p.theme.border.thick};
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
`;
