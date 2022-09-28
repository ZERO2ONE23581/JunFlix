import { Movie } from './Movie';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import useUser from '../../../../../../libs/client/useUser';
import { useCapLetter } from '../../../../../../libs/client/useTools';
import { GenreBoardModalBtn } from './GenreBoardModalBtn';

interface IModal {
  type: string;
  text: string;
  setSelect: Dispatch<SetStateAction<string>>;
}
export const Modal = ({ type, text, setSelect }: IModal) => {
  const router = useRouter();
  const { isLoggedIn, loggedInUser } = useUser();
  const [btnName, setBtnName] = useState('Boards');

  const handleClick = (btnType: string) => {
    setSelect('');
    if (type === 'board') {
      if (btnType === 'all') router.push(`/boards`);
      else if (btnType === 'my') router.push(`/boards/my`);
      else router.push(`/boards/${btnType}`);
    }
    if (btnType === 'create')
      router.push(`/user/${loggedInUser?.id}/${type}/create`);
    // if (name === 'all') router.push(`/${type}s`);
    // if (name === 'my') router.push(`/${type}s/my`);
    if (btnType === 'create' && type === 'post') {
      if (!isLoggedIn) alert('로그인 해주세요.');
      else alert('포스트를 생성할 보드를 선택해주세요.');
      return router.push(
        `/user/${loggedInUser?.id}/${loggedInUser?.username}/boards`
      );
    }
  };
  const isMovie = Boolean(type === 'movie');
  return (
    <Cont>
      {!isMovie && (
        <List>
          <li onClick={() => handleClick('all')}>
            <span>All Boards</span>
          </li>
          <li onClick={() => handleClick('my')}>
            <span>My Boards</span>
          </li>
          {type === 'board' && <GenreBoardModalBtn handleClick={handleClick} />}
          <li onClick={() => handleClick('create')}>
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
