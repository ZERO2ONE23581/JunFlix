import { Info } from './Info';
import { Follow } from './Follow';
import styled from '@emotion/styled';
import { NoAvatar } from '../../../../Avatar/NoAvatar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { NoData } from '../../../../Tools/NoData';
import { boxVars, MotionBox } from '../../../../../../styles/global';

interface IItem {
  userId: number;
  boardId: number;
  title: string;
  genre: string;
  avatar: string;
  username: string;
}
export const BoardBox = ({
  title,
  genre,
  avatar,
  userId,
  boardId,
  username,
}: IItem) => {
  const router = useRouter();
  return (
    <MotionBox
      preview=""
      avatar={avatar}
      variants={boxVars}
      initial="initial"
      whileHover="hover"
      className="board-box"
    >
      <Follow userId={userId} boardId={boardId} />
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
    </MotionBox>
  );
};

const MoveBtn = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
`;
