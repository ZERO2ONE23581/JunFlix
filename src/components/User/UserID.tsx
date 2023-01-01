import styled from '@emotion/styled';
import { Flex } from '../../../styles/global';
import { UseCapLetter } from '../../libs/client/useTools';
import { useGetUser } from '../../libs/client/useUser';

interface IModalFollowUserId {
  host_id: number;
}
export const UserID = ({ host_id }: IModalFollowUserId) => {
  const { userId, username } = useGetUser(host_id);
  const name = username ? username : userId;
  return (
    <>
      <Cont className="userId">{UseCapLetter(name)}</Cont>
    </>
  );
};
const Cont = styled(Flex)``;
