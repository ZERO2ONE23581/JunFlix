import { Cover } from './Cover';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { Cont, Info, Len, Title } from './Box';
import { AnimatePresence } from 'framer-motion';
import { IPostType } from '../../../../types/post';
import { color, redColor } from '../../../../../styles/variants';
import { useCapLetters } from '../../../../libs/client/useTools';

interface IBoardBox {
  _data: {
    title: string;
    genre: string;
    theme: boolean;
    isQS?: boolean;
    user_id?: number;
    board_id: number;
    posts: IPostType[];
  };
}
export const QuickBox = ({ _data }: IBoardBox) => {
  const router = useRouter();
  const { title, genre, theme, posts, user_id, board_id, isQS } = _data;
  const onClick = () => {
    if (!board_id) return router.push(`/user/${user_id}/posts/quick_saved`);
    else return router.push(`/board/${board_id}/${title}`);
  };
  const len = posts?.length!;
  const txt = len > 1 ? 'Posts' : 'Post';
  return (
    <AnimatePresence>
      {isQS && (
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
        </Cont>
      )}
    </AnimatePresence>
  );
};
const vars = {
  exit: () => ({ scale: 0, opacity: 0, transition: { duration: 0.4 } }),
  initial: () => ({ scale: 0, opacity: 0, transition: { duration: 0.4 } }),
  animate: (theme: boolean) => ({
    scale: 1,
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.4 },
  }),
  hover: () => ({ scale: 1.1, color: redColor, transition: { duration: 0.4 } }),
};
