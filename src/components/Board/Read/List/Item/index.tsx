import { Info } from './Info';
import { OnAir } from './OnAir';
import styled from '@emotion/styled';
import { NoAvatar } from '../../../../Avatar/NoAvatar';
import { AVATAR_BG } from '../../../../../../styles/global';

interface IItem {
  userId: number;
  boardId: number;
  title: string;
  genre: string;
  avatar: string;
  username: string;
}
export const Item = ({
  userId,
  boardId,
  title,
  genre,
  avatar,
  username,
}: IItem) => {
  return (
    <Cont key={boardId} avatar={avatar} className="board">
      <OnAir userId={userId} boardId={boardId} />
      <NoAvatar genre={genre} avatar={avatar} />
      <Info
        title={title}
        genre={genre}
        userId={userId}
        avatar={avatar}
        username={username}
      />
    </Cont>
  );
};
const Cont = styled(AVATAR_BG)`
  display: flex;
  position: relative;
  border-radius: 5px;
  flex-direction: column;
  justify-content: space-between;
`;
