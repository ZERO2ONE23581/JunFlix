import { FilterModal } from './Modal';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../../Tools/Svg';
import { Flex } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { Answer } from '../../../../../Tools/Modal/Answer';
import { LinkModal } from '../../../../Post/Schema/Grid/Icons/Modal/Link';

interface IBoardIcons {
  _data: {
    theme: boolean;
    hideFilter: boolean;
    setGenre: Dispatch<SetStateAction<{ select: boolean; type: string }>>;
  };
}
export const Icons = ({ _data }: IBoardIcons) => {
  const router = useRouter();
  const [modal, setModal] = useState('');
  const { theme, setGenre, hideFilter } = _data;
  const onClick = (type: string) => {
    if (type === 'boards') return router.push(`/board/all`);
    if (type === 'plus') return router.push(`/board/create`);
    else return setModal(type);
  };
  const closeModal = () => setModal('');

  const icons = hideFilter
    ? ['compass', 'question', 'plus', 'boards']
    : ['compass', 'question', 'plus', 'filter'];

  const __data = { theme, closeModal, modal };
  const __answer = {
    theme,
    closeModal,
    type: 'board',
    answer: modal === 'question',
  };
  return (
    <Cont className="icons">
      {icons.map((el) => (
        <Icon key={el}>
          <Svg type={el} theme={theme} onClick={() => onClick(el)} />
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
const Cont = styled(Flex)`
  gap: 1.5rem;
  width: fit-content;
  margin-bottom: 1rem;
`;
const Icon = styled(Flex)`
  cursor: pointer;
  position: relative;
  .link_modal,
  .filter-modal {
    top: 2rem;
    left: 50%;
    min-width: 13rem;
    transform: translateX(-50%);
  }
`;
