import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { color } from '../../../../../styles/variants';
import { useCapLetters } from '../../../../libs/client/useTools';
import { Flex, FlexCol, Grid } from '../../../../../styles/global';

export interface IMyCreated {
  theme: boolean;
  type: string;
}
export const MyCreated = ({ type, theme }: IMyCreated) => {
  const router = useRouter();
  const { user_id } = router.query;
  const array = ['boards', 'posts', 'reviews'];
  const onClick = (type: string) => router.push(`/user/${user_id}/${type}`);
  return (
    <AnimatePresence>
      {type === 'created' && (
        <Cont box={array.length} className="my-created">
          {array.map((item) => (
            <FlexCol
              exit="exit"
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="my-created-box"
              key={item}
              custom={theme}
              variants={vars}
              onClick={() => onClick(item)}
            >
              <img src="/img/1.jpg" alt="test" />
              <Flex className="box-info">
                <h2>{`All ${useCapLetters(item)}`}</h2>
              </Flex>
            </FlexCol>
          ))}
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Grid)`
  padding-top: 2rem;
  .my-created-box {
    gap: 0;
    height: 100%;
    cursor: pointer;
    overflow: hidden;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    img {
      width: 100%;
      height: 100%;
    }
    .box-info {
      padding: 0.5rem 1rem;
      h2 {
        font-weight: 400;
        font-size: 1.4rem;
      }
    }
  }
`;
const vars = {
  initial: (theme: boolean) => ({
    opacity: 0,
    ransition: { duration: 0.5 },
  }),
  animate: (theme: boolean) => ({
    opacity: 1,
    color: color(theme),
    transition: { duration: 0.5 },
    //border: TransBorder(!theme),
  }),
  exit: (theme: boolean) => ({
    opacity: 0,
  }),
  hover: () => ({
    scale: 1.1,
    color: '#E50914',
    transition: { duration: 0.5 },
  }),
};
