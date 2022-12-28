import styled from '@emotion/styled';
import { Flex } from '../../../../../../../../styles/global';
import { useGetUser } from '../../../../../../../libs/client/useUser';
import { useCapLetter } from '../../../../../../../libs/client/useTools';

interface IModalFollowUserId {
  host_id: number;
}
export const UserID = ({ host_id }: IModalFollowUserId) => {
  const { userId, username } = useGetUser(host_id);
  const name = username ? username : userId;
  return (
    <>
      <Cont className="userId">{useCapLetter(name)}</Cont>
    </>
  );
};
const Cont = styled(Flex)``;
