import styled from '@emotion/styled';
import { useCapLetters } from '../../../../../libs/client/useTools';
import useUser from '../../../../../libs/client/useUser';
import { IQuery } from '../../../../../types/global';
import { Svg } from '../../../../Tools/Svg';

import { Follow } from '../../../Follow';
import { Counts } from './Counts';

interface IInfo extends IQuery {
  isMyBoard: boolean;
  title: string;
  genre: string;
  intro: string;
  counts: {
    posts: number;
    followers: number;
  };
}
export const Info = ({
  query,
  title,
  genre,
  intro,
  counts,
  isMyBoard,
}: IInfo) => {
  const { isLoggedIn } = useUser();
  return (
    <Cont>
      <Flex>
        <Title>{useCapLetters(title)}</Title>
        <Svg type={genre} size="2.2rem" />
        {isLoggedIn && !isMyBoard && (
          <Follow userId={query.userId!} boardId={query.boardId!} />
        )}
      </Flex>
      <Counts counts={counts} />
      <Intro isIntro={Boolean(intro)}>"{intro}"</Intro>
    </Cont>
  );
};
const Cont = styled.article`
  gap: 15px;
  display: flex;
  max-width: 980px;
  flex-direction: column;
`;
const Flex = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 2.2rem;
`;
const Intro = styled.p<{ isIntro: boolean }>`
  font-size: 1.3rem;
  display: ${(p) => !p.isIntro && 'none'};
`;
