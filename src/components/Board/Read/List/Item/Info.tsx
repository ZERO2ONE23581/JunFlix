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
  const Shotened = title.length > 15 ? TITLE.slice(0, 10) + '...' : TITLE;
  return (
    <Cont isAvatar={Boolean(avatar)}>
      <Title>
        <span>{Shotened}</span>
        {loggedInUser?.id === userId && <Svg type="isOwner" size="1rem" />}
      </Title>
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
  gap: 5px;
  padding: 20px 30px;
  display: flex;
  font-size: 1rem;
  font-style: italic;
  flex-direction: column;
  align-items: flex-start;
  color: ${(p) => (!p.isAvatar ? p.theme.color.bg : 'white')};
  :hover {
    color: ${(p) => p.theme.color.logo};
    background-color: ${(p) => p.theme.color.bg};
    svg {
      fill: ${(p) => p.theme.color.logo};
    }
    span {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    .dot {
      text-decoration: none;
    }
  }
`;
const Title = styled.li`
  font-weight: 540;
  font-size: 1.5rem;
  position: relative;
  .isOwner {
    top: -5px;
    left: -20px;
    position: absolute;
    fill: ${(p) => p.theme.color.logo};
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
`;
