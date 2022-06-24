import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { IsOwner } from '../../../IsOwner';
import { IconBtn } from '../../../Style/Button/IconBtn';
import { FollowBoardBtn } from '../Follow/FollowBoardBtn';

export const TitleLayer = ({ board }: any) => {
  const router = useRouter();
  return (
    <Cont>
      <h1>{board?.title}</h1>
      <FollowBoardBtn USERID={board?.UserID!} BOARDID={board?.id!} />
      <IsOwner USERID={board?.UserID} />
      <IconBtn
        svgType="compass"
        onClick={() => router.push(`/user/all/boards`)}
      />
    </Cont>
  );
};
const Cont = styled.article`
  /* border: 1px solid blue; */
  gap: 30px;
  display: flex;
  align-items: center;
  align-content: center;
  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
  .is-owner {
    svg {
      position: relative;
    }
  }
`;
