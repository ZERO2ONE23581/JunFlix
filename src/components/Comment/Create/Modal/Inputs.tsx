import {
  UseFormWatch,
  UseFormRegister,
  UseFormClearErrors,
} from 'react-hook-form';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction } from 'react';
import { Avatar } from '../../../../Tools/Avatar';
import { Flex } from '../../../../../styles/global';
import { ICmtForm } from '../../../../types/global';
import { TextAreaWrap } from '../../../../Tools/Input/TextArea';

export const Inputs = ({ _data, _useform }: ICreateModalInputs) => {
  const { theme, host_id } = _data;
  const { clearErrors, watch, register, error } = _useform;
  return (
    <Cont className="inps">
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
`;
interface ICreateModalInputs {
  _data: {
    theme: boolean;
    isDesk: boolean;
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
