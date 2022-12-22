import { Box } from './Box';
import { Icons } from './Icons';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../types/post';
import { FlexCol, Grid } from '../../../../../styles/global';
import { usePostsGrid } from '../../../../libs/client/usePosts';

interface IPostGrid {
  _data: {
    grid: number;
    theme: boolean;
    posts: IPostType[];
    setModal: Dispatch<SetStateAction<string>>;
    setPostId: Dispatch<SetStateAction<number>>;
    setFixed: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostGrid = ({ _data }: IPostGrid) => {
  const { theme, posts, setPostId, setModal, grid, setFixed } = _data;
  const { ColArr, PostArr, max, setMax } = usePostsGrid({ posts, grid });
  const onClick = (id: number) => {
    setPostId(id);
    setModal('read');
  };
  return (
    <Cont>
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
