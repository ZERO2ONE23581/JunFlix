import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Modal } from '../../styles/global';
import { variants } from '../../styles/variants';
import { OverlayBg } from '../Tools/OverlayBg';
import { Svg } from '../Tools/Svg';
import { Wrap } from './User/Read/Wrap';

interface IVerifyResult {
  _data: {
    theme: boolean;
    userId: string;
    verify: boolean;
  };
}
export const VerifyResult = ({ _data }: IVerifyResult) => {
  const router = useRouter();
  const onSvg = () => router.replace('/login');
  const { theme, userId, verify: open } = _data;
  return (
    <AnimatePresence>
      <>
        {open && (
          <>
            <Cont
              custom={theme}
              variants={variants}
              exit="exit"
              initial="initial"
              animate="animate"
            >
              <Svg type="close" theme={theme} onClick={onSvg} />
              <Wrap _data={{ theme, userId }} />
            </Cont>
            <OverlayBg />
          </>
        )}
      </>
    </AnimatePresence>
  );
};
const Cont = styled(Modal)`
  top: 40vh;
  z-index: 100;
  font-size: 1.5rem;
  width: fit-content;
  height: fit-content;
  padding: 1.5rem 4rem;
  .red {
    margin: 10px;
    color: ${(p) => p.theme.color.logo};
  }
  button {
    width: 80px;
    margin: 10px auto 0;
  }
`;
