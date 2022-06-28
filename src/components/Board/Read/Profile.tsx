import styled from '@emotion/styled';
import { ProfileAvatar } from '../../Avatar/Profile';
import { IBoardWithAttrs } from '../../../types/board';

interface IProfileProps {
  board?: IBoardWithAttrs;
}
export const Profile = ({ board }: IProfileProps) => {
  return (
    <Cont>
      <ProfileAvatar url={board?.user.avatar} size={120} />
      <span>@ {board?.user.username}</span>
    </Cont>
  );
};
const Cont = styled.article`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
