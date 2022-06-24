import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';
import { ProfileAvatar } from '../../Avatar/Profile';

export const Host = ({ board }: any) => {
  const { isLoggedIn, loggedInUser } = useUser();
  return (
    <>
      <Cont>
        <span>
          <ProfileAvatar url={loggedInUser?.avatar} size={30} />
        </span>
        <span className="data">@{loggedInUser?.username}</span>
        <span>from</span>
        <span className="data">@{board?.title}</span>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  gap: 5px;
  display: flex;
  font-size: 1rem;
  font-weight: 400;
  min-width: 330px;
  font-style: italic;
  align-items: center;
  margin-bottom: 22px;
  justify-content: end;
  span {
    margin-right: 5px;
  }
  .data {
    color: ${(p) => p.theme.color.logo};
  }
`;
