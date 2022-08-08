import { Info } from './Info';
import { OnAir } from './OnAir';
import styled from '@emotion/styled';
import { NoAvatar } from '../../../../Avatar/NoAvatar';
import { AVATAR_BG } from '../../../../Avatar';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  return (
    <Cont key={boardId} avatar={avatar} className="board" preview="">
      <OnAir userId={userId} boardId={boardId} />
      <MoveBtn
        onClick={() => router.push(`/user/${userId}/board/${boardId}/${title}`)}
      />
      <Link href={`/user/${userId}/board/${boardId}/${title}`}>
        <a>
          <NoAvatar genre={genre} avatar={avatar} />
          <Info
            title={title}
            genre={genre}
            userId={userId}
            avatar={avatar}
            username={username}
          />
        </a>
      </Link>
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
const MoveBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
`;
