import { Box } from './Box';
import styled from '@emotion/styled';
import { IPostType } from '../../../../types/post';
import { Circle, FlexCol, Grid } from '../../../../../styles/global';
import { Svg } from '../../../../Tools/Svg';
import { Filter } from './Filter';
import { useState } from 'react';

interface IMyPosts {
  _data: {
    max_grid: number;
    theme: boolean;
    posts: IPostType[];
    onClick: (id: number) => void;
  };
}
export const PostGrid = ({ _data }: IMyPosts) => {
  const theme = _data?.theme!;
  const posts = _data?.posts!;
  const max = _data?.max_grid!;
  const onClick = _data?.onClick!;
  //
  const [Max, setMax] = useState(max);
  const array = [...new Array(max)].map((_, p) => p + 1);
  const box_num = posts?.length > Max ? Max : posts?.length;

  const Filtered = (box: number) => {
    const row_first = (post: IPostType, box: number) =>
      posts.indexOf(post) === array.indexOf(box);
    const row_after = (post: IPostType, box: number) =>
      posts.indexOf(post) % Max === array.indexOf(box);
    //
    return posts?.filter(
      (post) => row_first(post, box) || row_after(post, box)
    );
  };
  return (
    <>
      <Posts box={box_num} className="my-posts-grid">
        <Filter _data={{ theme, setMax }} />
        {array.map((box) => (
          <Column key={box} className="posts-column">
            {Filtered(box)?.map((post) => (
              <Box
                key={post.id}
                _data={{
                  theme,
                  onClick,
                  post_id: post.id,
                  title: post.title,
                  image: post.post_image,
                }}
              />
            ))}
          </Column>
        ))}
      </Posts>
    </>
  );
};
const Icon = styled(Circle)`
  top: -3rem;
  right: 1.5rem;
  position: absolute;
`;
const Posts = styled(Grid)`
  //border: 2px solid yellow;
  .posts-column {
    .grid-box {
      max-width: 300px;
      height: fit-content;
      img {
        width: 100%;
        min-height: 240px;
        max-height: 500px;
        height: fit-content;
      }
    }
  }
`;

const Column = styled(FlexCol)`
  gap: 2rem;
  height: fit-content;
  justify-content: space-between;
`;
