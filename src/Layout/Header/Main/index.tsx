import { Modal } from './Modal';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Flex } from '../../../../styles/global';
import { ITheme } from '../../../../styles/theme';
import { Dispatch, SetStateAction, useState } from 'react';
import { useCapLetter } from '../../../libs/client/useTools';
import { colorVar, hoverScale } from '../../../../styles/variants';

interface IMain extends ITheme {
  setFixed: Dispatch<SetStateAction<boolean>>;
}

export const Main = ({ theme, setFixed }: IMain) => {
  const router = useRouter();
  const [selected, setSelected] = useState('');
  const textVar = { ...colorVar, ...hoverScale };
  const array = ['user', 'board', 'post', 'movie'];
  const isModal = (element: string) => Boolean(selected === element);
  const index = (element: string) => Number(array.indexOf(element));
  const onClick = (element: string) => {
    if (element === 'user') return router.push('/user/all');
    else return setSelected(element);
  };
  //
  return (
    <Cont>
      {array.map((el) => (
        <Array key={index(el)}>
          <Txt
            custom={theme}
            variants={textVar}
            onClick={() => onClick(el)}
            exit="exit"
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            {useCapLetter(el)}
          </Txt>
          <Modal
            _data={{
              theme,
              selected,
              setSelected,
              isModal: isModal(el),
              setFixed,
            }}
          />
        </Array>
      ))}
    </Cont>
  );
};
const Cont = styled(Flex)`
  gap: 7rem;
  padding: 0 2rem;
  width: fit-content;
`;

const Txt = styled(Flex)`
  cursor: pointer;
  //border: 2px solid blue;
`;
const Array = styled(Flex)`
  position: relative;
  width: fit-content;
`;
