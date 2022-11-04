import styled from '@emotion/styled';

export interface IProfile {
  theme: boolean;
  size?: string;
  isInReply: boolean;
  userAvatar: string;
}
export const Profile = ({ userAvatar, size, isInReply, theme }: IProfile) => {
  return (
    <Cont>
      <div className="author">
        <Avatar
          item={{ avatar: userAvatar, size: size!, preview: null, theme }}
        />
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
