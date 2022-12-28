import { IPage } from '../_app';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Svg } from '../../src/Tools/Svg';
import { Avatar } from '../../src/Tools/Avatar';
import { Head_ } from '../../src/Tools/Title/Head';
import { PageTitle } from '../../src/Tools/Title/Page';
import { useGetUsers } from '../../src/libs/client/useUser';
import { BG, Flex, FlexCol_, Grid } from '../../styles/global';
import { useResponsive } from '../../src/libs/client/useTools';

const Users: NextPage<IPage> = ({ theme }) => {
  const { users } = useGetUsers();
  const length = users?.length!;
  const tops = users?.slice(0, 3);
  const rests = users?.slice(3, length);
  const grid = rests?.length! > 5 ? 5 : rests?.length!;
  const grid_ = rests?.length! > 3 ? 3 : rests?.length!;
  const isTop = (num: number) => Boolean(num === 0);
  const Txt = (type: string, num: number) => {
    if (num > 1) return `${num} ${type}s`;
    else return `${num} ${type}`;
  };
  const { isDesk } = useResponsive();
  const size = isDesk ? '8.5rem' : '10rem';
  const size_ = isDesk ? '9rem' : '9rem';
  const boxes = isDesk ? grid : grid_;
  return (
    <>
      <Head_ title="Users" />
      <Cont isDesk={isDesk}>
        <PageTitle type="users" theme={theme} isWhite={true} />
        <Ranks>
          {tops?.map((user) => (
            <User key={user.id} className="user" isDesk={isDesk}>
              {isTop(tops?.indexOf(user)) && (
                <Svg
                  type="crown"
                  theme={theme}
                  item={{ size: '3.5rem', fill: 'whitesmoke' }}
                />
              )}
              <Avatar _data={{ size: size_, theme, host_id: user.id }} />
              <span className="userId">@{user.userId.toUpperCase()}</span>
              <Info isDesk={isDesk}>
                <span>{Txt('Follower', user._count.followers)}</span>
                <span>{Txt('Post', user._count.posts)}</span>
              </Info>
            </User>
          ))}
        </Ranks>
        <Rest box={boxes}>
          {rests?.map((user) => (
            <Avatar
              isWhite
              key={user.id}
              _data={{ size, theme, host_id: user.id }}
            />
          ))}
        </Rest>
      </Cont>
    </>
  );
};
export default Users;

const Cont = styled(BG)`
  padding-top: 0rem;
  .page-title {
    margin-bottom: 2rem;
    font-size: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    svg {
      width: ${(p) => (p.isDesk ? '2rem' : '4rem')};
      height: ${(p) => (p.isDesk ? '2rem' : '4rem')};
    }
    .txt {
      padding: ${(p) => (p.isDesk ? '0.5rem 2rem' : '1rem 3rem')};
    }
  }
`;

const Ranks = styled(Flex)`
  gap: 1.5rem;
  margin: 0 auto;
  margin-top: 5rem;
  width: fit-content;
`;
const User = styled(FlexCol_)`
  gap: 0.5rem;
  width: fit-content;
  position: relative;
  font-size: ${(p) => (p.isDesk ? '1.5rem' : '2.2rem')};
  :first-of-type {
    font-size: ${(p) => (p.isDesk ? '1.8rem' : '2.5rem')};
    > .userId {
      color: ${(p) => p.theme.color.logo};
    }
    .avatar {
      border: 10px solid ${(p) => p.theme.color.logo};
      width: ${(p) => (p.isDesk ? '11rem' : '12rem')};
      height: ${(p) => (p.isDesk ? '11rem' : '12rem')};
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
const Info = styled(FlexCol_)`
  gap: 0.5rem;
  font-style: italic;
  font-size: ${(p) => (p.isDesk ? '1.3rem' : '2.2rem')};
`;
const Rest = styled(Grid)`
  gap: 4rem;
  margin: 1rem auto;
  margin-top: 4rem;
  width: fit-content;
`;
