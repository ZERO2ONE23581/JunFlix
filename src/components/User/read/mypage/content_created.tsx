import useSWR from 'swr';
import { useState } from 'react';
import styled from '@emotion/styled';
import { IGetPosts } from '../../../../types/post';
import useUser from '../../../../libs/client/useUser';
import { AnimatePresence, motion } from 'framer-motion';
import { BtnWrap, Flex, Grid } from '../../../../../styles/global';
import { useCapLetter, useCapLetters } from '../../../../libs/client/useTools';
import {
  color,
  SpringTrans,
  TransBorderVar,
} from '../../../../../styles/variants';
import { Svg } from '../../../../Tools/Svg';
import { PostGrid } from '../../../post/read/post_grid';
import { useRouter } from 'next/router';

export const Created = ({ selected, theme }: any) => {
  const created_type = ['boards', 'posts', 'reviews'];
  const [clicked, setClicked] = useState('');
  const { data } = useSWR<IGetPosts>(`/api/post/all`);
  const router = useRouter();
  const { user_id } = router.query;
  const host_id = Number(user_id);
  const posts = data?.posts?.filter((e) => e.host_id === host_id);
  const open = Boolean(selected === 'created');
  const boards = [1, 2, 3, 4];
  const reviews = [1, 2, 3, 4];
  const isPosts = Boolean(clicked === 'posts');
  const isBoards = Boolean(clicked === 'boards');
  const isReviews = Boolean(clicked === 'reivews');
  //
  return (
    <AnimatePresence>
      {open && (
        <>
          {!clicked && (
            <MyCreated className="create-grid" size={created_type.length}>
              {created_type.map((e) => (
                <Box
                  className="box"
                  exit="exit"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  custom={theme}
                  variants={boxVar}
                  transition={SpringTrans}
                  key={created_type.indexOf(e)}
                  onClick={() => setClicked(e)}
                >
                  <Cover
                    exit="exit"
                    animate="animate"
                    initial="initial"
                    whileHover="hover"
                    custom={theme}
                    variants={coverVar}
                    transition={SpringTrans}
                  >
                    <img src="/img/1.jpg" alt="test" />
                  </Cover>
                  <Info>
                    <h2>{`All ${useCapLetter(e)}`}</h2>
                  </Info>
                </Box>
              ))}
            </MyCreated>
          )}
          {clicked && (
            <Btns>
              <Svg
                type="left-chev"
                theme={theme}
                item={{ size: '1.2rem' }}
                onClick={() => setClicked('boards')}
              />
              <h3 onClick={() => setClicked('')}>
                <span>{`All ${useCapLetters(clicked)}`}</span>
                <div className="line" />
              </h3>
              <Svg
                type="right-chev"
                theme={theme}
                item={{ size: '1.2rem' }}
                onClick={() => setClicked('reviews')}
              />
            </Btns>
          )}
          {isPosts && <PostGrid theme={theme} posts={posts!} />}
        </>
      )}
    </AnimatePresence>
  );
};
const MyPosts = styled(Grid)``;
const MyCreated = styled(Grid)``;
const Box = styled(Flex)`
  gap: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
`;
const PostBox = styled(Flex)`
  gap: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
const Cover = styled(motion.div)`
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  img {
    width: 100%;
    height: 100%;
  }
`;
const Info = styled(Flex)`
  padding: 10px 0;
  gap: 0;
  flex-wrap: wrap;
  h2 {
    font-weight: 400;
    font-size: 1.3rem;
  }
  ul {
    li {
    }
  }
`;
const Btns = styled(BtnWrap)`
  gap: 2rem;
  width: 30%;
  cursor: pointer;
  position: relative;
  align-items: center;
  margin-bottom: 80px;
  justify-content: space-between;
  svg {
    opacity: 0.7;
  }
  h3 {
    font-size: 2rem;
    .line {
      width: 100px;
      border: none;
      top: 150%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      border-bottom: 3px solid ${(p) => p.theme.color.logo};
    }
  }
`;

const boxVar = {
  exit: (theme: boolean) => ({
    opacity: 0,
    color: color(theme),
    transition: { duration: 0.5 },
  }),
  initial: (theme: boolean) => ({
    opacity: 0,
    color: color(theme),
    transition: { duration: 0.5 },
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.5 },
  }),
  hover: () => ({
    scale: 1.1,
    transition: { duration: 0.5, delay: 0.5 },
    color: '#E50914',
  }),
};
const coverVar = {
  ...boxVar,
  ...TransBorderVar,
  hover: () => ({
    border: '2px solid #E50914',
  }),
};
