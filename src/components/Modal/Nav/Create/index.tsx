import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { NavCont } from '..';

interface INavModalProps {
  isloggedIn?: boolean;
  loggedInUserId?: number;
}
export const NavCreateModal = ({
  isloggedIn,
  loggedInUserId,
}: INavModalProps) => {
  const router = useRouter();
  const create = (type: string) => {
    if (type === 'board')
      return router.push(`/user/${loggedInUserId}/board/create`);
    if (type === 'post') return router.push(`/watch/my/board/select`);
    if (type === 'review')
      return router.push(`/user/${loggedInUserId}/review/create`);
  };
  const mustLogin = () => {
    alert('로그인이 필요합니다.');
    router.push('/user/login');
  };
  //
  return (
    <NavCont>
      <Wrap>
        <article
          className="btn"
          onClick={isloggedIn ? () => create('board') : mustLogin}
        >
          <span>Board</span>
        </article>
        <article
          className="btn"
          onClick={isloggedIn ? () => create('post') : mustLogin}
        >
          <span>Post</span>
        </article>
        <article
          className="btn"
          onClick={isloggedIn ? () => create('review') : mustLogin}
        >
          <span>Review</span>
        </article>
      </Wrap>
    </NavCont>
  );
};
const Wrap = styled.article`
  padding: 5px 0;
  box-shadow: ${(p) => p.theme.boxShadow.nav};
  .btn {
    padding: 5px;
    color: ${(p) => p.theme.color.font};
    background-color: ${(p) => p.theme.color.bg};
    &:hover {
      color: ${(p) => p.theme.color.logo};
      background-color: ${(p) => p.theme.color.font};
    }
    span {
      font-size: 1rem;
    }
  }
`;
