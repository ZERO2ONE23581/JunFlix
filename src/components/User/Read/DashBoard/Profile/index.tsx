import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useUser from '../../../../../libs/client/useUser';
import { ProfileAvatar } from '../../../../Avatar/Profile';
import { ModalBtn } from '../../../../Tools/Button/Modal/User';
import { Svg } from '../../../../Tools/Svg';
import { Counts } from './Counts';
import { Detail, IDetail } from './Detail';

interface IProflie extends IDetail {
  avatar: string;
}
export const Profile = ({ avatar, name, userId, email }: IProflie) => {
  const { loggedInUser } = useUser();
  const router = useRouter();
  const { user_id } = router.query;
  const [setting, setSetting] = useState(false);
  const isMyDash = Boolean(loggedInUser?.id === Number(user_id));
  return (
    <>
      <Cont className="box-profile">
        <div className="flex">
          <ProfileAvatar size={'8rem'} avatar={avatar} />
          <Detail name={name} userId={userId} email={email} />
          {isMyDash && (
            <Svg type="setting" size="2rem" onClick={() => setSetting(true)} />
          )}
        </div>
        <Counts />
      </Cont>
      {setting && <ModalBtn setSetting={setSetting} />}
    </>
  );
};
const Cont = styled.article`
  gap: 20px;
  display: flex;
  flex-direction: column;
  .flex {
    gap: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .setting {
      top: 0;
      right: 0;
      position: absolute;
    }
  }
`;
