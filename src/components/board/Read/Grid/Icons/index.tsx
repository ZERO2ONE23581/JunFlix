import { Modal } from './Modal';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Svg } from '../../../../../Tools/Svg';
import { Flex } from '../../../../../../styles/global';
import { Answer } from '../../../../../Tools/Modal/answer_modal';

interface IBoardIcons {
  theme: boolean;
  hideFilter: boolean;
  setGenre: Dispatch<SetStateAction<{ select: boolean; type: string }>>;
}
export const Icons = ({ theme, setGenre, hideFilter }: IBoardIcons) => {
  const type = 'board';
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [answer, setAnswer] = useState(false);
  const closeModal = () => setAnswer(false);
  const onClick = (type: string) => {
    if (type === 'filter') return setModal(true);
    if (type === 'question') return setAnswer(true);
    if (type === 'boards') return router.push(`/all/boards`);
    if (type === 'plus') return router.push(`/board/create`);
  };
  const icons = hideFilter
    ? ['question', 'plus', 'boards']
    : ['question', 'plus', 'filter'];
  return (
    <>
      <Btns className="board-icons">
        {icons.map((el) => (
          <Svg key={el} type={el} theme={theme} onClick={() => onClick(el)} />
        ))}
      </Btns>
      <Answer _data={{ theme, type, closeModal, answer }} />
      <Modal _data={{ theme, modal, setModal, setGenre }} />
    </>
  );
};
const Btns = styled(Flex)`
  gap: 1.5rem;
  position: absolute;
  width: fit-content;
  height: fit-content;
  svg {
    cursor: pointer;
  }
`;
