import { Box } from './Box';
import { Icons } from './Icons';
import styled from '@emotion/styled';
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
  const { theme, posts, onClickBox: onClick, grid } = _data;
  const { ColArr, PostArr, max, setMax } = usePostsGrid({ posts, grid });
  return (
    <Cont className="posts_grid">
      <Icons _data={{ theme, setMax, setFixed }} />
      <Grid box={max}>
        {ColArr.map((column) => (
          <Array key={column}>
            {PostArr(column)?.map((post) => (
              <Box key={post.id} _data={{ theme, post, onClick }} />
            ))}
          </Array>
        ))}
      </Grid>
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  min-width: 1200px;
  position: relative;
  align-items: flex-end;
`;
const Array = styled(FlexCol)`
  gap: 2rem;
  height: fit-content;
  justify-content: space-between;
`;
