import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import useUser from '../../../../../libs/client/useUser';
import { IconBtn } from '../../../../Tools/Button/IconBtn';

export const Top = () => {
  const router = useRouter();
  const { loggedInUser } = useUser();
  return (
    <Cont>
      <h1>{loggedInUser?.username}'s DashBoard</h1>
      <IconBtn
        size="2rem"
        type="button"
        svgType="setting"
        onClick={() => router.push(`/user/setting`)}
      />
    </Cont>
  );
};
const Cont = styled.div`
  gap: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
