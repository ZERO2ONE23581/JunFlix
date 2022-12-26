import styled from '@emotion/styled';
import { PostSetModal } from './Modal';
import { Svg } from '../../../../../Tools/Svg';
import { Circle } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { noneBorderVar } from '../../../../../../styles/variants';

interface ISetting {
  _data: {
    theme: boolean;
    host_id: number;
    isDesk: boolean;
    isMyPost: boolean;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const Setting = ({ _data }: ISetting) => {
  const { theme, isMyPost, isDesk } = _data;
  const size = isDesk ? '1.5rem' : '3rem';
  const closeSetting = () => setSetting(false);
  const [setting, setSetting] = useState(false);
  return (
    <>
      {isMyPost && (
        <Cont isDesk={isDesk}>
          <Circle
            custom={theme}
            animate="animate"
            className="setting_icon"
            variants={noneBorderVar}
          >
            <Svg
              theme={theme}
              item={{ size }}
              type="ellipsis"
              onClick={() => setSetting((p) => !p)}
            />
            <PostSetModal _data={{ ..._data, setting, closeSetting }} />
          </Circle>
        </Cont>
      )}
    </>
  );
};
const Cont = styled.div<{ isDesk: boolean }>`
  .setting_modal {
    .small {
      font-size: ${(p) => (p.isDesk ? '1rem' : '2rem')};
    }
    font-size: ${(p) => (p.isDesk ? '1.3rem' : '3rem')};
    width: ${(p) => (p.isDesk ? 'fit-content' : '400px')};
  }
  > .setting_icon {
    top: 1rem;
    right: 1rem;
    position: absolute;
    width: ${(p) => (p.isDesk ? '2rem' : '4.5rem')};
    height: ${(p) => (p.isDesk ? '2rem' : '4.5rem')};
  }
`;
