import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { IBoardForm } from '../../../../types/board';
import { FlexCol } from '../../../../../styles/global';
import { redColor } from '../../../../../styles/variants';
import { TextLength } from '../../../../Tools/Input/TextLength';
import { UseLength, useResponsive } from '../../../../libs/client/useTools';
import { UseFormRegister, UseFormWatch } from 'react-hook-form';

interface IInputs {
  _data: {
    max: number;
    theme: boolean;
    watch?: UseFormWatch<IBoardForm>;
    register?: UseFormRegister<IBoardForm>;
  };
}
export const Inputs = ({ _data }: IInputs) => {
  const { isDesk } = useResponsive();
  const { register, watch, max, theme } = _data;
  const typed = UseLength(watch!('title'));
  return (
    <Cont className="title-input">
      <label htmlFor="title">Title</label>
      <Input
        id="title"
        type="text"
        variants={vars}
        animate="animate"
        whileFocus="focus"
        placeholder="보드 제목을 작성하세요."
        {...register!('title', { required: 'need_title' })}
      />
      <TextLength isDesk={isDesk} theme={theme} number={{ max, typed }} />
    </Cont>
  );
};
const Cont = styled(FlexCol)`
  gap: 1rem;
  height: 100%;
  justify-content: center;
  .text-length {
    font-style: italic;
    width: fit-content;
  }
`;
const Input = styled(motion.input)`
  border: none;
  outline: none;
  color: inherit;
  padding: 0 2rem;
  font-size: 1.5rem;
  padding-bottom: 0.5rem;
  background-color: inherit;
  ::placeholder {
    text-align: center;
  }
`;
const vars = {
  animate: () => ({
    scale: 1,
    borderBottom: `3px solid transparent`,
  }),
  focus: () => ({
    scale: 1.1,
    borderBottom: `3px solid ${redColor}`,
  }),
};
