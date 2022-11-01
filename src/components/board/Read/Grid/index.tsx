import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Grid } from '../../../../../styles/global';
import { IBoardType } from '../../../../types/board';
import { avatarLink } from '../../../../Tools/Avatar';
import { ITheme } from '../../../../../styles/theme';
import { hoverVars } from '../../../../../styles/variants';
import { useCapLetters } from '../../../../libs/client/useTools';
import { NoData } from '../../../../Tools/NoData';

interface IBoardsGrid extends ITheme {
  isBoard: boolean;
  boards: IBoardType[];
}

export const BoardsGrid = ({ boards, theme, isBoard }: IBoardsGrid) => {
  const router = useRouter();
  const max = 5;
  const box = boards?.length! > max ? max : boards?.length;
  const postLen = (length: number) =>
    length === 0 ? 1 : length! < 2 ? 2 : length;

  return (
    <>
      {isBoard && (
        <Cont className="board-grid" box={box}>
          {boards.map((board) => (
            <Box
              custom={theme}
              key={board.id}
              variants={hoverVars}
              animate="animate"
              whileHover="hover"
              className="grid-box"
              onClick={() => router.push(`/board/${board.id}/${board.title}`)}
            >
              <Cover box={postLen(board.posts.length)} className="board-cover">
                {board.posts.slice(0, 3)?.map((post) => (
                  <motion.img
                    alt="보드커버"
                    key={post.id}
                    src={avatarLink(post?.post_image)}
                  />
                ))}
                {board.posts.length === 0 && (
                  <motion.img alt="보드커버" src={avatarLink('')} />
                )}
              </Cover>
              <Info className="info">
                <h1>{useCapLetters(board.title)}</h1>
                <div className="post-length">
                  <span>{board.posts.length}</span>
                  <span>Posts</span>
                </div>
              </Info>
            </Box>
          ))}
        </Cont>
      )}
      <NoData _data={{ no_data: !isBoard, theme }} />
    </>
  );
};

const Cont = styled(Grid)`
  margin-top: 3rem;
`;
const Box = styled(motion.div)`
  cursor: pointer;
  max-width: 440px;
  margin: 0 auto;
  img {
    box-shadow: ${(p) => p.theme.boxShadow.nav};
  }
`;
const Cover = styled(Grid)`
  gap: 0;
  overflow: hidden;
  border-radius: 10px;
  img {
  }
`;
const Info = styled.div`
  padding: 1rem;
  font-size: 1.4rem;
  h1 {
    margin-bottom: 8px;
  }
  .post-length {
    font-size: 1.1rem;
    font-style: italic;
    span {
      margin-right: 5px;
    }
  }
`;
