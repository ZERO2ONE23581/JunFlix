import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../libs/client/useUser';
import { ProfileAvatar } from '../../Avatar/ProfileAvatar';
import { IconBtn } from '../../Style/Button/IconBtn';

export const Profile = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const clickBtn = (type: string) => {
    if (type === 'edit') return router.push(`/user/my/profile/edit`);
    if (type === 'profile')
      return router.push(`/user/${loggedInUser?.username}/profile`);
  };
  return (
    <Cont>
      <Flex className="top">
        <h1>{loggedInUser?.username}'s DashBoard</h1>
        <BtnWrap>
          <IconBtn
            type="button"
            svgType="profile"
            onClick={() => clickBtn('profile')}
          />
          <IconBtn
            type="button"
            svgType="pen"
            onClick={() => clickBtn('edit')}
          />
        </BtnWrap>
      </Flex>
      <Flex>
        <ProfileAvatar size={'8em'} url={loggedInUser?.avatar} />
        <List>
          <li className="name">
            <Label>Name</Label>
            <Item>{loggedInUser?.name ? loggedInUser?.name : 'Anonymous'}</Item>
          </li>
          <div className="flex">
            <li>
              <Label>ID</Label>
              <Item>{loggedInUser?.userId}</Item>
            </li>
            <li>
              <Label>Email</Label>
              <Item>{loggedInUser?.email}</Item>
            </li>
          </div>
        </List>
      </Flex>
    </Cont>
  );
};
const Cont = styled.article`
  width: 60%;
  padding: 20px 40px;
  gap: 20px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  .top {
    justify-content: space-between;
    h1 {
      font-size: 1.6rem;
      font-weight: 500;
    }
  }
`;
const BtnWrap = styled.div`
  gap: 1em;
  display: flex;
  align-items: center;
  justify-content: end;
  button {
    svg {
      :hover {
        fill: ${(p) => p.theme.color.logo};
      }
    }
  }
`;
const Flex = styled.div`
  gap: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const List = styled.ul`
  width: 60%;
  gap: 20px;
  display: flex;
  flex-direction: column;
  li {
    width: 100%;
    position: relative;
  }
  .name {
    font-size: 1.4em;
    div {
      border: none;
    }
  }
  .flex {
    gap: 1em;
    display: flex;
    align-items: center;
  }
`;
const Item = styled.div`
  padding: 15px 20px;
  border-radius: 5px;
`;

const Label = styled.div`
  top: -10px;
  left: 20px;
  position: absolute;
  padding: 2px 10px;
  font-size: 0.9rem;
  text-align: center;
  color: ${(p) => p.theme.color.logo};
  background-color: ${(p) => p.theme.color.bg};
`;
