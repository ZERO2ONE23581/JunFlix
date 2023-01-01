import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Flex } from '../../../styles/global';
import { Btn } from '../../Tools/Button';
import { IResponsive } from '../../types/global';

interface IUnLogged extends IResponsive {
  isLoggedIn: boolean;
}
export const UnLogged = ({ _res, isLoggedIn }: IUnLogged) => {
  const router = useRouter();
  const { theme } = _res;
  const onClick = (type: string) => router.push(`/${type}`);
  return (
    <>
      {!isLoggedIn && (
        <Cont>
          <Btn
            type="button"
            onClick={() => onClick('login')}
            item={{ name: 'Login', theme, isClicked: true }}
          />
          <Btn
            type="button"
            item={{ name: 'Join', theme }}
            onClick={() => onClick('join')}
          />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Flex)`
  gap: 1rem;
  height: 4rem;
  width: fit-content;
  button {
    font-weight: 600;
    border-radius: 40px;
    padding: 0.7rem 1.5rem;
  }
`;
