import styled from '@emotion/styled';
import { IForm } from '../../../types/global';
import { Flex } from '../../../../styles/global';
import { UseFormRegister } from 'react-hook-form';

interface IPrivate {
  register: UseFormRegister<IForm>;
}

export const Private = ({ register }: IPrivate) => {
  return (
    <>
      <Cont>
        <Flex>
          <span>비공개 보드로 전환</span>
          <span>(Change to Private Board)</span>
        </Flex>
        <input type="checkbox" id="private-mode" {...register('onPrivate')} />
      </Cont>
    </>
  );
};
export const Cont = styled(Flex)`
  gap: 12px;
  font-size: 1.3rem;
  justify-content: flex-start;
  > div {
    gap: 0.2rem;
    width: fit-content;
  }
  input {
    width: 1.8rem;
    height: 1.8rem;
  }
`;
