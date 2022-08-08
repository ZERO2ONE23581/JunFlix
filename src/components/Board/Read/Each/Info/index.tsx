import { Counts } from './Counts';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../Tools/Svg';
import { FollowBtn } from '../../../FollowBtn';
import { Dispatch, SetStateAction } from 'react';
import useUser from '../../../../../libs/client/useUser';
import { useCapLetters } from '../../../../../libs/client/useTools';

interface IInfo {
  counts: {
    posts: number;
    followers: number;
  };
  title: string;
  genre: string;
  intro: string;
  setText: Dispatch<SetStateAction<boolean>>;
}
export const Info = ({ title, genre, intro, counts, setText }: IInfo) => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  const { user_id, board_id } = router.query;
  const isMyBoard = Boolean(loggedInUser?.id === Number(user_id));
  return (
    <>
      <Cont>
        <div className="flex">
          <Title>
            <span>{useCapLetters(title)}</span>
            <span>
              <Svg type={genre} size="2.2rem" />
            </span>
          </Title>
          {!isMyBoard && (
            <FollowBtn
              setText={setText}
              userId={Number(user_id)}
              boardId={Number(board_id)}
            />
          )}
        </div>
        <Counts counts={counts} />
        <Intro isIntro={Boolean(intro)}>"{intro}"</Intro>
      </Cont>
    </>
  );
};
const Cont = styled.article`
  gap: 15px;
  display: flex;
  max-width: 980px;
  flex-direction: column;
  .flex {
    gap: 20px;
    display: flex;
    max-width: 700px;
    align-items: center;
  }
`;
const Title = styled.h1`
  font-size: 2.2rem;
  span {
    margin-right: 10px;
    svg {
      pointer-events: none;
    }
  }
`;
const Intro = styled.p<{ isIntro: boolean }>`
  font-size: 1.3rem;
  display: ${(p) => !p.isIntro && 'none'};
`;
