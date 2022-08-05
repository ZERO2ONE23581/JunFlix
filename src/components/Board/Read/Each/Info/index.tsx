import { Counts } from './Counts';
import styled from '@emotion/styled';
import { Follow } from '../../../Follow';
import { Svg } from '../../../../Tools/Svg';
import { IQuery } from '../../../../../types/global';
import useUser from '../../../../../libs/client/useUser';
import { useCapLetters } from '../../../../../libs/client/useTools';
import { Setting } from '../Setting';
import { Dispatch, SetStateAction } from 'react';

interface IInfo extends IQuery {
  title: string;
  genre: string;
  intro: string;
  edit: boolean;
  isMyBoard: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setPreview: Dispatch<SetStateAction<string>>;
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
  edit,
  setEdit,
  setPreview,
}: IInfo) => {
  const { isLoggedIn } = useUser();
  return (
    <Cont>
      <Flex>
        <div className="flex">
          <Title>{useCapLetters(title)}</Title>
          <Svg type={genre} size="2.2rem" />
          {isLoggedIn && !isMyBoard && (
            <Follow userId={query.userId!} boardId={query.boardId!} />
          )}
        </div>
        <Setting edit={edit} setEdit={setEdit} setPreview={setPreview!} />
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
  min-width: 900px;
  align-items: center;
  justify-content: space-between;
  .flex {
    gap: 10px;
    display: flex;
    align-items: center;
  }
`;
const Title = styled.h1`
  font-size: 2.2rem;
`;
const Intro = styled.p<{ isIntro: boolean }>`
  font-size: 1.3rem;
  display: ${(p) => !p.isIntro && 'none'};
`;
