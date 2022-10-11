import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import useSWR from 'swr';
import useUser from '../../../../../../../libs/client/useUser';
import { IData } from '../../../../../../../types/global';
import { ProfileAvatar } from '../../../../../../../Tools/Avatar/profile';
import { Btn } from '../../../../../../../Tools/Button';
import { FollowUserModal } from '../../../../../../../Tools/Modal/Follow/User';

interface IUserInfo {
  userID: number;
  setModal?: Dispatch<SetStateAction<boolean>>;
}
export const UserInfo = ({ userID, setModal }: IUserInfo) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const isMe = Boolean(userID === loggedInUser?.id);
  const { data } = useSWR<IData>(`/api/user/${userID}`);
  const user = data?.User;
  //
  const [followModal, setFollowModal] = useState(false);
  const [unFollowModal, setUnFollowModal] = useState(false);
  const { data: followData } = useSWR<IData>(`/api/user/${userID}/follow`);
  return (
    <>
      {user && (
        <Cont>
          <div
            className="flex"
            onClick={() => {
              () => setModal!(false);
              router.push(`/user/${user.id}/${user.userId}/dashboard`);
            }}
          >
            <ProfileAvatar avatar={user.avatar} size="3.5rem" />
            <ul>
              <li className="userId">@{user.userId}</li>
              <li className="username">{user.username}</li>
            </ul>
          </div>
          {!isMe && followData?.isFollowing && (
            <Btn
              type="button"
              name="Following"
              isclicked={followData?.isFollowing}
              onClick={() => setUnFollowModal(true)}
            />
          )}
          {!isMe && !followData?.isFollowing && (
            <Btn
              type="button"
              name="Follow"
              isclicked={followData?.isFollowing}
              onClick={() => setFollowModal(true)}
            />
          )}
        </Cont>
      )}
      {followModal && (
        <FollowUserModal
          isFollow
          userID={userID}
          closeModal={setFollowModal}
          username={data?.User?.username!}
        />
      )}
      {unFollowModal && (
        <FollowUserModal
          isUnFollow
          userID={userID}
          closeModal={setUnFollowModal}
          username={data?.User?.username!}
        />
      )}
    </>
  );
};
const Cont = styled.div`
  display: flex;
  padding: 8px 20px;
  min-width: 300px;
  align-items: center;
  border-radius: 5px;
  justify-content: space-between;
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  .flex {
    gap: 10px;
    display: flex;
    cursor: pointer;
    align-items: center;
    ul {
      .userId {
        font-size: 1rem;
      }
      .username {
        opacity: 0.8;
        font-size: 0.9rem;
      }
    }
  }
  button {
    font-size: 1rem;
    :hover {
      color: ${(p) => p.theme.color.font};
      background-color: ${(p) => p.theme.color.bg};
    }
  }
  :hover {
    border: none;
    background-color: ${(p) => p.theme.color.logo};
  }
`;
