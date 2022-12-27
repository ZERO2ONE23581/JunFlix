import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { List } from '../../../../User/Read/MyPage/List';
import { OverlayBg } from '../../../../../Tools/OverlayBg';
import { MiniModal, Mob } from '../../../../../../styles/global';
import { fromTopVar } from '../../../../../../styles/variants';
import {
  useCapLetters,
  useResponsive,
} from '../../../../../libs/client/useTools';

interface IFilterModal {
  _data: {
    modal: string;
    theme: boolean;
    closeModal: () => void;
    setGenre: Dispatch<SetStateAction<{ select: boolean; type: string }>>;
  };
}
export const FilterModal = ({ _data }: IFilterModal) => {
  const { isDesk } = useResponsive();
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
        <Cont isDesk={isDesk}>
          <Modal
            exit="exit"
            custom={theme}
            initial="initial"
            animate="animate"
            variants={fromTopVar}
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
                    svg: genre === 'all' ? 'movie' : genre ? genre : 'movie',
                    name: {
                      eng: useName(genre)?.eng!,
                      kor: useName(genre)?.kor!,
                    },
                  }}
                />
              ))}
            </ul>
          </Modal>
          <OverlayBg closeModal={closeModal} />
        </Cont>
      )}
    </AnimatePresence>
  );
};
const Cont = styled(Mob)`
  .filter-modal {
    top: 2rem;
    right: ${(p) => (p.isDesk ? '-5rem' : '0rem')};
    font-size: ${(p) => (p.isDesk ? '2rem' : '3rem')};
    min-width: ${(p) => (p.isDesk ? '300px' : '440px')};
    .list {
      padding: ${(p) => (p.isDesk ? '0.5rem' : '0.8rem')};
      min-width: ${(p) => (p.isDesk ? '300px' : '440px')};
    }
    .kor {
      font-size: ${(p) => (p.isDesk ? '2rem' : '2.5rem')};
    }
    .small {
      font-size: ${(p) => (p.isDesk ? '1rem' : '2rem')};
    }
  }
`;
const Modal = styled(MiniModal)``;
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
