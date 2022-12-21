import styled from '@emotion/styled';
import { EllipsModal } from './EllipsModal';
import { Svg } from '../../../../../Tools/Svg';
import { Circle } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { modalVar } from '../../../../../../styles/variants';

interface ISetting {
  theme: boolean;
  host_id: number;
  isMyPost: boolean;
  setModal: Dispatch<SetStateAction<string>>;
}
export const Setting = ({ host_id, theme, isMyPost, setModal }: ISetting) => {
  const closeRead = () => setModal('');
  const [setting, setSetting] = useState(false);
  const closeSetting = () => setSetting(false);
  return (
    <>
      <Cont className="setting">
        <Close
          className="icon"
          animate="animate"
          variants={modalVar}
          custom={{ theme, duration: 0.6 }}
        >
          <Svg
            type="close_"
            theme={theme}
            onClick={closeRead}
            item={{ size: '1.5rem' }}
          />
        </Close>

        {isMyPost && (
          <Ellips
            className="icon"
            animate="animate"
            variants={modalVar}
            custom={{ theme, duration: 0.6 }}
          >
            <Svg
              theme={theme}
              type="ellipsis"
              item={{ size: '1.5rem' }}
              onClick={() => setSetting((p) => !p)}
            />
            <EllipsModal
              _data={{
                theme,
                setting,
                isMyPost,
                setModal,
                host_id,
                closeSetting,
              }}
            />
          </Ellips>
        )}
      </Cont>
    </>
  );
};

const Ellips = styled(Circle)`
  right: 1.2rem;
`;
const Close = styled(Circle)`
  left: 1.2rem;
`;
const Cont = styled.div`
  width: 100%;
  position: relative;
  .icon,
  .icon {
    width: 2rem;
    height: 2rem;
    top: 1rem;
    position: absolute;
  }
`;
