import styled from '@emotion/styled';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { Btn } from '../../../../../../styles/btn';
import { ProfileAvatar } from '../../../../Avatar/profile';

interface IUserInfoProps {
  user?: User;
}

export const UserInfo = ({ user }: IUserInfoProps) => {
  const router = useRouter();
  const clickBtn = (type: string) => {
    if (type === 'edit') return router.push(`/user/${user?.id}/edit/profile`);
  };
  return (
    <Cont>
      <h1>{user?.username}'s DashBoard</h1>
      <div className="avatar-desc-wrap">
        <ProfileAvatar size={90} url={user?.avatar} />
        <UserDesc>
          <li className="name-list">
            <span>Name</span>
            <span className="item name">
              {user?.name ? user?.name : 'Anonymous'}
            </span>
          </li>
          <ul className="info-list">
            <li>
              <span>ID</span>
              <span className="item">{user?.userId}</span>
            </li>
            <li>
              <span>Email</span>
              <span className="item">{user?.email}</span>
            </li>
          </ul>
        </UserDesc>
      </div>
      <div className="btn-wrap">
        <Button onClick={() => clickBtn('edit')}>Edit Profile</Button>
        <Button onClick={() => clickBtn('edit')}>See Profile</Button>
      </div>
    </Cont>
  );
};
const Cont = styled.article`
  width: 500px;
  padding: 20px 50px;
  border-radius: 5px;
  border: ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .avatar-desc-wrap {
    gap: 20px;
    display: flex;
    align-items: center;
  }
  .btn-wrap {
    gap: 10px;
    display: flex;
    align-items: center;
  }
  h1 {
    margin-bottom: 20px;
  }
`;
const UserDesc = styled.ul`
  width: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    gap: 2px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 10px;
    border-radius: 8px;
    border: ${(p) => p.theme.border};
    box-shadow: ${(p) => p.theme.boxShadow.nav};
    .item {
      font-weight: 700;
      font-size: 1rem;
    }
  }
  .name-list {
    .name {
      font-size: 1.2rem;
    }
  }
  .info-list {
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Button = styled(Btn)`
  margin-top: 20px;
  font-size: 1rem;
  padding: 10px 20px;
`;
