import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { Dispatch, SetStateAction } from 'react';
import { Circle } from '../../../../../../styles/global';
import { noneBorderVar } from '../../../../../../styles/variants';

interface IClose {
  _data: {
    theme: boolean;
    isDesk: boolean;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const Close = ({ _data }: IClose) => {
  const { theme, setModal, isDesk } = _data;
  const size = isDesk ? '1.5rem' : '3rem';
  const onClick = () => setModal('');
  return (
    <Cont isDesk={isDesk}>
      <Circle
        custom={theme}
        animate="animate"
        className="close_icon"
        variants={noneBorderVar}
      >
        <Svg type="close_" theme={theme} item={{ size }} onClick={onClick} />
      </Circle>
    </Cont>
  );
};
const Cont = styled.div<{ isDesk: boolean }>`
  > .close_icon {
    top: 1rem;
    left: 1rem;
    position: absolute;
    width: ${(p) => (p.isDesk ? '2rem' : '4.5rem')};
    height: ${(p) => (p.isDesk ? '2rem' : '4.5rem')};
  }
`;
