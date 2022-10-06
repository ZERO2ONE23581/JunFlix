import Link from 'next/link';
import styled from '@emotion/styled';
import { HoverBox } from '../../../components/Board/Read/List/Board/BoardHoverBox';
import { FollowBtn } from '../../Button/Follow/BoardFollowBtn';
import useUser from '../../../libs/client/useUser';

interface IBoardBoxInfo {
  data: any;
}
export const BoardBoxInfo = ({ data }: IBoardBoxInfo) => {
  const { loggedInUser } = useUser();
  const isOwner = Boolean(loggedInUser?.id === data?.UserID);
  return (
    <Cont>
      {!isOwner && <FollowBtn userId={data?.UserID!} boardId={data?.id} />}
      <Link href={`/user/${data?.UserID}/board/${data?.id}/${data?.title}`}>
        <a>
          <HoverBox
            data={{
              isOwner: isOwner,
              title: data.title,
              genre: data.genre,
              avatar: data.avatar!,
              userId: data.UserID!,
              intro: data.intro,
              username: data.user?.username,
            }}
          />
        </a>
      </Link>
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  a {
    display: flex;
    align-items: flex-end;
  }
`;
