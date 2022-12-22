import { Cover } from './Cover';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { IPostType } from '../../../../types/post';
import { hoverVars } from '../../../../../styles/variants';
import { Flex, FlexCol } from '../../../../../styles/global';
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
  const router = useRouter();
  const { title, genre, theme, posts, user_id, board_id } = _data;
  const onClick = () => {
    if (!board_id) return router.push(`/user/${user_id}/posts/quick_saved`);
    else return router.push(`/board/${board_id}/${title}`);
  };
  const len = posts.length!;
  const txt = len > 1 ? 'Posts' : 'Post';
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
      <Cover posts={posts} />
      <Info>
        <Title>
          <h1>{useCapLetters(title)}</h1>
          <Svg
            theme={theme}
            item={{ size: '1.6rem' }}
            type={genre ? genre : 'film'}
          />
        </Title>
        <Len>
          <span>{len}</span>
          <span>{txt}</span>
        </Len>
      </Info>
    </Box>
  );
};

const Box = styled(FlexCol)`
  cursor: pointer;
  align-items: flex-start;
`;
const Info = styled(FlexCol)`
  gap: 0.25rem;
  padding: 1rem;
  font-size: 1.4rem;
  align-items: flex-start;
`;
const Title = styled(Flex)`
  justify-content: space-between;
`;
const Len = styled.div`
  font-size: 1.2rem;
  //font-style: italic;
  span {
    margin-right: 5px;
  }
`;
