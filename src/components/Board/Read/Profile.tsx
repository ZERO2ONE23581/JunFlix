import styled from '@emotion/styled';
import { ProfileAvatar } from '../../Avatar/ProfileAvatar';
import { IsOwner } from './IsOwner';

interface IProfile {
  BOARDID: number;
  USERID: number;
  USER_AVATAR: string | null;
  USER_USERNAME: string;
}
export const Profile = ({
  USERID,
  BOARDID,
  USER_AVATAR,
  USER_USERNAME,
}: IProfile) => {
  return (
    <Cont>
      <IsOwner BOARDID={BOARDID} BOARD_USERID={USERID} />
      <ProfileAvatar avatar={USER_AVATAR} size={'7em'} />
      <span>@{USER_USERNAME}</span>
    </Cont>
  );
};
const Cont = styled.article`
  position: relative;
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
