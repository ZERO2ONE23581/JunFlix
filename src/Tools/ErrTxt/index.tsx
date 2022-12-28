import { UseMsg } from '../../libs/client/useMsg';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ITheme } from '../../../styles/theme';
import { useResponsive } from '../../libs/client/useTools';
import { FlexCol, Mob } from '../../../styles/global';

interface IErrTxt extends ITheme {
  error: string;
}
export const ErrTxt = ({ theme, error }: IErrTxt) => {
  const { isDesk } = useResponsive();
  const { txt } = UseMsg({ error });
  return (
    <>
      {error && (
        <Cont isDesk={isDesk}>
          <FlexCol
            exit="exit"
            initial="initial"
            animate="animate"
            className="err_msg"
            variants={errVar}
          >
            <span className="kor">{txt.kor}</span>
            <span>{txt.eng}</span>
          </FlexCol>
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Mob)`
  .err_msg {
    margin: 1rem auto;
    font-size: ${(p) => (p.isDesk ? '1.2rem' : '2.5rem')};
    .kor {
      margin-bottom: 0.2rem;
      font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.2rem')};
    }
    span {
      display: block;
      text-align: center;
      font-style: italic;
    }
  }
`;
const errVar = {
  exit: () => ({ opacity: 0, scale: 0.1 }),
  initial: () => ({ opacity: 0, scale: 0.1 }),
  animate: () => ({
    scale: 1,
    opacity: 1,
    color: '#E50914',
    transition: { duration: 0.3 },
  }),
};
