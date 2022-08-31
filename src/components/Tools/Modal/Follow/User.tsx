import { Btn } from '../../Button';
import styled from '@emotion/styled';
import { IconBtn } from '../../Button/Icon';
import { useEffect } from 'react';
import { DimBackground, SmallModal } from '../../../../../styles/global';
import { IFollowModal } from './Board';
import { useRouter } from 'next/router';
import useMutation from '../../../../libs/client/useMutation';
import { IData } from '../../../../types/global';
import { LoadingModal } from '../Loading';

interface IFollowUserModal extends IFollowModal {
  userID: number;
  username: string;
}
export const FollowUserModal = ({
  userID,
  username,
  isFollow,
  isUnFollow,
  closeModal,
}: IFollowUserModal) => {
  const router = useRouter();
  const [FollowUser, { data, loading }] = useMutation<IData>(
    `/api/user/${userID}/follow`
  );
  const clickFollow = () => {
    if (loading) return;
    FollowUser({});
  };
  useEffect(() => {
    if (data) closeModal!(false);
    if (data?.ok && !data.isFollowing)
      alert('유저를 팔로우 합니다. (You are now following this user.)');
    if (data?.ok && data.isFollowing)
      alert('유저를 언팔로우 합니다. (You are now unfollowing this user.)');
  }, [data, closeModal, router]);

  return (
    <>
      {!loading && (
        <>
          <Cont>
            <IconBtn
              size="2rem"
              type="button"
              svgType="close"
              onClick={() => closeModal!(false)}
            />
            {isFollow && (
              <>
                <span>유저를 팔로우 하면 콘텐츠를 열람할 수 있습니다.</span>
                <span className="small">
                  <span className="red">{username}</span> 님을 팔로우
                  하겠습니까?
                </span>
                <span>You can see contents by following the user.</span>
                <span className="small">
                  Would you like to follow
                  <span className="red">{username}</span> ?
                </span>
                <Btn type="button" name="Follow" onClick={clickFollow} />
              </>
            )}
            {isUnFollow && (
              <>
                <span>
                  <span className="red">{username}</span> 님을 언팔로우
                  하겠습니까?
                </span>
                <span className="small">
                  팔로우를 취소하면 콘텐츠를 볼 수 없습니다.
                </span>
                <span>
                  Would you like to unfollow
                  <span className="red">{username}</span> ?
                </span>
                <span className="small">
                  You are no longer able to see contents if you unfollow.
                </span>
                <Btn type="button" name="UnFollow" onClick={clickFollow} />
              </>
            )}
          </Cont>
          <DimBackground zIndex={1} onClick={() => closeModal!(false)} />
        </>
      )}
      {loading && <LoadingModal type="loading" zIndex={2} />}
    </>
  );
};
const Cont = styled(SmallModal)`
  z-index: 2;
  align-items: center;
  button {
    width: 200px;
    margin-top: 10px;
  }
`;
