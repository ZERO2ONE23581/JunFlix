import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Svg } from '../../../../src/Tools/Svg';
import { Flex, Page } from '../../../../styles/global';
import { HeadTitle } from '../../../../src/components/Head';
import { AnimatePresence, motion } from 'framer-motion';
import { UpdateBox } from '../../../../src/components/User/Update/UpdateBox';

const EditUser: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [page, setPage] = useState(1);
  const [back, setBack] = useState(false);
  const clickArrow = (type: string) => {
    if (type === 'right') {
      setBack(true);
      setPage((prev) => (prev === 5 ? 1 : prev + 1));
    }
    if (type === 'left') {
      setBack(false);
      setPage((prev) => (prev === 1 ? 5 : prev - 1));
    }
  };
  //
  return (
    <>
      <HeadTitle title="프로필 편집" />
      <Cont>
        <Flex className="slider-flex">
          <Svg
            theme={theme}
            size="2rem"
            type="left-chevron"
            onClick={() => clickArrow('left')}
          />
          <div className="wrap">
            <AnimatePresence initial={false} custom={back}>
              <Wrap
                exit="exit"
                initial="initial"
                animate="animate"
                key={page}
                custom={back}
                variants={slideVar}
                className="box-wrap"
              >
                <UpdateBox theme={theme} type={`edit-user${page}`} />
              </Wrap>
            </AnimatePresence>
          </div>
          <Svg
            size="2rem"
            theme={theme}
            type="right-chevron"
            onClick={() => clickArrow('right')}
          />
        </Flex>
      </Cont>
    </>
  );
};
export default EditUser;

const Cont = styled(Page)`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .slider-flex {
    //border: 2px solid yellow;
    width: 55vw;
    height: 55vh;
    min-width: 800px;
    min-height: 500px;
    align-items: center;
    justify-content: space-between;
    .wrap {
      //border: 2px solid blue;
      width: 100%;
      height: 100%;
      position: relative;
      .box-wrap {
        width: 100%;
        height: 100%;
        //border: 4px solid orange;
        .box {
          //border: 3px solid blueviolet;
        }
      }
    }
  }
`;
const Wrap = styled(motion.div)`
  top: 0%;
  right: 0%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const slideVar = {
  initial: (back: boolean) => ({
    scale: 0,
    opacity: 0,
    x: back ? -1000 : 1000,
  }),
  animate: (back: boolean) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'tween',
      duration: 1,
    },
  }),
  exit: (back: boolean) => ({
    scale: 0,
    opacity: 0,
    transition: {
      type: 'tween',
      duration: 1,
    },
    x: back ? 1000 : -1000,
  }),
};
