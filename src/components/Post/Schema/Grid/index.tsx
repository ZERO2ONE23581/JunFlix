import { Box } from './Box';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IconLayer } from './IconLayer';
import { IPostType } from '../../../../types/post';
import { ISetFixed } from '../../../../../pages/_app';
import { Flex, FlexCol, Grid } from '../../../../../styles/global';
import { usePostsGrid } from '../../../../libs/client/usePosts';
import { Icons } from './Icons';

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
    <Cont className="posts_grid">
      {/* {!isHome && <IconLayer _data={{ theme, setMax, setFixed }} />} */}
      {/* <IconLayer _data={{ theme, setMax, setFixed }} /> */}
      <Icons _data={{ theme, setMax, setFixed }} />
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
