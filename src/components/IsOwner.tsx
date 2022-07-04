import styled from '@emotion/styled';
import useUser from '../libs/client/useUser';
import { Svg } from './Style/Svg/Svg';

interface IIsOwnerProps {
  USERID: number;
}
export const IsOwner = ({ USERID }: IIsOwnerProps) => {
  const { loggedInUser } = useUser();
  const isMy = (id: number) => Boolean(loggedInUser?.id === id);
  return (
    <>
      <Cont className="is-owner" isMyBoard={isMy(USERID)}>
        <Svg type="isOwner" />
      </Cont>
    </>
  );
};
const Cont = styled.div<{ isMyBoard: boolean }>`
  display: ${(p) => !p.isMyBoard && 'none'};
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    fill: #2ecc71;
  }
`;
