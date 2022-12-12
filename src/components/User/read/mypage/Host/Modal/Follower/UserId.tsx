import styled from '@emotion/styled';
import { useGetUser } from '../../../../../../../libs/client/useUser';
import { useCapLetter } from '../../../../../../../libs/client/useTools';

interface IModalFollowUserId {
  host_id: number;
}
export const FollowUserId = ({ host_id }: IModalFollowUserId) => {
  const { userId } = useGetUser(host_id);
  return <Cont>{useCapLetter(userId)}</Cont>;
};
const Cont = styled.span`
  font-size: 1.4rem;
`;
