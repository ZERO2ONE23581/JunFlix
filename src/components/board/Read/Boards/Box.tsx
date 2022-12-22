import { Cover } from './Cover';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { IPostType } from '../../../../types/post';
import { Flex, FlexCol } from '../../../../../styles/global';
import { color, redColor } from '../../../../../styles/variants';
import { useCapLetters } from '../../../../libs/client/useTools';

interface IBoardBox {
  _boolean: {
    edit: boolean;
    theme: boolean;
  };
  _string: {
    title: string;
    genre: string;
  };
  _id: {
    user_id?: number;
    board_id: number;
  };
  posts: IPostType[];
}
export const BoardBox = ({ _boolean, _string, _id, posts }: IBoardBox) => {
  const router = useRouter();
  const { theme, edit } = _boolean;
  const { title, genre } = _string;
  const { user_id, board_id } = _id;
  const onClick = () => {
    if (!board_id) return router.push(`/user/${user_id}/posts/quick_saved`);
    else return router.push(`/board/${board_id}/${title}`);
  };
  const len = posts?.length!;
  const txt = len > 1 ? 'Posts' : 'Post';
  return (
    <Cont
      custom={theme}
      key={board_id}
      variants={vars}
      onClick={onClick}
      exit="exit"
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <Cover posts={posts} edit={edit} />
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
    </Cont>
  );
};

export const Cont = styled(FlexCol)`
  cursor: pointer;
  align-items: flex-start;
`;
export const Info = styled(FlexCol)`
  gap: 0.25rem;
  padding: 1rem;
  font-size: 1.4rem;
  align-items: flex-start;
`;
export const Title = styled(Flex)`
  justify-content: space-between;
`;
export const Len = styled.div`
  font-size: 1.2rem;
  span {
    margin-right: 5px;
  }
`;
const vars = {
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.4 },
  }),
  exit: () => ({ scale: 0, opacity: 0, transition: { duration: 0.4 } }),
  initial: () => ({ scale: 0, opacity: 0, transition: { duration: 0.4 } }),
  hover: () => ({ scale: 1.1, color: redColor, transition: { duration: 0.4 } }),
};
