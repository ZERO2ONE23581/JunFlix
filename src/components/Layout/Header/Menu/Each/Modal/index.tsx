import { Movie } from './Movie';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { GenreBoardModalBtn } from './GenreBtn';
import useUser from '../../../../../../libs/client/useUser';

interface IModal {
  type: string;
  text: string;
  setSelect: Dispatch<SetStateAction<string>>;
}
export const Modal = ({ type, text, setSelect }: IModal) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const handleClick = (btnType: string) => {
    setSelect('');
    if (type === 'board') {
      if (btnType === 'all') router.push(`/boards`);
      else if (btnType === 'my') router.push(`/boards/my`);
      else router.push(`/boards/${btnType}`);
    }
    if (type === 'post') {
      if (btnType === 'all') router.push(`/posts`);
      else if (btnType === 'my') router.push(`/posts/my`);
    }
    if (type === 'review') {
      if (btnType === 'all') router.push(`/reviews`);
      else if (btnType === 'my') router.push(`/reviews/my`);
    }
    if (btnType === 'create') {
      if (type === 'post') {
        alert('포스트를 생성할 보드를 선택해주세요.');
        router.push(`/boards/my`);
      } else {
        router.push(`/user/${loggedInUser?.id}/${type}/create`);
      }
    }
  };
  const isMovie = Boolean(type === 'movie');
  return (
    <Cont>
      {!isMovie && (
        <List>
          {type === 'board' && (
            <>
              <li onClick={() => handleClick('all')}>
                <span>All Boards</span>
              </li>
              <li onClick={() => handleClick('my')}>
                <span>My Boards</span>
              </li>
              <GenreBoardModalBtn handleClick={handleClick} />
            </>
          )}
          {type === 'post' && (
            <>
              <li onClick={() => handleClick('all')}>
                <span>All Posts</span>
              </li>
              <li onClick={() => handleClick('my')}>
                <span>My Posts</span>
              </li>
            </>
          )}
          {type === 'review' && (
            <>
              <li onClick={() => handleClick('all')}>
                <span>All Reviews</span>
              </li>
              <li onClick={() => handleClick('my')}>
                <span>My Reviews</span>
              </li>
            </>
          )}

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
