import { Box } from './Box';
import styled from '@emotion/styled';
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
  const { theme, posts, onClickBox, grid } = _data;
  const { ColArr, PostArr, max, setMax } = usePostsGrid({ posts, grid });
  return (
    <Cont className="posts_grid_wrap">
      <IconLayer _data={{ theme, setMax, setFixed }} />
      <Grid box={max} className="posts_grid">
        {ColArr.map((column) => (
          <Column key={column}>
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
          </Column>
        ))}
      </Grid>
    </Cont>
  );
};
const Cont = styled.section`
  position: relative;
  .posts_grid {
    padding-top: 1rem;
  }
`;
const Column = styled(FlexCol)`
  gap: 2rem;
  height: fit-content;
  justify-content: space-between;
  .grid_box {
    height: fit-content;
    img {
      width: 100%;
      max-height: 600px;
      height: fit-content;
    }
  }
`;
