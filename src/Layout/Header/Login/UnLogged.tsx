import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Btn } from '../../../Tools/Button';
import { Flex } from '../../../../styles/global';
import { IResponsive } from '../../../types/global';

interface IUnLogged extends IResponsive {
  isLoggedIn: boolean;
}
export const UnLogged = ({ _res, isLoggedIn }: IUnLogged) => {
  const router = useRouter();
  const { theme, isMobile } = _res;
  const onClick = (type: string) => router.push(`/${type}`);
  return (
    <>
      {!isLoggedIn && (
        <Cont>
          <Btn
            type="button"
            onClick={() => onClick('login')}
            item={{ name: 'Login', theme, isClicked: isMobile }}
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
  gap: 1.5rem;
  height: 4rem;
  button {
    font-weight: 600;
    font-size: 2.2rem;
    border-radius: 40px;
    padding: 0.7rem 1.5rem;
  }
`;
