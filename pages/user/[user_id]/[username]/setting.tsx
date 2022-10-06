import { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Page } from '../../../../styles/global';
import { Svg } from '../../../../src/Tools/Svg';
import { HeadTitle } from '../../../../src/components/Head';
import { DeleteUser } from '../../../../src/components/User/Delete';
import { UserId } from '../../../../src/components/User/Update/UserId';
import { UserInfo } from '../../../../src/components/User/Update/UserInfo';
import { Password } from '../../../../src/components/User/Update/Password';
import { EditUserAvatar } from '../../../../src/components/Avatar/User/Edit';
import { AnimatePresence, motion } from 'framer-motion';
import {
  NeedLogin,
  NeedLoginModal,
} from '../../../../src/Tools/Modal/NeedLoginModal';

const UserSettingPage: NextPage = () => {
  NeedLogin();
  const modal = NeedLogin().modal;
  //
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
  return (
    <>
      <HeadTitle title="프로필 편집" />
      <Cont>
        {modal && <NeedLoginModal />}
        {!modal && (
          <Flex>
            <Svg
              size="2rem"
              type="left-chevron"
              onClick={() => clickArrow('left')}
            />
            <div className="wrap">
              <AnimatePresence custom={back}>
                <Box
                  className="box"
                  key={page}
                  exit="exit"
                  custom={back}
                  initial="initial"
                  animate="animate"
                  variants={boxVars}
                >
                  <>
                    {page === 1 && <UserId />}
                    {page === 2 && <Password />}
                    {page === 3 && <EditUserAvatar />}
                    {page === 4 && <UserInfo />}
                    {page === 5 && <DeleteUser />}
                  </>
                </Box>
              </AnimatePresence>
            </div>
            <Svg
              size="2rem"
              type="right-chevron"
              onClick={() => clickArrow('right')}
            />
          </Flex>
        )}
      </Cont>
    </>
  );
};
export default UserSettingPage;

const Cont = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;
const Flex = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .wrap {
    position: relative;
    min-width: 400px;
    min-height: 400px;
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
