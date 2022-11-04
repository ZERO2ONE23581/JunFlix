import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Svg } from '../../../../src/Tools/Svg';
import { Flex, Page } from '../../../../styles/global';
import { AnimatePresence, motion } from 'framer-motion';
import { Head_ } from '../../../../src/Tools/head_title';
import { UpdateBox } from '../../../../src/components/User/update';

const UpdateUser: NextPage<{ theme: boolean }> = ({ theme }) => {
  const [page, setPage] = useState(0);
  const [back, setBack] = useState(false);
  const clickArrow = (type: string) => {
    if (type === 'right') {
      setBack(true);
      setPage((prev) => (prev === 4 ? 0 : prev + 1));
    }
    if (type === 'left') {
      setBack(false);
      setPage((prev) => (prev === 0 ? 4 : prev - 1));
    }
  };
  //
  const [type, setType] = useState('');
  const array = ['userId', 'password', 'userInfo', 'avatar', 'delete'];
  useEffect(() => {
    setType(`${array[page]}`);
  }, [setType, page, array]);
  //
  return (
    <>
      <Head_ title="프로필 편집" />
      <Cont>
        <Flex className="slider-flex">
          <Svg
            theme={theme}
            size="2rem"
            type="left-chev"
            onClick={() => clickArrow('left')}
          />
          <Control className="control-box">
            <AnimatePresence initial={false} custom={back}>
              <BoxWrap
                exit="exit"
                initial="initial"
                animate="animate"
                key={page}
                custom={back}
                variants={slideVar}
                className="box-wrap"
              >
                <UpdateBox theme={theme} type={type} />
              </BoxWrap>
            </AnimatePresence>
          </Control>
          <Svg
            size="2rem"
            theme={theme}
            type="right-chev"
            onClick={() => clickArrow('right')}
          />
        </Flex>
      </Cont>
    </>
  );
};
export default UpdateUser;

const Cont = styled(Page)`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .slider-flex {
    width: 55vw;
    height: 55vh;
    min-width: 800px;
    min-height: 500px;
    align-items: center;
    justify-content: space-between;
    .control-box {
      width: 100%;
      height: 100%;
      position: relative;
      .box-wrap {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
const Control = styled.div`
  .userId {
  }
  .password {
    max-width: 600px;
  }
  .userInfo {
    max-width: 600px;
  }
  .avatar {
    gap: 20px;
    min-width: 360px;
    align-items: center;
    .box-title {
      gap: 5px;
      .desc {
        display: block;
        font-size: 1.2rem;
        span {
          display: block;
          margin-right: 5px;
        }
      }
    }
  }
  .delete {
    gap: 15px;
    border: 5px solid ${(p) => p.theme.color.logo};
    .box-title {
      gap: 0;
      h1 {
        margin-bottom: 10px;
        color: ${(p) => p.theme.color.logo};
      }
      h2 {
        opacity: 0.9;
        font-size: 1.5rem;
        span {
          display: inline-block;
        }
      }
    }
    > h2 {
      font-size: 1.2rem;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;

const BoxWrap = styled(motion.div)`
  top: 0%;
  right: 0%;
  display: flex;
  position: absolute;
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
