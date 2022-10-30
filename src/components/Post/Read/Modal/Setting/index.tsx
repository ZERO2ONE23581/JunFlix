import styled from '@emotion/styled';
import { Svg } from '../../../../../Tools/Svg';
import { EllipsModal } from './EllipsModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { scaleVar } from '../../../../../../styles/variants';
import { Circle } from '../../../../../../styles/global';

interface ISetting {
  theme: boolean;
  isMyPost: boolean;
  setModal: Dispatch<SetStateAction<string>>;
}
export const Setting = ({ theme, isMyPost, setModal }: ISetting) => {
  const closeRead = () => setModal('');
  const [setting, setSetting] = useState(false);
  const closeSetting = () => setSetting(false);
  return (
    <Cont className="setting">
      <Circle
        className="circle-left"
        animate="animate"
        custom={theme}
        variants={scaleVar}
      >
        <Svg
          type="close_"
          theme={theme}
          item={{ size: '1.5rem' }}
          onClick={closeRead}
        />
      </Circle>
      <Circle
        className="circle-right"
        animate="animate"
        custom={theme}
        variants={scaleVar}
      >
        <Svg
          type="ellipsis"
          theme={theme}
          item={{ size: '1.5rem' }}
          onClick={() => setSetting((p) => !p)}
        />
        <EllipsModal
          _data={{ theme, setting, isMyPost, setModal, closeSetting }}
        />
      </Circle>
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  position: relative;
  .circle-right,
  .circle-left {
    width: 2rem;
    height: 2rem;
    top: 1rem;
    position: absolute;
  }
  .circle-left {
    left: 1.2rem;
  }
  .circle-right {
    right: 1.2rem;
  }
`;
