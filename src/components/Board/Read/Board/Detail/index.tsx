import styled from '@emotion/styled';
import useUser from '../../../../../libs/client/useUser';
import { IBoard } from '../../../../../types/board';
import { Svg } from '../../../../Style/Svg/Svg';
import { CapFirstLetters } from '../../../../Tools';
import { FollowBoard } from '../../List/Detail/Follow';
import { FollowCounts } from './Follow';

export const Info = ({ board }: IBoard) => {
  const { isLoggedIn, loggedInUser } = useUser();
  const isMyBoard = (userId: number) => Boolean(loggedInUser?.id === userId);
  return (
    <Cont>
      <Flex>
        <Title>{CapFirstLetters(board?.title!)}</Title>
        <Svg type={board?.genre!} size="3rem" />
        {isLoggedIn && !isMyBoard(board?.UserID!) && (
          <FollowBoard USERID={board?.UserID!} BOARDID={board?.id!} />
        )}
      </Flex>
      <FollowCounts counts={board?._count} />
      <Intro isIntro={Boolean(board?.intro)}>"{board?.intro}"</Intro>
    </Cont>
  );
};
const Cont = styled.article`
  max-width: 700px;
  gap: 15px;
  display: flex;
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
  font-size: 1.2rem;
  display: ${(p) => !p.isIntro && 'none'};
`;