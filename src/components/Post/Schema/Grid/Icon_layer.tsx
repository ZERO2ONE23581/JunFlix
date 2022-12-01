import { Icons } from './Icons';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { Layer_ } from '../../../../../styles/global';
import { color } from '../../../../../styles/variants';
import { useUser } from '../../../../libs/client/useUser';
import { useCapLetters } from '../../../../libs/client/useTools';

interface IIconLayer {
  _data: {
    theme: boolean;
    setMax: Dispatch<SetStateAction<number>>;
  };
}
export const IconLayer = ({ _data }: IIconLayer) => {
  const router = useRouter();
  const { theme, setMax } = _data;
  const { user_id } = router.query;
  const { user_id: id, username, userId } = useUser();
  const isMeHost = Boolean(Number(user_id) === id);
  const isQS = Boolean(router.asPath.includes('quick_saved'));
  const onMyPage = () => router.push(`/user/${id}/${username}/page`);
  const MyPostsPage = Boolean(
    !isQS && router.asPath.includes('posts') && isMeHost
  );
  return (
    <Cont className="icon_layer">
      <div />
      <div>
        {isQS && (
          <h1>
            <span>Quick Saved</span>
            <motion.span
              variants={vars}
              animate="animate"
              initial="initial"
              className="small"
              whileHover="hover"
              onClick={onMyPage}
              custom={{ theme, isBig: false }}
            >
              (@{userId})
            </motion.span>
          </h1>
        )}
        {MyPostsPage && (
          <h1>
            <motion.span
              variants={vars}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="username"
              onClick={onMyPage}
              custom={{ theme, isBig: true }}
            >
              {useCapLetters(username!)}
            </motion.span>
            <span>'s Posts</span>
          </h1>
        )}
      </div>
      <div>
        <Icons _data={{ theme, setMax }} />
      </div>
    </Cont>
  );
};
const Cont = styled(Layer_)`
  padding: 0;
  position: relative;
  > div {
    .username,
    .small {
      cursor: pointer;
    }
    .small {
      font-size: 1rem;
      margin-left: 0.5rem;
    }
    :nth-of-type(2) {
      h1 {
        font-size: 1.6rem;
      }
    }
  }
`;
const vars = {
  initial: ({ theme, isBig }: any) => ({
    fontSize: isBig ? '1.6rem' : '1rem',
    color: color(theme),
    transition: { duration: 0.5 },
  }),
  animate: ({ theme, isBig }: any) => ({
    fontSize: isBig ? '1.6rem' : '1rem',
    color: color(theme),
    transition: { duration: 0.5 },
  }),
  hover: ({ isBig }: any) => ({
    fontSize: isBig ? '1.7rem' : '1.1rem',
    color: '#E50914',
    transition: { duration: 0.5 },
  }),
};
