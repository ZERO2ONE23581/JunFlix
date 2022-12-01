import styled from '@emotion/styled';
import { Avatar } from '../../../../Tools/Avatar';
import { Dispatch, SetStateAction } from 'react';
import { Flex } from '../../../../../styles/global';
import { ICmtForm } from '../../../../types/comments';
import { TextAreaWrap } from '../../../../Tools/Input/TextArea';
import {
  UseFormWatch,
  UseFormRegister,
  UseFormClearErrors,
} from 'react-hook-form';

interface ICreateModalInputs {
  _data: {
    theme: boolean;
    host_id: number;
    setPost: Dispatch<SetStateAction<string>>;
  };
  _useform: {
    error: string;
    watch: UseFormWatch<ICmtForm>;
    register: UseFormRegister<ICmtForm>;
    clearErrors: UseFormClearErrors<ICmtForm>;
  };
}
export const Inputs = ({ _data, _useform }: ICreateModalInputs) => {
  const { theme, host_id } = _data;
  const { clearErrors, watch, register, error } = _useform;
  return (
    <Cont>
      <Avatar _data={{ size: '4rem', isRound: true, theme, host_id }} />
      <TextAreaWrap
        _data={{
          theme,
          error,
          min: 150,
          max: 700,
          id: 'text',
          clearErrors,
          text: watch('text'),
          placeholder: 'Leave comments on this post...',
          register: register('text', { required: 'need_comment' }),
        }}
      />
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 1rem;
  width: 100%;
  padding-left: 0.2rem;
  align-items: flex-start;
  justify-content: flex-start;
  .textarea-wrap {
    min-width: 350px;
    width: fit-content;
  }
`;
