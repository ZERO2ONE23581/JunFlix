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
        <Title>
          <span className="board-title">{Shotened}</span>
          {loggedInUser?.id === userId && (
            <Svg type="isOwner" size="1rem" fill={'red'} />
          )}
        </Title>
      </li>
      <Detail>
        <span>@{username}</span>
        <span className="dot">•</span>
        <span className="board-genre">{genre}</span>
        <Svg type={genre!} size="1.4rem" />
      </Detail>
    </Cont>
  );
};
const Cont = styled.ul<{ isAvatar: boolean }>`
  gap: 8px;
  display: flex;
  padding: 30px 15px;
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
`;
const Title = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  position: relative;
`;
const Detail = styled.li`
  gap: 7px;
  display: flex;
  align-items: center;
  svg {
    fill: white;
    margin-left: 10px;
  }
`;
