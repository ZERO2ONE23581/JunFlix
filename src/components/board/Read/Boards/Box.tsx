import { Cover } from './Cover';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { IPostType } from '../../../../types/post';
import { Flex } from '../../../../../styles/global';
import { hoverVars } from '../../../../../styles/variants';
import { useCapLetters } from '../../../../libs/client/useTools';

interface IBoardsGridBox {
  _data: {
    title: string;
    genre: string;
    theme: boolean;
    user_id?: number;
    board_id: number;
    posts: IPostType[];
  };
}
export const GridBox = ({ _data }: IBoardsGridBox) => {
  const title = _data?.title!;
  const genre = _data?.genre!;
  const theme = _data?.theme!;
  const posts = _data?.posts!;
  const user_id = _data?.user_id!;
  const board_id = _data?.board_id!;
  //
  const router = useRouter();
  const onClick = () => {
    if (!board_id) return router.push(`/user/${user_id}/posts/quick_saved`);
    else return router.push(`/board/${board_id}/${title}`);
  };
  return (
    <Box
      custom={theme}
      key={board_id}
      onClick={onClick}
      animate="animate"
      whileHover="hover"
      className="grid_box"
      variants={hoverVars}
    >
      <Cover theme={theme} posts={posts} />
      <Info className="info">
        <Flex className="flex-wrap">
          <h1>{useCapLetters(title)}</h1>
          <Svg
            theme={theme}
            item={{ size: '1.6rem' }}
            type={genre ? genre : 'film'}
          />
        </Flex>
        <div className="post-length">
          <span>{posts.length}</span>
          <span>Posts</span>
        </div>
      </Info>
    </Box>
  );
};
const Box = styled(motion.div)`
  cursor: pointer;
  .board_cover {
    width: 100%;
    //height: 100%;
    height: 16rem;
    //min-width: 16rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
const Info = styled.div`
  height: 5rem;
  padding: 1rem;
  font-size: 1.4rem;
  h1 {
    margin-bottom: 8px;
  }
  .flex-wrap {
    justify-content: space-between;
  }
  .post-length {
    font-size: 1.1rem;
    font-style: italic;
    span {
      margin-right: 5px;
    }
  }
`;
