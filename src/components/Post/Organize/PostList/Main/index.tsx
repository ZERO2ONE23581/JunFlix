import { Title } from './Title';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { CheckBox } from '../Box/CheckBox';
import { UseFormRegister } from 'react-hook-form';
import { PostBox__ } from '../../../Schema/Grid/Box';
import { avatarLink } from '../../../../../Tools/Avatar';
import { FlexCol, Grid } from '../../../../../../styles/global';
import { IPostForm, IPostType } from '../../../../../types/post';
import { usePostTitle } from '../../../../../libs/client/usePosts';

interface IMain {
  _data: {
    array: [];
    theme: boolean;
    posts: IPostType[];
    register?: UseFormRegister<IPostForm>;
  };
}
export const Main = ({ _data }: IMain) => {
  const { theme, array, posts, register } = _data;
  const isChecked = (id: number) =>
    Boolean(array?.find((el: number) => el === id));
  return (
    <>
      <Cont>
        <Title />
        <Grid className="grid" box={3}>
          {posts.map((post) => (
            <Box key={post.id}>
              <Img
                variants={vars}
                initial="initial"
                animate="animate"
                alt="박스커버이미지"
                src={avatarLink(post.post_image)}
                custom={{ theme, isChecked: isChecked(post.id) }}
              />
              <h2>{usePostTitle(post.title)}</h2>
              <CheckBox
                _data={{
                  theme,
                  register,
                  post_id: post.id,
                  isChecked: isChecked(post.id),
                }}
              />
            </Box>
          ))}
        </Grid>
      </Cont>
    </>
  );
};

const Cont = styled(FlexCol)`
  height: 100%;
  .grid {
    gap: 1rem;
    height: 100%;
    height: 100%;
    padding: 2rem;

    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Box = styled(PostBox__)`
  width: 100%;
  //max-height: 70%;
  position: relative;
`;
const Img = styled(motion.img)`
  width: 100%;
  height: 100%;
`;
const vars = {
  initial: ({ theme, isChecked }: any) => ({
    //borderRadius: isChecked ? '8%' : '5%',
    //border: '3px solid transparent',
    //transition: { duration: 0.4 },
  }),
  animate: ({ theme, isChecked }: any) => ({
    transition: { duration: 0.3 },
    scale: isChecked ? 0.98 : 1,
    borderRadius: isChecked ? '10%' : '5%',
    border: isChecked ? '5px solid #E50914' : '5px solid transparent',
  }),
};
