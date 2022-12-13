import { Box } from './Box';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IconLayer } from './IconLayer';
import { IPostType } from '../../../../types/post';
import { ISetFixed } from '../../../../../pages/_app';
import { FlexCol, Grid } from '../../../../../styles/global';
import { usePostsGrid } from '../../../../libs/client/usePosts';

interface IMyPosts extends ISetFixed {
  _data: {
    grid: number;
    theme: boolean;
    posts: IPostType[];
    onClickBox: (id: number) => void;
  };
}
export const PostGrid = ({ _data, setFixed }: IMyPosts) => {
  const router = useRouter();
  const { theme, posts, onClickBox, grid } = _data;
  const isHome = Boolean(router.asPath.includes('home'));
  const { ColArr, PostArr, max, setMax } = usePostsGrid({ posts, grid });
  return (
    <Cont className="posts_grid">
      {!isHome && <IconLayer _data={{ theme, setMax, setFixed }} />}
      <Grid box={max}>
        {ColArr.map((column) => (
          <Array key={column}>
            {PostArr(column)?.map((post) => (
              <Box
                key={post.id}
                _data={{
                  theme,
                  post_id: post.id,
                  title: post.title,
                  onClick: onClickBox,
                  image: post.post_image,
                }}
              />
            ))}
          </Array>
        ))}
      </Grid>
    </Cont>
  );
};
const Cont = styled.section`
  min-width: 1200px;
  position: relative;
`;
const Array = styled(FlexCol)`
  gap: 2rem;
  height: fit-content;
  justify-content: space-between;
`;
