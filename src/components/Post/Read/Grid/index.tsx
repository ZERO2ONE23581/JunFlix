import { Box } from './Box';
import { Icons } from './Icons';
import styled from '@emotion/styled';
import { IPostType } from '../../../../types/post';
import { useState } from 'react';
import { FlexCol, Grid, Layer_ } from '../../../../../styles/global';
import { useRouter } from 'next/router';
import { useCapLetters } from '../../../../libs/client/useTools';
import { useUser } from '../../../../libs/client/useUser';
import { usePostsGrid } from '../../../../libs/client/usePosts';
import { IconLayer } from './Icon_layer';

interface IMyPosts {
  _data: {
    grid: number;
    theme: boolean;
    posts: IPostType[];
    onClickBox: (id: number) => void;
  };
}
export const PostGrid = ({ _data }: IMyPosts) => {
  const { theme, posts, onClickBox, grid } = _data;
  const { ColArr, PostArr, max, setMax } = usePostsGrid({ posts, grid });
  return (
    <Cont>
      <IconLayer _data={{ theme, setMax }} />
      <Grid box={max} className="posts-grid">
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
  .posts-grid {
    padding-top: 1rem;
  }
`;
const Column = styled(FlexCol)`
  gap: 2rem;
  height: fit-content;
  justify-content: space-between;
  .grid-box {
    height: fit-content;
    img {
      width: 100%;
      max-height: 600px;
      height: fit-content;
    }
  }
`;
