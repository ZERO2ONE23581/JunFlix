import {
  NeedLogin,
  NeedLoginModal,
} from '../../../../src/Tools/Modal/NeedLoginModal';
import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Flex, Page } from '../../../../styles/global';
import { Svg } from '../../../../src/Tools/Svg';
import { HeadTitle } from '../../../../src/components/Head';
import { DeleteUser } from '../../../../src/components/User/Delete';
import { UserId } from '../../../../src/components/User/Update/UserId og';
import { UserInfo } from '../../../../src/components/User/Update/UserInfo';
import { Password } from '../../../../src/components/User/Update/Password';
import { EditUserAvatar } from '../../../../src/components/Avatar/User/Edit';
import { AnimatePresence, motion } from 'framer-motion';
import { UpdateUser } from '../../../../src/components/User/Update/UpdateUser';

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
              <Box
                exit="exit"
                initial="initial"
                animate="animate"
                key={page}
                custom={back}
                variants={boxVars}
                className="box-cont"
              >
                <>
                  <UpdateUser theme={theme} type={`edit-user${page}`} />
                  {/* {page === 1 && <UserId />}
                    {page === 2 && <Password />}
                    {page === 3 && <EditUserAvatar />}
                    {page === 4 && <UserInfo />}
                    {page === 5 && <DeleteUser />} */}
                </>
              </Box>
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
    width: 45vw;
    height: 55vh;
    min-height: 330px;
    align-items: center;
    justify-content: space-between;
    .wrap {
      //border: 2px solid blue;
      width: 100%;
      height: 100%;
      position: relative;
      .box-cont {
        //border: 4px solid orange;
      }
    }
  }
`;
const Box = styled(motion.div)`
  width: 100%;
  height: 100%;
  top: 0%;
  right: 0%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  .user-box {
    width: 100%;
    height: 100%;
    min-width: 400px;
    min-height: 300px;
  }
  .avatar {
  }
`;
const boxVars = {
  initial: (back: boolean) => ({
    scale: 0,
    opacity: 0,
    x: back ? -500 : 500,
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
    x: back ? 500 : -500,
  }),
};
