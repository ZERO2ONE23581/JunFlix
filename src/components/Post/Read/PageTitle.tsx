import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useUser } from '../../../libs/client/useUser';
import { color, redColor } from '../../../../styles/variants';
import { useCapLetters } from '../../../libs/client/useTools';

interface PageTitle {
  _data: { theme: boolean; isPost?: boolean };
}

export const PageTitle = ({ _data }: PageTitle) => {
  const router = useRouter();
  const { theme, isPost } = _data;
  const { user_id, username } = useUser();
  const onClick = () => router.push(`/user/${user_id}/my_page`);
  return (
    <>
      {isPost && (
        <Cont
          custom={theme}
          variants={vars}
          onClick={onClick}
          animate="animate"
          whileHover="hover"
          className="username"
        >
          {username && useCapLetters(username) + "'s Posts"}
        </Cont>
      )}
    </>
  );
};
const Cont = styled(motion.h1)`
  top: 1rem;
  left: 50%;
  cursor: pointer;
  position: absolute;
  width: fit-content;
  font-size: 1.8rem;
`;

const vars = {
  animate: (theme: boolean) => ({
    x: '-50%',
    color: color(theme),
  }),
  hover: { color: redColor },
};
