import styled from '@emotion/styled';
import { AltSvg } from '../../../../../Tools/Svg';
import { ProfileAvatar } from '../../../../../Avatar/ProfileAvatar';

export interface IProfile {
  size?: string;
  isInReply: boolean;
  userAvatar: string;
}
export const Profile = ({ userAvatar, size, isInReply }: IProfile) => {
  return (
    <Cont>
      {isInReply && <AltSvg type="reply" size="1.4rem" />}
      <div className="author">
        <ProfileAvatar avatar={userAvatar} size={size} />
      </div>
    </Cont>
  );
};
const Cont = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  .author {
    gap: 10px;
    display: flex;
    font-size: 1rem;
    align-items: center;
    font-style: italic;
  }
`;
