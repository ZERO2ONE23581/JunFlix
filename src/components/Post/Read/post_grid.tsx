import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Flex, Grid } from '../../../../styles/global';
import { useCapLetters } from '../../../libs/client/useTools';
import {
  color,
  SpringTrans,
  TransBorderVar,
} from '../../../../styles/variants';
import { ReadDate } from '../../../Tools/Date';
import { TrimText } from '../../../Tools/trimText';
import { IPostType } from '../../../types/post';
import { useState } from 'react';
import { PostModal } from './post_grid_modal';
import { UpdatePostModal } from '../update/update_post_modal';
import { avatarLink } from '../../../Tools/Avatar';

interface IPostGrid {
  theme: boolean;
  posts: IPostType[];
}

export const PostGrid = ({ posts, theme }: IPostGrid) => {
  const [savedId, setSavedId] = useState(0);
  const [update, setUpdate] = useState(false);
  const post = posts?.find((e) => e.id === savedId);
  const isPost = Boolean(post && savedId);
  const isGrid = posts && Boolean(posts?.length > 0);
  const [close, setClose] = useState(false);
  return (
    <>
      {isGrid && (
        <Container className="my-posts" size={posts?.length}>
          {posts?.map((e) => (
            <PostBox
              onClick={() => setSavedId(e.id)}
              key={e.id}
              layoutId={e.id + ''}
              exit="exit"
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="post-box"
              custom={theme}
              variants={boxVar}
              transition={SpringTrans}
            >
              <Cover
                exit="exit"
                animate="animate"
                initial="initial"
                whileHover="hover"
                className="img-cover"
                custom={theme}
                variants={coverVar}
                transition={SpringTrans}
              >
                <img src={avatarLink(e?.post_image)} alt="test" />
              </Cover>
              <Info>
                <h2>
                  <TrimText text={useCapLetters(e.title)} max={30} />
                </h2>
                <ul>
                  <li>
                    <ReadDate createdAt={e.createdAt} updatedAt={e.updatedAt} />
                  </li>
                </ul>
              </Info>
            </PostBox>
          ))}
        </Container>
      )}
      <PostModal
        post={post!}
        id={savedId}
        key={savedId}
        theme={theme}
        modal={isPost}
        closeModal={() => setSavedId(0)}
        updatePost={() => setUpdate(true)}
      />
      <UpdatePostModal
        post={post!}
        theme={theme}
        modal={Boolean(update && post)}
        closeModal={() => setUpdate(false)}
      />
    </>
  );
};
const Container = styled(Grid)``;
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
