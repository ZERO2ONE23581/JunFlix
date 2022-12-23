import { Modal } from './Modal';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { Flex } from '../../../../styles/global';
import { IResponsive } from '../../../types/global';
import { Dispatch, SetStateAction, useState } from 'react';
import { useCapLetter } from '../../../libs/client/useTools';
import { colorVar, hoverScale } from '../../../../styles/variants';
import { Mobile } from './Mobile';

interface IMain extends IResponsive {
  setFixed: Dispatch<SetStateAction<boolean>>;
}
export const Main = ({ _res, setFixed }: IMain) => {
  const router = useRouter();
  const { theme, isMobile, isDesk } = _res;
  const [selected, setSelected] = useState('');
  const textVar = { ...colorVar, ...hoverScale };
  const array = ['board', 'post', 'movie', 'user'];
  const mob_arr = ['home', 'board', 'post', 'movie', 'user'];
  const _modal = { theme, setFixed, selected, setSelected };
  const index = (element: string) => Number(array.indexOf(element));
  const isModal = (element: string) =>
    Boolean(selected === element) && Boolean(selected !== 'home');
  const onClick = (element: string) => {
    if (element === 'user') return router.push('/user/all');
    else return setSelected(element);
  };
  return (
    <>
      <Mobile
        _res={{ theme, isMobile, isDesk }}
        _set={{ selected, setFixed, setSelected }}
        _data={{ array: mob_arr, isModal, onClick }}
      />
      {isDesk && (
        <Cont className="menu">
          {array.map((item) => (
            <Array key={index(item)}>
              <Txt
                exit="exit"
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={theme}
                variants={textVar}
                onClick={() => onClick(item)}
              >
                {useCapLetter(item)}
              </Txt>
              <Modal _data={{ ..._modal, isModal: isModal(item) }} />
            </Array>
          ))}
        </Cont>
      )}
    </>
  );
};

const Cont = styled(Flex)`
  gap: 1rem;
  justify-content: space-between;
`;

const Txt = styled(Flex)`
  cursor: pointer;
  border: 2px solid blue;
`;
const Array = styled(Flex)`
  position: relative;
  width: fit-content;
`;
