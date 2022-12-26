import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';
import { IPostForm } from '../../../../../types/post';
import { Flex_ } from '../../../../../../styles/global';

interface IBlockComment {
  _data: {
    isDesk: boolean;
    register: UseFormRegister<IPostForm>;
  };
}
export const BlockComment = ({ _data }: IBlockComment) => {
  const { register, isDesk } = _data;
  return (
    <Cont isDesk={isDesk}>
      <label htmlFor="private-mode">
        <span>댓글 기능 제한</span>
        <span>(Block Comment)</span>
      </label>
      <input type="checkbox" id="private-mode" {...register('onPrivate')} />
    </Cont>
  );
};
const Cont = styled(Flex_)`
  gap: 12px;
  padding: 0 10px;
  font-style: italic;
  justify-content: space-between;
  font-size: ${(p) => (p.isDesk ? '1.1rem' : '2.5rem')};
  label {
    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  input {
    width: ${(p) => (p.isDesk ? '1.4rem' : '3rem')};
    height: ${(p) => (p.isDesk ? '1.4rem' : '3rem')};
  }
`;
