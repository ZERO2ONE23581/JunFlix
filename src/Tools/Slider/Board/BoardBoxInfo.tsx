import Link from 'next/link';
import styled from '@emotion/styled';
import { HoverBox } from '../../../components/Board/Read/List/Board/hoverBox';
import { FollowBtn } from '../../Button/Follow/BoardFollowBtn';
import useUser from '../../../libs/client/useUser';
import { ITheme } from '../../../../styles/theme';

interface IBoardBoxInfo extends ITheme {
  data: any;
}
export const BoardBoxInfo = ({ data, theme }: IBoardBoxInfo) => {
  const { loggedInUser } = useUser();
  const isOwner = Boolean(loggedInUser?.id === data?.UserID);
  return (
    <Cont>
      {!isOwner && <FollowBtn userId={data?.UserID!} boardId={data?.id} />}
      <Link href={`/board/${data?.id}/${data?.title}`}>
        <a>
          <HoverBox
            theme={theme}
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
