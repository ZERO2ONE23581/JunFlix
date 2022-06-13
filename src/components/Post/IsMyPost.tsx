import styled from '@emotion/styled';
import useUser from '../../libs/client/useUser';

interface IIsMyPostProps {
  user_id: number;
}
export const IsMyPost = ({ user_id }: IIsMyPostProps) => {
  const { loggedInUser } = useUser();
  const isOwner = Boolean(loggedInUser?.id === user_id);
  return <Cont>{isOwner ? <IsOwnerTrue /> : null}</Cont>;
};
const IsOwnerTrue = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #2ecc71;
`;
const Cont = styled.article`
  position: absolute;
  top: 10px;
  left: 0px;
`;
