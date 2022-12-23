import styled from '@emotion/styled';
import { PostSchema } from '../Post/Schema';
import { Page } from '../../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useGetAllPosts } from '../../libs/client/usePosts';
import { useResponsive } from '../../libs/client/useTools';

interface ILoggedIn {
  _data: {
    theme: boolean;
    isHide: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const LoggedIn = ({ _data }: ILoggedIn) => {
  const { posts } = useGetAllPosts();
  const { theme, isHide, setFixed } = _data;
  const { isMobile, isDesk } = useResponsive();
  const grid = isMobile ? 3 : 6;
  return (
    <AnimatePresence>
      {!isHide && (
        <Cont>
          <PostSchema _data={{ theme, posts, grid }} setFixed={setFixed} />
        </Cont>
      )}
    </AnimatePresence>
  );
};

const Cont = styled(Page)`
  padding: 1rem 2rem;
  min-height: fit-content;
  background: url('/img/up.jpg') center / cover no-repeat;
`;
