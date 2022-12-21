import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { List } from '../../../../User/Read/MyPage/List';
import { MiniModal } from '../../../../../../styles/global';
import { smallModalVar } from '../../Board/Title/Setting_Modal';
import { useCapLetters } from '../../../../../libs/client/useTools';

interface IFilterModal {
  _data: {
    modal: string;
    theme: boolean;
    closeModal: () => void;
    setGenre: Dispatch<SetStateAction<{ select: boolean; type: string }>>;
  };
}

export const FilterModal = ({ _data }: IFilterModal) => {
  const { theme, modal, closeModal, setGenre } = _data;
  const useName = (txt: string) => {
    const kor = () => {
      if (txt === 'drama') return '드라마';
      if (txt === 'action') return '액션';
      if (txt === 'horror') return '호러';
      if (txt === 'comedy') return '코미디';
      if (txt === 'romance') return '로맨스';
      if (txt === 'fantasy') return '판타지';
      if (txt === 'mystery') return '미스터리';
      if (txt === 'thriller') return '스릴러';
      if (txt === 'adventure') return '모험';
    };
    if (txt === 'all') return { eng: 'All', kor: '모든 장르' };
    if (txt === 'sf') return { eng: 'SF', kor: '공상과학소설' };
    if (txt === '') return { eng: 'None', kor: '장르 없음' };
    else return { eng: useCapLetters(txt), kor: kor() };
  };
  const onClick = (genre: string) => {
    setGenre((p) => ({ ...p, select: true }));
    if (genre === 'all') return setGenre((p) => ({ ...p, type: 'all' }));
    else return setGenre((p) => ({ ...p, type: genre }));
  };
  return (
    <AnimatePresence>
      {modal === 'filter' && (
        <>
          <Cont
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            variants={smallModalVar}
            className="filter-modal"
          >
            <ul>
              <li className="small">Genre (장르별로 보기)</li>
              {array.map((genre) => (
                <List
                  key={array.indexOf(genre)}
                  _data={{
                    theme,
                    onClick: () => onClick(genre),
                    svg: genre === 'all' ? 'film' : genre ? genre : 'film',
                    name: {
                      eng: useName(genre)?.eng!,
                      kor: useName(genre)?.kor!,
                    },
                  }}
                />
              ))}
            </ul>
          </Cont>
          <OverlayBg closeModal={closeModal} />
        </>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(MiniModal)`
  ul {
    li {
      gap: 0rem;
      display: flex;
      align-items: center;
      padding: 0.3rem 1rem;
      justify-content: space-between;
    }
  }
`;
const array = [
  'all',
  'sf',
  'drama',
  'action',
  'horror',
  'comedy',
  'romance',
  'fantasy',
  'mystery',
  'thriller',
  'adventure',
  '',
];
