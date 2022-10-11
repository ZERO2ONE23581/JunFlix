import styled from '@emotion/styled';
import { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { Svg } from '../../../../../../Tools/Svg';

interface IInfo {
  user: User;
}
export const Info = ({ user }: IInfo) => {
  const router = useRouter();
  return (
    <>
      {user && (
        <Cont>
          <Svg
            size="1.8rem"
            type="setting"
            onClick={() =>
              router.push(`/user/${user.id}/${user.userId}/setting`)
            }
          />
          <li>
            <label>Username</label>
            <span>{user.username ? user.username : '-'}</span>
          </li>
          <li>
            <label>Name</label>
            <span>{user.name ? user.name : 'Anonymous'}</span>
          </li>
          <li>
            <label>ID</label>
            <span>{user.userId}</span>
          </li>
          <li>
            <label>Email</label>
            <span>{user.email}</span>
          </li>
          <li>
            <label>Birth</label>
            <span>{user.birth ? user.birth : '-'}</span>
          </li>
          <li>
            <label>Sex</label>
            <span>{user.gender ? user.gender : '-'}</span>
          </li>
          <li>
            <label>Location</label>
            <span>{user.location ? user.location : '-'}</span>
          </li>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.ul`
  .setting {
    top: 10px;
    right: 20px;
    position: absolute;
  }
  gap: 20px;
  width: 100%;
  display: flex;
  position: relative;
  border-radius: 8px;
  padding: 20px 40px;
  justify-content: center;
  border: ${(p) => p.theme.border.thick};
  box-shadow: ${(p) => p.theme.boxShadow.input};
  li {
    gap: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    label {
      opacity: 0.8;
      display: block;
      font-size: 1rem;
      font-weight: 500;
      color: ${(p) => p.theme.color.logo};
    }
    span {
      font-size: 1.1rem;
    }
  }
`;
