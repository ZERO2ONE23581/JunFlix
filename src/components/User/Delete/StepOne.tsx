import styled from '@emotion/styled';
import { Btn } from '../../../Tools/Button';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../styles/global';
import { MobModal } from '../../../../styles/mobile';
import { opacityVar } from '../../../../styles/variants';
import { useResponsive } from '../../../libs/client/useTools';

interface IStepOne {
  _data: {
    theme: boolean;
    delAcct: boolean;
    setDelAcct: Dispatch<SetStateAction<boolean>>;
  };
}
export const StepOne = ({ _data }: IStepOne) => {
  const { isDesk } = useResponsive();
  const { theme, delAcct, setDelAcct } = _data;
  return (
    <>
      {!delAcct && (
        <Cont isDesk={isDesk}>
          <Flex
            exit="exit"
            className="wrap"
            animate="animate"
            initial="initial"
            variants={opacityVar}
          >
            <Btn
              type="button"
              onClick={() => setDelAcct(true)}
              item={{ theme, name: 'Delete' }}
            />
          </Flex>
        </Cont>
      )}
    </>
  );
};
const Cont = styled(MobModal)`
  .wrap {
    width: 100%;
    button {
      width: fit-content;
      padding: 1rem 2rem;
      border-radius: 40px;
    }
  }
`;
