import { layerVar } from '.';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useUser } from '../../../../../libs/client/useUser';
import { useCapLetters } from '../../../../../libs/client/useTools';
import styled from '@emotion/styled';

interface ILayerMyPosts {
  _data: {
    theme: boolean;
    isQuick: boolean;
    onClick: () => void;
  };
}
export const MyPosts = ({ _data }: ILayerMyPosts) => {
  const router = useRouter();
  const { user_id } = router.query;
  const { theme, isQuick, onClick } = _data;
  const { user_id: id, username, userId } = useUser();
  const isMeHost = Boolean(Number(user_id) === id);
  const MyPostsPage = Boolean(
    !isQuick && router.asPath.includes('posts') && isMeHost
  );
  const NAME = username ? username : userId;
  return (
    <>
      {MyPostsPage && (
        <h1>
          <Span
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="username"
            onClick={onClick}
            variants={layerVar}
            custom={{ theme, isBig: true }}
          >
            {useCapLetters(NAME!)}
          </Span>
          <span>'s Posts</span>
        </h1>
      )}
    </>
  );
};
const Span = styled(motion.span)`
  cursor: pointer;
`;
