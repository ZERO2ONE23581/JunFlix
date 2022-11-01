import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';
import { IPostForm } from '../../../../../../types/post';
import { SetPrivate } from '../../../../../../../styles/global';

interface IBlockComment {
  register: UseFormRegister<IPostForm>;
}
export const BlockComment = ({ register }: IBlockComment) => {
  return (
    <Cont className="block_cmt">
      <label htmlFor="private-mode">
        <span>댓글 기능 제한</span>
        <span>(Block Comment)</span>
      </label>
      <input type="checkbox" id="private-mode" {...register('onPrivate')} />
    </Cont>
  );
};
const Cont = styled(SetPrivate)`
  padding: 0 10px;
  justify-content: space-between;
`;
