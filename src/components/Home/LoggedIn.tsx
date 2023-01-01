import styled from '@emotion/styled';
import { PostSchema } from '../Post/Schema/PostSchema';
import { BG, Page } from '../../../styles/global';
import { AnimatePresence } from 'framer-motion';
import { useResponsive } from '../../libs/client/useTools';
import { useGetAllPosts } from '../../libs/client/usePosts';

interface ILoggedIn {
  _data: {
    theme: boolean;
    isHide: boolean;
  };
}
export const LoggedIn = ({ _data }: ILoggedIn) => {
  const { theme, isHide } = _data;
  const { posts } = useGetAllPosts();
  const { isDesk } = useResponsive();
  return (
    <AnimatePresence>
      {!isHide && (
        <Cont isDesk={isDesk}>
          <PostSchema _data={{ theme, posts }} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(BG)`
  padding: ${(p) => p.isDesk && '2.5rem 4rem'};
  padding-bottom: 5rem;
  .post_cover {
    h2 {
      color: whitesmoke;
    }
  }
`;
