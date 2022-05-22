import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useUser from '../../libs/client/loggedInUser';
import { Btn } from '../Btn';

interface INavModalProps {
  username?: string;
}
export const NavModal = ({ username }: INavModalProps) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  //
  return (
    <>
      {loggedInUser && (
        <NavCont>
          <Wrapper>
            <li>
              <Link href="/mypage">
                <a>{username}'s page</a>
              </Link>
            </li>
            <li>
              <Link href={`/user/${loggedInUser.id}/edit`}>
                <a>Edit Profile</a>
              </Link>
            </li>
            <li>
              <Btn
                type="logout"
                btnName="Sign Out"
                onClick={() => router.replace('/api/user/logout')}
              />
            </li>
          </Wrapper>
        </NavCont>
      )}
    </>
  );
};

const Wrapper = styled.ul`
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  li {
    padding: 10px;
    width: 100%;
    height: 40px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(p) => p.theme.color.bg};
    color: ${(p) => p.theme.color.font};
    &:hover {
      background-color: ${(p) => p.theme.color.font};
      color: ${(p) => p.theme.color.bg};
      a,
      button {
        color: ${(p) => p.theme.color.logo};
      }
    }
    a,
    button {
      font-size: 1rem;
    }
  }
`;

const NavCont = styled.nav`
  background-color: ${(p) => p.theme.color.bg};
  color: ${(p) => p.theme.color.font};
  z-index: 999;
  position: absolute;
  top: 50px;
  right: -20px;
  width: 150px;
  border-radius: 5px;
  padding-bottom: 3px;
`;
