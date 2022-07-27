import styled from '@emotion/styled';
import useUser from '../../../../libs/client/useUser';
import { ProfileAvatar } from '../../../Avatar/ProfileAvatar';
import { Counts } from './Counts';
import { Detail } from './Detail';
import { Top } from './Top';

export const DashBoard = () => {
  const { loggedInUser } = useUser();

  return (
    <Cont className="dashboard">
      <Top />
      <div className="flex">
        <ProfileAvatar size={'8rem'} avatar={loggedInUser?.avatar} />
        <Detail />
      </div>
      <Counts />
    </Cont>
  );
};
const Cont = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .flex {
    gap: 30px;
    display: flex;
    margin-top: 15px;
    align-items: center;
    justify-content: start;
  }
`;
