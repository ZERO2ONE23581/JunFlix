import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../../../../../Tools/OverlayBg';
import { List } from '../../../../../User/Read/MyPage/List';
import { MiniModal } from '../../../../../../../styles/global';
import { smallModalVar } from '../../../../../Board/Read/Board/Title/Setting';

interface ISetGridModal {
  _data: {
    modal: string;
    theme: boolean;
    closeModal: () => void;
    setMax: Dispatch<SetStateAction<number>>;
  };
}
export const SetGridModal = ({ _data }: ISetGridModal) => {
  const theme = _data?.theme!;
  const modal = _data?.modal!;
  const setMax = _data?.setMax!;
  return (
    <AnimatePresence>
      {modal === 'grid' && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            className="grid_modal"
            variants={smallModalVar}
          >
            <ul>
              <li className="small">Grid size</li>
              <List
                _data={{
                  theme,
                  onClick: () => setMax(6),
                  name: { eng: 'Min', kor: '최소로' },
                }}
              />
              <List
                _data={{
                  theme,
                  onClick: () => setMax(5),
                  name: { eng: 'Narrow', kor: '좁게' },
                }}
              />
              <List
                _data={{
                  theme,
                  onClick: () => setMax(4),
                  name: { eng: 'Default', kor: '기본' },
                }}
              />
              <List
                _data={{
                  theme,
                  onClick: () => setMax(3),
                  name: { eng: 'Wide', kor: '넓게' },
                }}
              />
              <List
                _data={{
                  theme,
                  onClick: () => setMax(2),
                  name: { eng: 'Max', kor: '최대로' },
                }}
              />
            </ul>
          </Cont>
          <OverlayBg closeModal={_data.closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MiniModal)`
  ul {
    li {
    }
  }
`;
