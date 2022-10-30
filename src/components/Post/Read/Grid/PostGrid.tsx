import { Box } from './Box';
import styled from '@emotion/styled';
import { NoData } from '../../../../Tools/NoData';
import { IPostType } from '../../../../types/post';
import { FlexCol, Grid } from '../../../../../styles/global';

interface IMyPosts {
  theme: boolean;
  posts: IPostType[];
  clickBox: (id: number) => void;
}
export const PostGrid = ({ theme, posts, clickBox }: IMyPosts) => {
  const wrap = [0, 1, 2, 3, 4];
  const nodata = !Boolean(posts?.length! > 0);
  const no_data = !Boolean(posts?.length > 0);
  const box_num = posts?.length > 5 ? 5 : posts?.length;
  return (
    <>
      {!nodata && (
        <Cont box={box_num} className="my-posts-grid">
          {wrap.map((element) => (
            <FlexCol key={element} className="posts-column">
              {posts
                ?.filter(
                  (e) =>
                    posts.indexOf(e) === element ||
                    posts.indexOf(e) % 5 === element
                )
                .map((item) => (
                  <Box
                    key={item.id}
                    _data={{
                      theme,
                      clickBox,
                      post_id: item.id,
                      title: item.title,
                      image: item.post_image,
                    }}
                  />
                ))}
            </FlexCol>
          ))}
        </Cont>
      )}
      <NoData _data={{ theme, no_data }} />
    </>
  );
};
const Cont = styled(Grid)`
  .posts-column {
    gap: 2rem;
    justify-content: space-between;
    .grid-box {
      img {
        //border: 5px solid yellow;
        max-height: 500px;
      }
    }
  }
`;
