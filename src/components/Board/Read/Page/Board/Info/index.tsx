import { Genre } from './Genre';
import styled from '@emotion/styled';
import { IBoard } from '../../../../../../types/board';
import { FollowCounts } from '../../../Follow/counts';
import { CapFirstLetters } from '../../../../../Tools';

export const Info = ({ board }: IBoard) => {
  return (
    <Cont>
      <Title>
        <h1>{CapFirstLetters(board?.title!)}</h1>
        <Genre genre={board?.genre!} />
      </Title>
      <FollowCounts counts={board?._count} />
      <Intro isIntro={Boolean(board?.intro)}>"{board?.intro}"</Intro>
    </Cont>
  );
};
const Cont = styled.article`
  max-width: 800px;
  gap: 15px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
  h1 {
    font-size: 2.2rem;
  }
`;
const Intro = styled.p<{ isIntro: boolean }>`
  font-size: 1.2rem;
  display: ${(p) => !p.isIntro && 'none'};
`;
