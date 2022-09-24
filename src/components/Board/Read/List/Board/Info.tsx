import styled from '@emotion/styled';
import { Svg } from '../../../../Tools/Svg';
import useUser from '../../../../../libs/client/useUser';
import { useCapLetters } from '../../../../../libs/client/useTools';

interface IInfo {
  title: string;
  genre: string;
  avatar: string;
  username: string;
  userId: number;
}
export const Info = ({ avatar, title, username, userId, genre }: IInfo) => {
  const { loggedInUser } = useUser();
  const TITLE = useCapLetters(title);
  const from = 15;
  const Shotened = title.length > from ? TITLE.slice(0, from) + '...' : TITLE;
  return (
    <Cont isAvatar={Boolean(avatar)}>
      <li>
        <h1>
          <span>{Shotened}</span>
          {loggedInUser?.id === userId && <Svg type="isOwner" size="1rem" />}
        </h1>
      </li>
      <Detail>
        <span>Made by</span>
        <span className="name">{username}</span>
        <span className="dot">•</span>
        <span className="board-genre">{genre}</span>
        <Svg type={genre!} size="1.2rem" />
      </Detail>
    </Cont>
  );
};
const Cont = styled.ul<{ isAvatar: boolean }>`
  gap: 8px;
  width: 100%;
  display: flex;
  padding: 15px;
  font-style: italic;
  flex-direction: column;
  justify-content: center;
  color: ${(p) => (!p.isAvatar ? p.theme.color.bg : 'white')};
  :hover {
    color: ${(p) => p.theme.color.logo};
    background-color: ${(p) => p.theme.color.bg};
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
  }
  h1 {
    width: fit-content;
    font-weight: 400;
    font-size: 1.4rem;
    position: relative;
    .isOwner {
      top: -5px;
      right: -20px;
      position: absolute;
      fill: ${(p) => p.theme.color.green};
    }
  }
`;
const Detail = styled.li`
  gap: 7px;
  display: flex;
  align-items: center;
  svg {
    fill: white;
    margin-left: 10px;
  }
  .name {
    font-size: 1.2rem;
    color: ${(p) => p.theme.color.logo};
  }
`;
