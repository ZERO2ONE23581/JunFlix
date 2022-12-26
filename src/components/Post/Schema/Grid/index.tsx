import { Box } from './Box';
import { Icons } from './Icons';
import styled from '@emotion/styled';
import { PostModal } from '../Read/Modal';
import { Dispatch, SetStateAction } from 'react';
import { IPostType } from '../../../../types/post';
import { usePostsGrid } from '../../../../libs/client/usePosts';
import { useResponsive } from '../../../../libs/client/useTools';
import { FlexCol, FlexCol_, Grid } from '../../../../../styles/global';

interface IPostGrid {
  _data: {
    grid: number;
    theme: boolean;
    post: IPostType;
    posts: IPostType[];
  };
  _set: {
    modal: string;
    setModal: Dispatch<SetStateAction<string>>;
    setPostId: Dispatch<SetStateAction<number>>;
    setCmtModal: Dispatch<SetStateAction<boolean>>;
  };
}
export const PostGrid = ({ _data, _set }: IPostGrid) => {
  const { isDesk } = useResponsive();
  const { theme, posts, grid, post } = _data;
  const { modal, setPostId, setCmtModal, setModal } = _set;
  const { ColArr, PostArr, max, setMax } = usePostsGrid({ posts, grid });
  const onClick = (id: number) => {
    setPostId(id);
    setModal('read');
  };
  return (
    <>
      <Cont isDesk={isDesk}>
        <Icons _data={{ theme, setMax }} />
        <Grid className="grid" box={max}>
          {ColArr.map((column) => (
            <Array key={column}>
              {PostArr(column)?.map((post) => (
                <Box key={post.id} _data={{ theme, post, onClick }} />
              ))}
            </Array>
          ))}
        </Grid>
      </Cont>
      <PostModal _data={{ modal, theme, post, setModal, setCmtModal }} />
    </>
  );
};
const Cont = styled(FlexCol_)`
  position: relative;
  width: fit-content;
  align-items: flex-end;
  .grid {
    gap: ${(p) => (p.isDesk ? '1.3rem' : '2.5rem')};
  }
`;
const Array = styled(FlexCol)`
  gap: 2rem;
  width: fit-content;
  height: fit-content;
  justify-content: space-between;
`;
