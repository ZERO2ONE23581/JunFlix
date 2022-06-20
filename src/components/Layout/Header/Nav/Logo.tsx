import Link from 'next/link';
import styled from '@emotion/styled';
import { LogoSvg } from '../../../Style/Svg/Logo';

export const Logo = () => {
  return (
    <Cont>
      <Link href="/">
        <a>
          <LogoSvg />
        </a>
      </Link>
    </Cont>
  );
};
const Cont = styled.div`
  a {
    img {
      width: 100px;
      height: 100px;
    }
  }
`;
