import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Circle } from '../../../../../../styles/global';
import { noneBorderVar } from '../../../../../../styles/variants';

interface IClose {
  _data: {
    theme: boolean;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const Close = ({ _data }: IClose) => {
  const { theme, setModal } = _data;
  return (
    <Cont
      className="icon"
      animate="animate"
      custom={theme}
      variants={noneBorderVar}
    >
      <Svg
        type="close_"
        theme={theme}
        onClick={() => setModal('')}
        item={{ size: '1.5rem' }}
      />
    </Cont>
  );
};
const Cont = styled(Circle)`
  left: 1.2rem;
`;
