import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { SizeModal } from './Modal/Size';
import { LinkModal } from './Modal/Link';
import { Svg } from '../../../../../Tools/Svg';
import { Flex } from '../../../../../../styles/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { useUser } from '../../../../../libs/client/useUser';
import { Answer } from '../../../../../Tools/Modal/answer_modal';

interface IPostsIcon {
  _data: {
    theme: boolean;
    hideCreate: boolean;
    setMax: Dispatch<SetStateAction<number>>;
    setCreate: Dispatch<SetStateAction<boolean>>;
  };
}
export const Icons = ({ _data }: IPostsIcon) => {
  const router = useRouter();
  const theme = _data?.theme!;
  const setMax = _data?.setMax!;
  const setCreate = _data?.setCreate!;
  const hideCreate = _data?.hideCreate!;
  const [modal, setModal] = useState({
    grid: false,
    link: false,
    answer: false,
  });
  const icons = hideCreate
    ? ['question', 'compass', 'posts']
    : ['question', 'compass', 'plus', 'posts'];

  const { isLoggedIn } = useUser();
  const onClick = (type: string) => {
    if (type === 'posts')
      return setModal({ grid: true, link: false, answer: false });
    if (type === 'compass')
      return setModal({ grid: false, link: true, answer: false });
    if (type === 'question')
      return setModal({ grid: false, link: false, answer: true });
    if (type === 'plus') {
      setModal({ grid: false, link: false, answer: false });
      if (!isLoggedIn) return router.push('/login');
      else return setCreate(true);
    }
  };
  const closeModal = (type: string) => {
    if (type === 'grid') return setModal((p) => ({ ...p, grid: false }));
    if (type === 'link') return setModal((p) => ({ ...p, link: false }));
    if (type === 'answer') return setModal((p) => ({ ...p, answer: false }));
  };
  return (
    <>
      <Btns className="icons">
        {icons.map((el) => (
          <Svg key={el} type={el} theme={theme} onClick={() => onClick(el)} />
        ))}
      </Btns>
      <Answer
        _data={{
          theme,
          type: 'post',
          answer: modal.answer,
          closeModal: () => closeModal('answer'),
        }}
      />
      <SizeModal
        _data={{
          theme,
          setMax,
          modal: modal.grid,
          closeModal: () => closeModal('grid'),
        }}
      />
      <LinkModal
        _data={{
          theme,
          modal: modal.link,
          closeModal: () => closeModal('link'),
        }}
      />
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
