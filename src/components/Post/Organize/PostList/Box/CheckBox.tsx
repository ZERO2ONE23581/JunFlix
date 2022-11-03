import styled from '@emotion/styled';
import { UseFormRegister } from 'react-hook-form';
import { Svg } from '../../../../../Tools/Svg';
import { Flex } from '../../../../../../styles/global';
import { IPostForm } from '../../../../../types/post';
import { variants } from '../../../../../../styles/variants';

interface ICheckBox {
  _data: {
    post_id: number;
    theme: boolean;
    isChecked: boolean;
    register?: UseFormRegister<IPostForm>;
  };
}
export const CheckBox = ({ _data }: ICheckBox) => {
  const { post_id, register, isChecked, theme } = _data;
  return (
    <>
      <Cont
        custom={theme}
        animate="animate"
        variants={variants}
        className="checkbox"
      >
        {isChecked && (
          <Svg type="check" theme={theme} item={{ size: '1.3rem' }} />
        )}
      </Cont>
      <Input
        id="chosenId"
        value={post_id}
        type="checkbox"
        className="checkbox_input"
        {...register!('chosenId'!)}
      />
    </>
  );
};
const Cont = styled(Flex)`
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  position: absolute;
  border-radius: 5px;
`;
const Input = styled.input`
  opacity: 0;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  position: absolute;
`;
