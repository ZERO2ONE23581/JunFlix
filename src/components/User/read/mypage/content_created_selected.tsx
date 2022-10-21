import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PostGrid } from '../../../post/read/post_grid';
import { variants } from '../../../../../styles/variants';
import { BtnWrap, FlexCol, FlexPage, Page } from '../../../../../styles/global';
import { useCapLetters } from '../../../../libs/client/useTools';
import { useGetMyPosts } from '../../../../libs/client/usePosts';

interface IClickedContent {
  theme: boolean;
  clicked: string;
  clickBack: () => void;
}
export const ClickedContent = ({
  theme,
  clicked,
  clickBack,
}: IClickedContent) => {
  const router = useRouter();
  const { user_id } = router.query;
  const [data, setData] = useState<any>([]);
  const onPost = Boolean(clicked === 'post');
  //
  const posts = useGetMyPosts(Number(user_id));

  return (
    <Cont className="selected_contents">
      {clicked && (
        <BtnsWrap
          exit="exit"
          initial="initial"
          animate="animate"
          custom={theme}
          variants={variants}
        >
          <BtnName onClick={clickBack}>
            <span>{`All ${useCapLetters(clicked)}`}</span>
            <div className="line" />
          </BtnName>
        </BtnsWrap>
      )}
      <PostGrid theme={theme} posts={posts!} open={onPost} />
    </Cont>
  );
};
const Cont = styled.section`
  min-width: 100vw;
  //border: 3px solid yellowgreen;
  .post_grid {
    width: 100%;
    min-width: 80vh;
    min-height: 65vh;
    margin: 0 auto;
    padding: 3rem;
    //border: 2px solid blue;
    .grid-box {
      height: 100%;
      //border: 2px solid red;
    }
  }
`;

const BtnsWrap = styled(BtnWrap)`
  margin: 0 auto;
  gap: 2rem;
  width: 30%;
  cursor: pointer;
  position: relative;
  align-items: center;
  svg {
    opacity: 0.7;
  }
`;
const BtnName = styled(motion.h3)`
  font-size: 2rem;
  .line {
    width: 100px;
    border: none;
    top: 150%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;
