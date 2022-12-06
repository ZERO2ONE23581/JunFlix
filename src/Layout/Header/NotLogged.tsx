import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Flex } from '../../../styles/global';
import { ITheme } from '../../../styles/theme';
import { useUser } from '../../libs/client/useUser';
import { useCapLetter } from '../../libs/client/useTools';
import { colorVar, hoverScale } from '../../../styles/variants';

export const NotLogged = ({ theme }: ITheme) => {
  const router = useRouter();
  const { isLoggedIn } = useUser();
  const textVar = { ...colorVar, ...hoverScale };
  const array = ['join', 'login'];
  const onClick = (type: string) => router.push(`/${type}`);
  return (
    <>
      {!isLoggedIn && (
        <Cont>
          {array.map((item) => (
            <motion.div
              custom={theme}
              variants={textVar}
              key={array.indexOf(item)}
              onClick={() => onClick(item)}
              exit="exit"
              className="txt"
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              {useCapLetter(item)}
            </motion.div>
          ))}
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Flex)`
  gap: 4rem;
  .txt {
    cursor: pointer;
  }
`;
