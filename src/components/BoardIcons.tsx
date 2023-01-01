import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../Tools/Svg';
import { Answer } from '../Tools/Modal/Answer';
import { FilterModal } from './FilterModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { Flex, Flex_ } from '../../styles/global';
import { useResponsive } from '../libs/client/useTools';
import { LinkModal } from './Post/Schema/Grid/LinkModal';

interface IBoardIcons {
  _data: {
    theme: boolean;
    isHide: boolean;
    setEdit: Dispatch<SetStateAction<boolean>>;
    setGenre: Dispatch<SetStateAction<{ select: boolean; type: string }>>;
  };
}
export const BoardIcons = ({ _data }: IBoardIcons) => {
  const router = useRouter();
  const [modal, setModal] = useState('');
  const { theme, setGenre, isHide, setEdit } = _data;
  const onClick = (type: string) => {
    if (type === 'edit') return setEdit((p) => !p);
    if (type === 'boards') return router.push(`/board/all`);
    if (type === 'plus') return router.push(`/board/create`);
    else return setModal(type);
  };
  const closeModal = () => setModal('');
  const icons = () => {
    if (isHide) return ['compass', 'question', 'plus', 'boards'];
    else return ['compass', 'question', 'plus', 'filter'];
  };
  const __data = { theme, closeModal, modal };
  const __answer = {
    theme,
    closeModal,
    type: 'board',
    answer: modal === 'question',
  };
  const { isDesk } = useResponsive();
  const size = isDesk ? '2rem' : '4rem';
  return (
    <Cont isDesk={isDesk}>
      {icons().map((el) => (
        <Icon key={el}>
          <Svg
            type={el}
            theme={theme}
            item={{ size }}
            onClick={() => onClick(el)}
          />
          <>
            {el === 'question' && <Answer _data={{ ...__answer }} />}
            {el === 'compass' && <LinkModal _data={{ ...__data }} />}
            {el === 'filter' && <FilterModal _data={{ ...__data, setGenre }} />}
          </>
        </Icon>
      ))}
    </Cont>
  );
};
const Cont = styled(Flex_)`
  gap: 1.5rem;
  width: fit-content;
  margin-bottom: ${(p) => (p.isDesk ? '1rem' : '2rem')};
`;
const Icon = styled(Flex)`
  cursor: pointer;
  position: relative;
`;
