import { Box } from './Box';
import { Icons } from './Icons';
import styled from '@emotion/styled';
import { IPostType } from '../../../../types/post';
import { Dispatch, SetStateAction, useState } from 'react';
import { FlexCol, Grid } from '../../../../../styles/global';

interface IMyPosts {
  _data: {
    theme: boolean;
    max_grid: number;
    posts: IPostType[];
    hideCreate?: boolean;
    onClick: (id: number) => void;
    setCreate: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostGrid = ({ _data }: IMyPosts) => {
  const theme = _data?.theme!;
  const posts = _data?.posts!;
  const max = _data?.max_grid!;
  const onClick = _data?.onClick!;
  const setCreate = _data?.setCreate!;
  const hideCreate = _data?.hideCreate!;
  const [Max, setMax] = useState(max);
  const array = [...new Array(Max)].map((_, p) => p + 1);
  const Posts = (box: number) => {
    const row_first = (post: IPostType, box: number) =>
      posts.indexOf(post) === array.indexOf(box);
    const row_after = (post: IPostType, box: number) =>
      posts.indexOf(post) % Max === array.indexOf(box);
    return posts?.filter(
      (post) => row_first(post, box) || row_after(post, box)
    );
  };
  return (
    <>
      <Icons _data={{ theme, setMax, hideCreate, setCreate }} />
      <Cont box={Max} className="posts-grid">
        {array.map((box) => (
          <Column key={box} className="posts-column">
            {Posts(box)?.map((post) => (
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
      </Cont>
    </>
  );
};
const Cont = styled(Grid)`
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
