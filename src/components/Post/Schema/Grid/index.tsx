import { Box } from './Box';
import { Icons } from './Icons';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useState } from 'react';
import { IPostType } from '../../../../types/post';
import { FlexCol, Grid } from '../../../../../styles/global';
import { usePostsGrid } from '../../../../libs/client/usePosts';
import { PostModal } from '../Read/Modal';
import { useResponsive } from '../../../../libs/client/useTools';

interface IPostGrid {
  _data: {
    grid: number;
    theme: boolean;
    post: IPostType;
    posts: IPostType[];
  };
  _set: {
    setModal: Dispatch<SetStateAction<string>>;
    setPostId: Dispatch<SetStateAction<number>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostGrid = ({ _data, _set }: IPostGrid) => {
  const { isDesk } = useResponsive();
  const { theme, posts, grid, post } = _data;
  const { setPostId, setCmtModal, setModal: edit } = _set;
  const { ColArr, PostArr, max, setMax } = usePostsGrid({ posts, grid });
  const [modal, setModal] = useState(false);
  const onClick = (id: number) => {
    setPostId(id);
    setModal(true);
  };
  return (
    <>
      <Cont>
        <Icons _data={{ theme, setMax }} />
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
      <PostModal
        _data={{ modal, theme, post }}
        _set={{ setModal, setCmtModal, edit }}
      />
    </>
  );
};
const Cont = styled(FlexCol)`
  position: relative;
  width: fit-content;
  align-items: flex-end;
`;
const Array = styled(FlexCol)`
  gap: 2rem;
  width: fit-content;
  height: fit-content;
  justify-content: space-between;
`;
