import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../libs/client/useUser';
import { IconBtn } from '../../Style/Button/IconBtn';
import { Setting } from './Setting';

export const BtnWrap = () => {
  const { loggedInUser } = useUser();
  const router = useRouter();
  const { user_id } = router.query;
  const IsOwner = String(loggedInUser?.id) === user_id;
  return (
    <Cont>
      <IconBtn
        type="button"
        svgType="compass"
        onClick={() => router.push(`/user/all/reviews`)}
      />
      {IsOwner && <Setting />}
    </Cont>
  );
};
const Cont = styled.div`
  z-index: 2;
  position: fixed;
  top: 20%;
  right: 3%;
  gap: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
