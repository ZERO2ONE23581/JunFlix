import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { IPostType } from '../../../../types/post';
import { Grid } from '../../../../../styles/global';
import { avatarLink } from '../../../../Tools/Avatar';

interface ICover {
  edit?: boolean;
  posts: IPostType[];
}
export const Cover = ({ posts, edit }: ICover) => {
  const length = posts?.length!;
  const array = posts?.slice(0, 3)!;
  const noPost = Boolean(length === 0);
  return (
    <Cont custom={edit} variants={vars} animate="animate">
      {array?.map((post) => (
        <Img
          alt="보드커버"
          key={post.id}
          length={length}
          className="cover"
          src={avatarLink(post?.post_image)}
        />
      ))}
      {noPost && (
        <Img
          alt="커버없음"
          length={length}
          className="cover"
          src={avatarLink('')}
        />
      )}
    </Cont>
  );
};
const Cont = styled(Grid)`
  gap: 0;
  width: 100%;
  height: 22rem;
  min-width: 300px;
  max-width: 400px;
  overflow: hidden;
  border-radius: 10px;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
`;
const Img = styled(motion.img)<{ length: number }>`
  width: 100%;
  height: 100%;
  :nth-of-type(1) {
    grid-row: 1/5;
    grid-column: ${(p) => (Boolean(p.length < 2) ? '1 / 5' : '1/3')};
  }
  :nth-of-type(2) {
    grid-row: 1/3;
    grid-column: 3/5;
    grid-row: ${(p) => (Boolean(p.length === 2) ? '1 / 5' : '1/3')};
  }
  :nth-of-type(3) {
    grid-row: 3/5;
    grid-column: 3/5;
  }
`;
const vars = {
  animate: (edit: boolean) => ({
    //border: edit ? '10px solid #E50914' : '1px solid transparent',
  }),
};
