import { IPage } from '../_app';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Svg } from '../../src/Tools/Svg';
import { Avatar } from '../../src/Tools/Avatar';
import { Head_ } from '../../src/Tools/head_title';
import { useGetUsers } from '../../src/libs/client/useUser';
import { PageHeading } from '../../src/components/PageHeading';
import { Flex, FlexCol, FlexPage, Grid, Page } from '../../styles/global';

const Users: NextPage<IPage> = ({ theme }) => {
  const { users, noData } = useGetUsers();
  const length = users?.length!;
  const tops = users?.slice(0, 3);
  const rests = users?.slice(3, length);
  const grid = rests?.length! > 5 ? 5 : rests?.length!;
  const isTop = (num: number) => Boolean(num === 0);
  const Txt = (type: string, num: number) => {
    if (num > 1) return `${num} ${type}s`;
    else return `${num} ${type}`;
  };

  return (
    <>
      <Head_ title="Users" />
      <Cont>
        <PageHeading type="users" theme={theme} />
        <Ranks>
          {tops?.map((user) => (
            <User key={user.id} className="user">
              {isTop(tops?.indexOf(user)) && (
                <Svg type="crown" theme={theme} item={{ size: '3.5rem' }} />
              )}
              <Avatar _data={{ size: '10rem', theme, host_id: user.id }} />
              <span className="userId">@{user.userId.toUpperCase()}</span>
              <Info>
                <span>{Txt('Follower', user._count.followers)}</span>
                <span>{Txt('Post', user._count.posts)}</span>
              </Info>
            </User>
          ))}
        </Ranks>
        <Rest box={grid}>
          {rests?.map((user) => (
            <Avatar
              key={user.id}
              _data={{ size: '9.5rem', theme, host_id: user.id }}
            />
          ))}
        </Rest>
      </Cont>
    </>
  );
};
export default Users;

const Cont = styled(FlexPage)`
  gap: 2rem;
  justify-content: flex-start;
  .page-title {
    margin-bottom: 3rem;
  }
`;
const Ranks = styled(Flex)`
  gap: 4rem;
  width: fit-content;
`;
const User = styled(FlexCol)`
  gap: 0.5rem;
  width: fit-content;
  font-size: 1.5rem;
  position: relative;
  :first-of-type {
    font-size: 1.8rem;
    > .userId {
      color: ${(p) => p.theme.color.logo};
    }
    .avatar {
      width: 12rem;
      height: 12rem;
      border: 10px solid ${(p) => p.theme.color.logo};
    }
  }
  > .userId {
    color: ${(p) => p.theme.color.lightBlue};
  }
  .crown {
    top: -4rem;
    position: absolute;
  }
`;
const Info = styled(Flex)`
  gap: 0.5rem;
  font-size: 1.3rem;
  font-style: italic;
  .data {
    margin-left: 0.2rem;
  }
`;
const Rest = styled(Grid)`
  gap: 4rem;
  width: fit-content;
  border: 5px solid hotpink;
`;
