import { IPage } from './_app';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Head_ } from '../src/Tools/head_title';
import { AnimatePresence } from 'framer-motion';
import { opacityVar } from '../styles/variants';
import { Txts } from '../src/Layout/Home/Txts';
import { Start } from '../src/Layout/Home/Start';
import { useUser } from '../src/libs/client/useUser';
import { FlexCol, FlexPage, Page } from '../styles/global';
import { PostSchema } from '../src/components/Post/Schema';
import { useGetAllPosts } from '../src/libs/client/usePosts';

const Home: NextPage<IPage> = ({ theme, setHide, setFixed }) => {
  const { isLoggedIn } = useUser();
  const { posts } = useGetAllPosts();
  const [start, setStart] = useState(false);
  const isHide = !isLoggedIn && !start;
  useEffect(() => {
    if (isHide) return setHide(true);
    else return setHide(false);
  }, [setHide, isHide]);
  return (
    <>
      <Head_ title="Home" />
      <AnimatePresence>
        {isHide && (
          <Cont
            exit="exit"
            initial="initial"
            animate="animate"
            variants={opacityVar}
          >
            <Front>
              <Txts type="main" />
              <Start _data={{ theme, setStart }} />
              <Txts type="sub" />
            </Front>
          </Cont>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isHide && (
          <Clicked>
            <PostSchema _data={{ theme, posts, grid: 6 }} setFixed={setFixed} />
          </Clicked>
        )}
      </AnimatePresence>
    </>
  );
};
export default Home;

const Cont = styled(FlexPage)`
  background: linear-gradient(to top, black, transparent),
    url('/img/1.jpg') center / cover no-repeat;
`;

const Front = styled(FlexCol)`
  gap: 2rem;
  padding-top: 4rem;
  color: whitesmoke;
`;
const Clicked = styled(Page)`
  padding: 1rem 10rem;
  .posts_schema {
    //padding-top: 1.4rem;
    //border: 5px solid cornflowerblue;
  }
`;
