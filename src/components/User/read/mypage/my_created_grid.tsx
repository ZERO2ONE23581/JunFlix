import styled from '@emotion/styled';
import { Btns } from './created_grid_btns';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { useCapLetters } from '../../../../libs/client/useTools';
import { Flex, FlexCol, Grid } from '../../../../../styles/global';
import { color, onlyScaleVar } from '../../../../../styles/variants';
import { useRouter } from 'next/router';

export interface IMyCreated {
  theme: boolean;
  type: string;
}
export const MyCreated = ({ type, theme }: IMyCreated) => {
  const router = useRouter();
  const array = ['board', 'post', 'review'];
  return (
    <>
      <AnimatePresence>
        {type === 'created' && (
          <Cont className="my-created">
            <Grid
              size={array.length}
              variants={onlyScaleVar}
              className="my-created-grid"
            >
              {array.map((item) => (
                <Box
                  key={item}
                  custom={theme}
                  variants={vars}
                  onClick={() => setClicked(item)}
                  exit="exit"
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className="gird_box"
                >
                  <img src="/img/1.jpg" alt="test" />
                  <Info>
                    <h2>{`All ${useCapLetters(item)}`}</h2>
                  </Info>
                </Box>
              ))}
            </Grid>
          </Cont>
        )}
      </AnimatePresence>
    </>
  );
};
const Cont = styled(FlexCol)``;
const Box = styled(FlexCol)`
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
`;
const Info = styled(Flex)`
  padding: 0.5rem 1rem;
  h2 {
    font-weight: 400;
    font-size: 1.4rem;
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
