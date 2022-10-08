import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  Blur,
  BtnWrap,
  Flex,
  SmallModal,
} from '../../../../../../styles/global';
import useUser from '../../../../../libs/client/useUser';
import { ProfileAvatar } from '../../../../Avatar/profile';
import { ModalBtn } from '../../../../../Tools/Button/Modal/User';
import { Svg } from '../../../../../Tools/Svg';
import { Counts } from './Counts';
import { UserFollow } from './UserFollow';
import { ITheme } from '../../../../../../styles/theme';
import { UserType } from '../../../../../types/user';
import { Btn } from '../../../../../Tools/Button';
import { motion } from 'framer-motion';
import { joinBoxVar, TweenTrans } from '../../../../../../styles/variants';

interface IUserBox extends ITheme {
  user: UserType;
}
export const UserBox = ({ theme, user }: IUserBox) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const [modal, setModal] = useState(false);
  const isMyDash = Boolean(loggedInUser?.id === user?.id);
  const onClick = (type: string) =>
    router.push(`/user/${user.id}/${user.username}/${type}`);
  return (
    <>
      {user && (
        <Cont
          exit="exit"
          initial="initial"
          animate="animate"
          custom={theme}
          variants={joinBoxVar}
          transition={TweenTrans}
          className="user-profile"
        >
          <Flex className="flex">
            <ProfileAvatar
              size="10em"
              theme={theme}
              type={{ avatar: user?.avatar, preview: '' }}
            />
            <Detail className="detail">
              <h1>
                <label>Username</label>
                <span>{user.username}</span>
              </h1>
              <ul className="follow">
                <li>
                  <label>Follower:</label>
                  <span>0</span>
                </li>
                <li>
                  <label>Following:</label>
                  <span>0</span>
                </li>
              </ul>
              <ul className="contents">
                <li>
                  <label>Boards:</label>
                  <span>0</span>
                </li>
                <li>
                  <label>Posts:</label>
                  <span>0</span>
                </li>
                <li>
                  <label>Reviews:</label>
                  <span>0</span>
                </li>
              </ul>
            </Detail>
          </Flex>
          <BtnWrap className="btn-wrap">
            {isMyDash && (
              <Btn
                theme={theme}
                type="button"
                name="Edit Profile"
                onClick={() => onClick('edit')}
              />
            )}
            <Btn
              theme={theme}
              type="button"
              name="See Profile"
              onClick={() => onClick('profile')}
            />
          </BtnWrap>
        </Cont>
      )}
      {/* {modal && (
        <Modal>
          <Svg
            size="2rem"
            type="close"
            theme={theme}
            onClick={() => setModal(false)}
          />
          <UserFollow follow={follow} setModal={setModal} />
        </Modal>
      )} */}
    </>
  );
};
const Cont = styled(motion.article)`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  .flex {
    width: 100%;
    justify-content: space-between;
  }
  .btn-wrap {
    button {
      padding: 7px;
      font-size: 1rem;
    }
  }
`;
const Detail = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.6em;
  width: fit-content;
  label {
    font-size: 1.2rem;
    color: ${(p) => p.theme.color.logo};
  }
  h1 {
    gap: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      font-size: 2.3rem;
    }
  }
  ul {
    width: fit-content;
    gap: 20px;
    display: flex;
    align-items: center;
    li {
      width: 100%;
      gap: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .contents {
    li {
      flex-direction: row;
    }
  }
`;

const Modal = styled(SmallModal)`
  width: 80vw;
  height: 80vh;
  > article {
    border: none;
  }
  > .close {
    top: 20px;
    right: 20px;
  }
  .user-follow {
    width: 100%;
    height: 100%;
    margin-top: 10px;
    .follower,
    .following {
      .num {
        span {
          font-style: normal;
        }
      }
    }
  }
`;
const FollowCounts = styled.div`
  gap: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  li {
    gap: 10px;
    display: flex;
    align-items: center;
    label {
      font-weight: 500;
      font-size: 1.1rem;
    }
    span {
      font-size: 1.3rem;
      color: ${(p) => p.theme.color.logo};
    }
  }
`;
