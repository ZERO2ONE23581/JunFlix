import styled from '@emotion/styled';
import { IForm } from '../../../types/global';
import { Flex } from '../../../../styles/global';
import { UseFormRegister } from 'react-hook-form';

interface IPrivate {
  isDesk: boolean;
  register: UseFormRegister<IForm>;
}

export const Private = ({ register, isDesk }: IPrivate) => {
  return (
    <>
      <Cont className="private_mode">
        <Flex>
          <span>비공개 모드</span>
          <span>(Private Mode)</span>
        </Flex>
        <input type="checkbox" id="private-mode" {...register('onPrivate')} />
      </Cont>
    </>
  );
};
export const Cont = styled(Flex)`
  gap: 12px;
  margin-top: 2rem;
  justify-content: space-between;
  > div {
    gap: 0.2rem;
    width: fit-content;
  }
  input {
  }
`;
