import { Movie } from './Movie';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import useUser from '../../../../../../libs/client/useUser';

interface IModal {
  type: string;
  text: string;
  setSelect: Dispatch<SetStateAction<string>>;
}
export const Modal = ({ type, text, setSelect }: IModal) => {
  const router = useRouter();
  const { isLoggedIn, loggedInUser } = useUser();
  const onClick = (Type: string) => {
    setSelect('');
    if (Type === 'all') router.push(`/${type}s`);
    if (Type === 'my')
      router.push(
        `/user/${loggedInUser?.id}/${loggedInUser?.username}/${type}s`
      );
    if (Type === 'create' && type === 'post') {
      if (!isLoggedIn) alert('로그인 해주세요.');
      else alert('포스트를 생성할 보드를 선택해주세요.');
      return router.push(`/my/boards`);
    }
    if (Type === 'create')
      router.push(`/user/${loggedInUser?.id}/${type}/create`);
  };
  const isMovie = Boolean(type === 'movie');
  return (
    <Cont>
      {!isMovie && (
        <List>
          <li onClick={() => onClick('all')}>
            <span>All</span>
            <span>{text}s</span>
          </li>
          <li onClick={() => onClick('my')}>
            <span>My</span>
            <span>{text}</span>
          </li>
          <li onClick={() => onClick('create')}>
            <span>Create</span>
            <span>{text}</span>
          </li>
        </List>
      )}
      {isMovie && <Movie setSelect={setSelect} />}
    </Cont>
  );
};
const Cont = styled.nav`
  min-width: 120px;
  left: 50%;
  top: 160%;
  transform: translate(-50%, 0);
  z-index: 999;
  cursor: pointer;
  position: absolute;
  border-radius: 5px;
  padding-bottom: 3px;
  border: ${(p) => p.theme.border.thick};
  background-color: ${(p) => p.theme.color.bg};
  box-shadow: ${(p) => p.theme.boxShadow.nav};
`;
const List = styled.ul`
  padding: 5px 0;
  li {
    gap: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0;
    padding: 8px 10px;
    font-size: 1.1rem;
    &:hover {
      color: ${(p) => p.theme.color.logo};
      background-color: ${(p) => p.theme.color.font};
    }
  }
`;
