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
    isMyPost: boolean;
    setModal: Dispatch<SetStateAction<string>>;
  };
}
export const Setting = ({ _data }: ISetting) => {
  const { theme, isMyPost } = _data;
  const closeSetting = () => setSetting(false);
  const [setting, setSetting] = useState(false);
  return (
    <>
      {isMyPost && (
        <Cont
          className="icon"
          animate="animate"
          custom={theme}
          variants={noneBorderVar}
        >
          <Svg
            theme={theme}
            type="ellipsis"
            item={{ size: '1.5rem' }}
            onClick={() => setSetting((p) => !p)}
          />
          <PostSetModal _data={{ ..._data, setting, closeSetting }} />
        </Cont>
      )}
    </>
  );
};
const Cont = styled(Circle)`
  right: 1.2rem;
`;
