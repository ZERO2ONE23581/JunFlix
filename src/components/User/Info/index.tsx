import styled from '@emotion/styled';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { Btn } from '../../../../styles/btn';
import { Avatar } from '../../Avatar';

interface IUserInfoProps {
  user?: User;
}

export const UserInfo = ({ user }: IUserInfoProps) => {
  const router = useRouter();
  const clickBtn = (type: string) => {
    if (type === 'edit') return router.push(`/user/${user?.id}/edit/profile`);
  };
  //
  return (
    <>
      <h1>{user?.username}'s Dashboard</h1>
      <Info>
        <div className="avatar-desc-wrap">
          <Avatar
            isAvatar={Boolean(user?.avatar)}
            url={user?.avatar}
            size={90}
          />
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
      </Info>
    </>
  );
};
const Info = styled.article`
  border: 5px solid blue;
  padding: 20px;
  width: 500px;
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
`;
const UserDesc = styled.ul`
  width: 100%;
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    border: 1px solid red;
    width: 100%;
    gap: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .item {
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
  .name-list {
    .name {
      font-size: 1.5rem;
    }
  }
  .info-list {
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
