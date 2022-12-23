import styled from '@emotion/styled';
import { PostSchema } from '../Post/Schema';
import { Page } from '../../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { useGetAllPosts } from '../../libs/client/usePosts';

interface ILoggedIn {
  _data: {
    theme: boolean;
    isHide: boolean;
    mobile?: boolean;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const LoggedIn = ({ _data }: ILoggedIn) => {
  const { posts } = useGetAllPosts();
  const { mobile, theme, isHide, setFixed } = _data;
  return (
    <AnimatePresence>
      {!isHide && (
        <>
          {mobile && (
            <Cont>
              <PostSchema
                _data={{ theme, posts, grid: 6 }}
                setFixed={setFixed}
              />
            </Cont>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

const Cont = styled(Page)`
  padding: 1rem;
  border: 5px solid hotpink;
`;
