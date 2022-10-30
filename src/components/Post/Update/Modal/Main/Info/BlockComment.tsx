import styled from '@emotion/styled';
import { IPostForm } from '../../../../../../types/post';
import { UseFormRegister } from 'react-hook-form';
import { Setting } from '../../../../../../../styles/global';

interface IBlockComment {
  register: UseFormRegister<IPostForm>;
}
export const BlockComment = ({ register }: IBlockComment) => {
  return (
    <Container className="block_cmt">
      <label htmlFor="private-mode">
        <span>댓글 기능 제한</span>
        <span>(Block Comment)</span>
      </label>
      <input type="checkbox" id="private-mode" {...register('onPrivate')} />
    </Container>
  );
};
const Container = styled(Setting)`
  padding: 0 10px;
  justify-content: space-between;
`;
